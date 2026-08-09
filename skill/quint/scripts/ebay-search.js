#!/usr/bin/env node
/**
 * Search-URL builder for quint.
 *
 * Deterministic URL construction belongs in code, not in prose the model has to
 * reassemble from memory every run. This encodes the verified eBay syntax, the
 * category IDs, the standing exclusion strings, and the two known search traps.
 *
 * Usage:
 *   node scripts/ebay-search.js "marine distributor 351w"
 *   node scripts/ebay-search.js --auto "351 windsor flywheel"     # automotive side
 *   node scripts/ebay-search.js --max 250 --used "exhaust manifold"
 *   node scripts/ebay-search.js --forums "damper plate"           # forum searches only
 *
 * Flags:
 *   --auto        search the automotive category (6030) with automotive exclusions
 *   --engines     search Complete Inboard Gas Engines (50442)
 *   --used        restrict to used + for-parts conditions
 *   --max N       price ceiling, USD
 *   --min N       price floor, USD
 *   --forums      also emit Google site: searches for the Tier 3 forums
 *   --json        machine-readable output
 *
 * Source for all syntax: reference/venues.md#ebay-search-mechanics
 * Exit: 0 always (this is a URL builder, not a validator)
 */

const CATEGORIES = {
  inboard: '50440',       // Inboard Engines & Components  <- default
  engines: '50442',       // Complete Inboard Gas Engines
  boat: '26443',          // Boat Parts
  auto: '6030',           // Car & Truck Parts & Accessories
};

const CONDITION = {
  used: '3000',
  forParts: '7000',
};

// Sort codes. 12 and 15 are multiply confirmed; others conflict across sources
// and are deliberately not exposed. See venues.md.
const SORT = {
  bestMatch: '12',
  priceLowToHigh: '15',
};

const EXCLUSIONS = {
  // Wrong-brand marine noise.
  marine: ['mercruiser', 'omc', 'volvo', 'penta', 'indmar', 'crusader',
           'sterndrive', 'outboard', 'alpha', 'bravo'],
  // Automotive 351W noise. Truck terms deliberately KEPT — the donor is an F-150.
  auto: ['mustang', 'fairlane', 'galaxie', 'efi', 'fuel injection'],
  // Universal junk.
  junk: ['decal', 'sticker', 'manual', 'cover', 'model', 'toy', 'poster', 'keychain'],
};

/**
 * Search terms that return the wrong thing entirely when used bare.
 * Verified during research — see venues.md#known-traps.
 */
const TRAPS = [
  {
    term: 'pcm',
    disambiguators: ['marine', 'ford', '351', 'pleasurecraft'],
    warning: '"PCM" alone returns Powertrain/Propulsion Control Modules (automotive and ' +
             'Mercury computers). Pair it with marine, Ford, 351, or Pleasurecraft.',
  },
  {
    term: 'windsor',
    disambiguators: ['351', 'ford'],
    warning: '"Windsor" alone returns Windsor Ontario, chairs, and castles. Pair it with 351 or Ford.',
  },
  {
    term: 'velvet drive',
    disambiguators: [],
    warning: 'Velvet Drive is probably the WRONG transmission family for this boat. ' +
             'Evidence points to a PCM Power Plus 40A (1.23:1). Velvet Drive direct-drive ' +
             'is 1:1 only; their reductions start at 1.52:1. See 351w-swap.md.',
  },
];

const FORUMS = [
  { name: 'CorrectCraftFan', host: 'correctcraftfan.com', note: 'best for this hull; requires free registration to read' },
  { name: 'PlanetNautique', host: 'planetnautique.com', note: 'active Nautique community' },
  { name: 'iBoats', host: 'forums.iboats.com', note: 'general inboard troubleshooting depth' },
  { name: 'Ford Truck Enthusiasts', host: 'ford-trucks.com', note: 'the donor 351W side' },
];

/**
 * Build the exclusion clause, dropping any term that appears in the query itself.
 *
 * Without this, searching "351 windsor timing COVER" emits "-cover" and returns
 * nothing — the exclusion silently cancels the search. Same collision exists for
 * "manual", "model", and "case". A search that returns zero results because it
 * excluded its own subject is the worst kind of failure: it looks like "no
 * inventory exists" when it means "the query was self-defeating."
 */
function buildExclusionString(groups, query) {
  const q = (query || '').toLowerCase();
  const dropped = [];
  const terms = groups.flat().filter((t) => {
    if (q.includes(t.toLowerCase())) { dropped.push(t); return false; }
    return true;
  });
  return {
    clause: terms.length ? ` -(${terms.join(',')})` : '',
    dropped,
  };
}

