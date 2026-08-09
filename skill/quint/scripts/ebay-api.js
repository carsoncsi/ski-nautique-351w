#!/usr/bin/env node
/**
 * eBay Browse API client for quint.
 *
 * Active-listing search only. Sold prices are NOT available through any API an
 * individual can obtain — see reference/ebay-api.md. Use scripts/ebay-search.js
 * to generate a sold-comps deep link for Carson to open himself.
 *
 * Usage:
 *   node scripts/ebay-api.js "marine distributor 351"
 *   node scripts/ebay-api.js --auto --max 300 "351 windsor timing cover"
 *   node scripts/ebay-api.js --token          # verify credentials only
 *   node scripts/ebay-api.js --json "..."     # machine-readable
 *
 * Flags:
 *   --auto        automotive category (6030) instead of inboard (50440)
 *   --engines     complete inboard gas engines (50442)
 *   --used        used + for-parts conditions only
 *   --min N / --max N   price bounds, USD
 *   --limit N     results per buying option (default 10, max 200)
 *   --token       fetch and validate an OAuth token, print nothing else
 *   --json        raw JSON output
 *
 * Env: EBAY_CLIENT_ID, EBAY_CLIENT_SECRET   (App ID / Cert ID from the Production keyset)
 * Exit: 0 ok | 1 bad credentials or API error | 2 unexpected
 */

const OAUTH_URL = 'https://api.ebay.com/identity/v1/oauth2/token';
const SEARCH_URL = 'https://api.ebay.com/buy/browse/v1/item_summary/search';
const SCOPE = 'https://api.ebay.com/oauth/api_scope';
const MARKETPLACE = 'EBAY_US';

const CATEGORIES = { inboard: '50440', engines: '50442', auto: '6030' };

/**
 * THE TRAP THIS FILE EXISTS TO AVOID.
 *
 * Browse search returns ONLY listings with a FIXED_PRICE buying option by default.
 * Pure auction listings — and auctions that have received a bid — are silently
 * omitted. For rare marine parts that is where the inventory lives: estate
 * clearances, shop closures, pallets of PCM takeoffs. A single-query client would
 * report "nothing available" and be confidently, silently wrong.
 *
 * So: always query both, always merge.
 */
const BUYING_OPTIONS = ['FIXED_PRICE', 'AUCTION'];

async function getToken(id, secret) {
  const basic = Buffer.from(`${id}:${secret}`).toString('base64');
  const res = await fetch(OAUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basic}`,
    },
    body: new URLSearchParams({ grant_type: 'client_credentials', scope: SCOPE }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const hint = res.status === 401
      ? '\n  Check: are these PRODUCTION keys (not Sandbox)? And did you complete the\n' +
        '  "marketplace account deletion/closure notifications" step? Until that is done\n' +
        '  the production keyset stays DISABLED and every token request 401s.'
      : '';
    throw new Error(`OAuth ${res.status}: ${body.error_description || JSON.stringify(body)}${hint}`);
  }
  return body.access_token;
}

async function search(token, query, opts, buyingOption) {
  const filters = [`buyingOptions:{${buyingOption}}`];
  if (opts.conditions?.length) filters.push(`conditionIds:{${opts.conditions.join('|')}}`);
  if (opts.min != null || opts.max != null) {
    filters.push(`price:[${opts.min ?? ''}..${opts.max ?? ''}]`, 'priceCurrency:USD');
  }

  const params = new URLSearchParams({
    q: query,
    category_ids: opts.category,
    filter: filters.join(','),
    limit: String(opts.limit),
    sort: 'price',
  });

  const res = await fetch(`${SEARCH_URL}?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-EBAY-C-MARKETPLACE-ID': MARKETPLACE,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Search ${res.status} (${buyingOption}): ${JSON.stringify(body.errors || body)}`);
  }
  return { buyingOption, total: body.total ?? 0, items: body.itemSummaries || [] };
}

