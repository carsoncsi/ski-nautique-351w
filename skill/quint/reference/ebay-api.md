# eBay API — setup, capability, and the honest limits

What the API can do, what it can't, and exactly how to turn it on.

> **Verification note.** developer.ebay.com blocks automated fetch. Every official claim here
> was verified against **Wayback Machine captures** — Browse overview and search reference from
> May 2026, Buy requirements May 2026, filters and keyset pages April 2026, Marketplace
> Insights May 2025, call-limits and deprecation pages mid-2024 (their latest captures),
> corroborated by 2025–26 community evidence. Snapshot links are included alongside live ones.

## Contents

- [The short version](#the-short-version)
- [Setup — four steps](#setup--four-steps)
- [Browse API — what you get](#browse-api--what-you-get)
- [⚠️ The default that would silently break this skill](#-the-default-that-would-silently-break-this-skill)
- [Sold prices — the honest no](#sold-prices--the-honest-no)
- [The workaround is better than the thing you can't have](#the-workaround-is-better-than-the-thing-you-cant-have)
- [Do not build on](#do-not-build-on)

---

## The short version

| Capability | Status |
|---|---|
| **Search active listings, structured** | ✅ **Buildable today.** Free keyset, 5,000 calls/day, rich filters, returns a live clickable listing URL. |
| **Sold / completed prices, programmatic** | ❌ **Not obtainable.** Finding API decommissioned. Marketplace Insights partner-gated, effectively nil for an individual, and only 90 days deep anyway. |
| **Sold prices, manual** | ✅ **Free Terapeak** in Seller Hub — **~3 years** of history. Better data than the gated API would have given. |

---

## Setup — four steps

1. **Create a free eBay Developers Program account** at developer.ebay.com. Requires an
   ordinary eBay member account.
2. Sign in → **Application Keys** page.
3. **Create a keyset separately under Sandbox and under Production.** Each yields an
   **App ID (Client ID)**, **Dev ID**, and **Cert ID (Client Secret)**.
4. ⚠️ **Complete the "marketplace account deletion/closure notifications" compliance step**
   (subscribe or opt out). **Until this is done the Production keyset reads
   *"Your Keyset is currently disabled."*** This is the step people miss.

[Creating API keysets](https://developer.ebay.com/api-docs/static/gs_create-the-ebay-api-keysets.html) ·
[Wayback Apr 2026](http://web.archive.org/web/20260414031800/https://developer.ebay.com/api-docs/static/gs_create-the-ebay-api-keysets.html)
`[canonical, high]`

**Then set the environment:**

```
export EBAY_CLIENT_ID="<App ID>"
export EBAY_CLIENT_SECRET="<Cert ID>"
```

**Verify in one command:**

```
node scripts/ebay-api.js --token
```

`TOKEN OK` means production credentials are live. A 401 almost always means one of two things,
and the script says which: Sandbox keys instead of Production, or the account-deletion
compliance step not completed.

`scripts/validate.js` warns if these are missing and falls back to live browsing. **The API is
an accelerator, never a dependency** — Quint works without it.

**The client:** [`../scripts/ebay-api.js`](../scripts/ebay-api.js) — OAuth, search, part-card
output. **It queries `FIXED_PRICE` and `AUCTION` separately and merges**, because of the
default described below. Sorts by **landed cost**, not sticker.

### Rate limit

**5,000 Browse calls per day** on the default free tier. Higher limits need the free
Application Growth Check (~5–7 business days per community reports; raising Browse above 5,000
is sometimes refused).
[API call limits](https://developer.ebay.com/develop/apis/api-call-limits) ·
[Wayback Jul 2024](http://web.archive.org/web/20240722004605/https://developer.ebay.com/develop/apis/api-call-limits)
`[medium — snapshot is 2024-07, corroborated by community threads through 2025, not
re-verified on a 2026 capture]`

### Auth

**OAuth2 client-credentials grant. Application token only — no user login.** Scope is the
basic `https://api.ebay.com/oauth/api_scope` granted to every keyset. (`buy.browse` is *not* a
valid scope — a common mistake.)
[search reference](https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search) ·
[Wayback May 2026](http://web.archive.org/web/20260514014436/https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search)
`[canonical, high]`

### One thing to verify on first run

eBay's own docs conflict. The [Buy APIs Requirements page](https://developer.ebay.com/api-docs/buy/static/buy-requirements.html)
frames all Buy APIs as partner-only via eBay Partner Network. But eBay Developer Support has
stated on the record that *"most of the Browse API methods are not restricted and open,"* the
basic scope is issued to every production keyset, and eBay's own Finding-API retirement
guidance points all developers to Browse as the replacement. The partner gauntlet applies to
the genuinely restricted methods — checkout/Order, Feed, affiliate, and Marketplace Insights.

**Resolution: make one live production call after creating the keyset.** That settles it
definitively in a way no amount of document-reading will.
[community thread](https://community.ebay.com/t5/Traditional-APIs-Orders/Need-Production-Access-to-Browse-API-Buy-API/m-p/35317034)
`[medium]`

---

## Browse API — what you get

**Endpoint:** `GET https://api.ebay.com/buy/browse/v1/item_summary/search`

**Params:** `q` · `category_ids` · `epid` · `gtin` · `filter` · `aspect_filter` ·
`compatibility_filter` · `sort` · `limit` · `offset` · `fieldgroups`

**Returned fields — everything a part card needs:**

| Field | Use |
|---|---|
| `itemId` | ledger reference |
| `title` | — |
| `price` | the ask |
| `condition` / `conditionId` | new / used / for parts |
| `seller.username`, `seller.feedbackPercentage`, `seller.feedbackScore` | cross-check against [`sellers.md`](sellers.md) |
| `image`, `thumbnailImages` | **visual verification of the hose stamp, the J1171 marking, the casting number** |
| **`itemWebUrl`** | **the live clickable listing — exactly what the charter requires** |
| `itemLocation` | drives landed-cost reasoning |
| `shippingOptions` | landed cost, not sticker |
| `buyingOptions` | see the trap below |

Result sets cap at **10,000 items**. **Wildcards are not allowed.**
[Browse overview](https://developer.ebay.com/api-docs/buy/browse/overview.html) `[canonical, high]`

**Filters cover everything needed:** category, condition, price range
(`filter=price:[10..50]` with `priceCurrency`), item location and delivery
(`itemLocationCountry`, `deliveryPostalCode`, `maxDeliveryCost`), `sellers` / `excludeSellers`,
`excludeCategoryIds`, `itemStartDate` / `itemEndDate`, `searchInDescription`,
`returnsAccepted`, `bidCount`, and `buyingOptions`.
[filter reference](https://developer.ebay.com/api-docs/buy/static/ref-buy-browse-filters.html)
`[canonical, high]`

**Companion methods:** `getItem`, `getItemByLegacyId`, `getItems`, `getItemsByItemGroup`,
`searchByImage`, `checkCompatibility`.

---

## ⚠️ The default that would silently break this skill

> **Search returns ONLY listings with a `FIXED_PRICE` buying option by default.**
> Pure auction listings — and auctions that have received a bid — require explicitly
> filtering `buyingOptions:{AUCTION}`.

For rare marine parts **that is where the inventory is.** An estate clearance, a shop closing,
a guy dumping a pallet of PCM takeoffs — those go up as auctions. A script that queries the
default and reports "nothing available" would be **confidently, silently wrong**, which is
precisely the failure class this skill exists to prevent.

**Every eBay search this skill runs must query both `FIXED_PRICE` and `AUCTION`.**
[filter reference](https://developer.ebay.com/api-docs/buy/static/ref-buy-browse-filters.html)
`[canonical, high]`

---

## Sold prices — the honest no

**The Finding API is fully retired.** All calls deprecated 2024-01-04, **decommissioned
2025-02-05**. `findCompletedItems` had been deprecated with restricted access since
2020-10-15. Post-decommission, callers get permanent Error 10001; eBay Developer Support
confirmed in thread: *"The Finding API has been decommissioned."* **There is no legacy
backdoor.**
[deprecation status](https://developer.ebay.com/develop/apis/api-deprecation-status) ·
[Wayback](http://web.archive.org/web/20240703205538/https://www.developer.ebay.com/develop/apis/api-deprecation-status)
`[canonical, high]`

**Marketplace Insights has the data but is gated.**
`GET /buy/marketplace_insights/v1_beta/item_sales/search` returns `lastSoldPrice`,
`lastSoldDate`, `totalSoldQuantity` — **but only 90 days back**, and it has sat in `v1_beta`
for years. The official overview states verbatim it is *"a (Limited Release) API available
only to select developers approved by business units,"* with per-partner category
whitelisting.
[overview](https://developer.ebay.com/api-docs/buy/marketplace-insights/overview.html)
`[canonical, high]`

**Approval likelihood for an individual: effectively nil.** Community evidence is uniform —
denials, with eBay indicating access is reserved for major partners. One support-adjacent
reply: *"Market insight API is restricted API, even If you get it working in sandbox, you will
not able to get access in production."* No individual-developer approval was found anywhere.
**Assume it is not obtainable and do not spend time applying.**
[access denied thread](https://community.ebay.com/t5/RESTful-Sell-APIs-Marketing/Marketplace-Insight-API-responded-with-Access-denied/td-p/35066691)
`[high]`

*One community reply claimed eBay "may grant access to individual developers, especially for
non-commercial projects." Uncorroborated, and contradicted by every firsthand account and by
the official limited-release language. Discarded.*

---

## The workaround is better than the thing you can't have

**1. Free Terapeak — ~3 years of sold history.** Terapeak Product Research is bundled free
with **every eBay seller account**: Seller Hub → **Research** tab. Up to roughly three years
of actual sold prices, versus Marketplace Insights' ninety days. *(Terapeak **Sourcing**
Insights additionally needs a Store subscription — not needed here.)*

**No public API** — eBay staff, on the record: *"At this time there is not a Terapeak API, and
the tool is only available through the Seller Hub > Research tab."* So this is **a manual
surface for Carson, not a programmatic source for Quint.**
[eBay Terapeak announcement](https://export.ebay.com/en/resources/important-updates/ebay-news-archive/terapeak) ·
[community — no API](https://community.ebay.com/t5/Traditional-APIs-Search/Get-data-of-terapeak-research-using-API/td-p/33565469)
`[canonical, high]`

**2. Sold-listing deep links — and this fits the charter exactly.** Quint constructs the
sold-listings search URL and hands Carson a live link he opens and judges himself:

```
https://www.ebay.com/sch/i.html?_nkw=TERM&_sacat=50440&LH_Sold=1&LH_Complete=1&_sop=13
```

That satisfies *"a live source Carson can open"* **without any API at all.** Built by
[`../scripts/ebay-search.js`](../scripts/ebay-search.js).

### How Quint should report price, given all this

**Every price from the Browse API is an ASK, not a sale.** For rare marine parts, asking
prices are aspirational — a seller who has had a part listed for three years at $400 is not
evidence the part is worth $400. This is failure mode **F6**.

So: report the ask, label it an ask, **and hand over the sold-comps link** so Carson can see
what the thing actually trades for. Where he's checked Terapeak, that number goes in
[`parts-ledger.md`](parts-ledger.md) and becomes durable knowledge.

---

## Do not build on

**Scraping eBay's sold-listings pages**, or third-party "sold data API" vendors. Their
provenance is scraping; it violates eBay's User Agreement and API License Agreement. Flagged
as ToS risk, **not an option**, regardless of how convenient it looks. `[high]`

## Usage constraints that actually bind

All use is governed by the eBay API License Agreement (accepted at signup; the Application
Growth Check audits compliance). The heavyweight display rules on the Buy requirements page —
eBay logo, eBay-hosted images only, no re-sorting of results — are specified for **guest
checkout partner integrations**, not for every Browse consumer.

What binds a personal tool: **5,000 calls/day · 10,000-item result cap · no wildcards · the
License Agreement's general data-use terms.** Linking users to listings via `itemWebUrl` is an
intended use — it's a first-class response field. `[medium]`