function checkTraps(query) {
  const q = query.toLowerCase();
  const hits = [];
  for (const trap of TRAPS) {
    if (!q.includes(trap.term)) continue;
    const disambiguated = trap.disambiguators.some((d) => q.includes(d));
    if (!disambiguated) hits.push(trap.warning);
  }
  return hits;
}

function ebayUrl(query, opts) {
  const params = new URLSearchParams();
  params.set('_nkw', query + buildExclusionString(opts.exclusions, query).clause);
  params.set('_sacat', opts.category);
  params.set('_sop', opts.sort);
  if (opts.conditions?.length) params.set('LH_ItemCondition', opts.conditions.join(','));
  if (opts.min != null) params.set('_udlo', String(opts.min));
  if (opts.max != null) params.set('_udhi', String(opts.max));
  if (opts.sold) { params.set('LH_Sold', '1'); params.set('LH_Complete', '1'); }
  return `https://www.ebay.com/sch/i.html?${params.toString()}`;
}

function googleSiteUrl(host, query) {
  const params = new URLSearchParams({ q: `site:${host} ${query}` });
  return `https://www.google.com/search?${params.toString()}`;
}

function parseArgs(argv) {
  const opts = { auto: false, engines: false, used: false, forums: false, json: false,
                 min: null, max: null };
  const words = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--auto':    opts.auto = true; break;
      case '--engines': opts.engines = true; break;
      case '--used':    opts.used = true; break;
      case '--forums':  opts.forums = true; break;
      case '--json':    opts.json = true; break;
      case '--min':     opts.min = Number(argv[++i]); break;
      case '--max':     opts.max = Number(argv[++i]); break;
      default:          words.push(a);
    }
  }
  opts.query = words.join(' ').trim();
  return opts;
}

function main(argv) {
  const opts = parseArgs(argv);
  if (!opts.query) {
    console.log('Usage: node scripts/ebay-search.js [--auto|--engines] [--used] ' +
                '[--min N] [--max N] [--forums] [--json] "<search terms>"');
    return 0;
  }

  const category = opts.auto ? CATEGORIES.auto
                 : opts.engines ? CATEGORIES.engines
                 : CATEGORIES.inboard;
  const exclusions = [opts.auto ? EXCLUSIONS.auto : EXCLUSIONS.marine, EXCLUSIONS.junk];
  const conditions = opts.used ? [CONDITION.used, CONDITION.forParts] : [];

  const base = { category, exclusions, conditions, min: opts.min, max: opts.max };
  const active = ebayUrl(opts.query, { ...base, sort: SORT.priceLowToHigh, sold: false });
  const sold   = ebayUrl(opts.query, { ...base, sort: SORT.bestMatch, sold: true });
  const traps  = checkTraps(opts.query);
  const dropped = buildExclusionString(exclusions, opts.query).dropped;
  const forums = opts.forums
    ? FORUMS.map((f) => ({ ...f, url: googleSiteUrl(f.host, opts.query) }))
    : [];

  if (opts.json) {
    console.log(JSON.stringify(
      { query: opts.query, category, active, sold, traps, droppedExclusions: dropped, forums },
      null, 2));
    return 0;
  }

  console.log(`QUERY   ${opts.query}`);
  console.log(`CAT     ${category}${opts.auto ? '  (automotive)' : opts.engines ? '  (complete engines)' : '  (inboard engines & components)'}`);
  if (traps.length) {
    console.log('\nTRAPS:');
    for (const t of traps) console.log(`  ! ${t}`);
  }
  if (dropped.length) {
    console.log(`\nDROPPED EXCLUSIONS  ${dropped.join(', ')}`);
    console.log('  (these appear in the query itself — excluding them would cancel the search)');
  }
  console.log(`\nACTIVE  (price + shipping, low to high)\n  ${active}`);
  console.log(`\nSOLD    (~90-day comps — the only sold-price access there is)\n  ${sold}`);
  if (forums.length) {
    console.log('\nFORUMS  (Tier 3 — folklore, never sufficient alone for CONFIRMED)');
    for (const f of forums) console.log(`  ${f.name} — ${f.note}\n    ${f.url}`);
  }
  console.log('\nNOTE    eBay URL syntax was validated against documentation, not live fetch.');
  console.log('        Browse API search excludes AUCTIONS by default — query both. See ebay-api.md.');
  return 0;
}

try {
  process.exit(main(process.argv.slice(2)));
} catch (e) {
  console.error(`UNEXPECTED ERROR: ${e.message}`);
  process.exit(2);
}