function toCard(item, buyingOption) {
  const ship = item.shippingOptions?.[0]?.shippingCost;
  const price = Number(item.price?.value ?? 0);
  const shipCost = Number(ship?.value ?? 0);
  return {
    title: item.title,
    itemId: item.itemId,
    price,
    shipping: ship ? shipCost : null,
    landed: ship ? price + shipCost : null,
    condition: item.condition || 'unstated',
    buyingOption,
    seller: item.seller
      ? `${item.seller.username} · ${item.seller.feedbackPercentage}% / ${item.seller.feedbackScore}`
      : 'unknown',
    location: item.itemLocation?.postalCode || item.itemLocation?.country || '',
    url: item.itemWebUrl,
    image: item.thumbnailImages?.[0]?.imageUrl || item.image?.imageUrl || null,
  };
}

function parseArgs(argv) {
  const o = { category: CATEGORIES.inboard, conditions: [], min: null, max: null,
              limit: 10, json: false, tokenOnly: false };
  const words = [];
  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--auto':    o.category = CATEGORIES.auto; break;
      case '--engines': o.category = CATEGORIES.engines; break;
      case '--used':    o.conditions = ['3000', '7000']; break;
      case '--min':     o.min = Number(argv[++i]); break;
      case '--max':     o.max = Number(argv[++i]); break;
      case '--limit':   o.limit = Math.min(Number(argv[++i]) || 10, 200); break;
      case '--json':    o.json = true; break;
      case '--token':   o.tokenOnly = true; break;
      default:          words.push(argv[i]);
    }
  }
  o.query = words.join(' ').trim();
  return o;
}

async function main(argv) {
  const id = process.env.EBAY_CLIENT_ID;
  const secret = process.env.EBAY_CLIENT_SECRET;
  if (!id || !secret) {
    console.error('EBAY_CLIENT_ID / EBAY_CLIENT_SECRET not set.');
    console.error('Setup: reference/ebay-api.md. Quint falls back to live browsing without them.');
    return 1;
  }

  const opts = parseArgs(argv);
  const token = await getToken(id, secret);

  if (opts.tokenOnly) {
    console.log(`TOKEN OK — production credentials valid (${token.slice(0, 12)}…)`);
    return 0;
  }
  if (!opts.query) {
    console.error('Usage: node scripts/ebay-api.js [flags] "<search terms>"');
    return 1;
  }

  // Both buying options, always. See BUYING_OPTIONS above.
  const results = await Promise.all(
    BUYING_OPTIONS.map((b) => search(token, opts.query, opts, b))
  );

  const cards = results
    .flatMap((r) => r.items.map((i) => toCard(i, r.buyingOption)))
    .sort((a, b) => (a.landed ?? a.price) - (b.landed ?? b.price));

  if (opts.json) {
    console.log(JSON.stringify({
      query: opts.query,
      category: opts.category,
      totals: Object.fromEntries(results.map((r) => [r.buyingOption, r.total])),
      cards,
    }, null, 2));
    return 0;
  }

  console.log(`QUERY   ${opts.query}   [cat ${opts.category}]`);
  console.log(`TOTALS  ${results.map((r) => `${r.buyingOption}: ${r.total}`).join('   ')}`);
  if (!cards.length) {
    console.log('\nNo active listings. Note this is ACTIVE inventory only —');
    console.log('run scripts/ebay-search.js for a sold-comps link to check what it trades for.');
    return 0;
  }
  console.log('');
  for (const c of cards) {
    const landed = c.landed != null ? `$${c.landed.toFixed(2)} landed` : `$${c.price.toFixed(2)} + ship?`;
    console.log(`  ${landed.padEnd(22)} ${c.condition.padEnd(12)} ${c.buyingOption}`);
    console.log(`    ${c.title}`);
    console.log(`    seller ${c.seller}${c.location ? ` · ${c.location}` : ''}`);
    console.log(`    ${c.url}`);
    console.log('');
  }
  console.log('ALL PRICES ARE ASKS, NOT SALES. For rare marine parts an ask is aspirational.');
  console.log('Sold comps: node scripts/ebay-search.js "' + opts.query + '"  → open the SOLD link.');
  return 0;
}

main(process.argv.slice(2))
  .then((code) => process.exit(code))
  .catch((e) => { console.error(`ERROR: ${e.message}`); process.exit(e.message?.startsWith('OAuth') ? 1 : 2); });
