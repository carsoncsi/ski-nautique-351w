# Venues — the source map

Where to hunt, in what order, and what each place is actually good for. Every URL below was
fetched live during research unless flagged bot-blocked.

**The tier order is not a suggestion.** It is the structural defense against failure mode F1.
Tier 1 establishes *what the part is*. Only then does Tier 2 find one for sale. Searching a
marketplace for a description is how you buy the wrong thing.

## Contents

- [Tier 1 — Identity](#tier-1--identity)
- [Tier 2 — Inventory](#tier-2--inventory)
- [Tier 3 — Tribal](#tier-3--tribal)
- [Salvage and used](#salvage-and-used)
- [eBay search mechanics](#ebay-search-mechanics)
- [Known traps](#known-traps)
- [Bot-blocked — browser only](#bot-blocked--browser-only)

---

## Tier 1 — Identity

**Establish the part number here before opening any marketplace.** If Tier 1 comes up empty,
that is itself a finding — say so, label anything downstream `UNVERIFIED`, and let Carson
decide whether to gamble.

| Venue | Why it's Tier 1 | Pattern |
|---|---|---|
| **[marinepartsexpress.com/schematics/pleasurecraft](https://www.marinepartsexpress.com/schematics/pleasurecraft)** | **Publishes actual PCM exploded parts diagrams.** Also Borg Warner, ZF, Volvo. One of the very few places to establish a PCM part number *from a diagram*. **Start here for anything PCM.** | `/schematics/[brand]` |
| **[sierraparts.com](https://www.sierraparts.com/)** | Official Sierra/Dometic catalog — the aftermarket brand for PCM Ford ignition, cooling, fuel. [Parts Finder application lookup](https://www.sierraparts.com/pages/parts-finder). Sierra's PCM application tables are also republished at [marineengine.com](https://www.marineengine.com/parts/sierra-marine/pcm-pleasurecraft.html) *(bot-blocked, works in a browser)*. | Shopify `/search?q=` |
| **[marinepartssource.com](https://marinepartssource.com/pleasurecraft-marine-pcm-engine-model-identification)** | **PCM engine model identification page** — pins down what the original PCM 351 actually was before cross-referencing anything. | `/marine-parts/[cat]/[subcat]` |
| **[pcmengines.com/dealers](https://pcmengines.com/dealers/)** | Manufacturer. Sells nothing, publishes no public catalog. Value is the dealer locator — a dealer can pull OEM numbers from the dealer-side catalog. **Authority of last resort, and the likely answer for the transmission tag.** | — |

---

## Tier 2 — Inventory

Search the **number**, not the description.

| Venue | Best for | Search pattern | Price |
|---|---|---|---|
| **[skidim.com](https://www.skidim.com/)** — Discount Inboard Marine | **Best all-round for this boat.** Inboard-only specialist: PCM, Indmar, Correct Craft. No diagrams — compensates with fitment help by email ("include what boat you are working on"), which is genuinely useful Tier 1 evidence you can't get elsewhere. | `search.php?search_query=TERM` ✅ verified | mid |
| **[nautiqueparts.com](https://www.nautiqueparts.com/)** | Correct Craft OEM. Explicit **"Ski Nautique 1978-2002"** category segmentation — covers this hull directly. Hull-specific items nobody else carries. Has an Owner's Manuals section. | browse `/[cat]/[subcat]/[model-range]/` | OEM premium |
| **[michiganmotorz.com](https://www.michiganmotorz.com/)** | Complete and reman engines — verified live "5.8L (351 ci) Ford Marine Engine" and reman Ford 5.8L heads. **The fallback if the F150 swap goes sideways.** | `search.php?search_query=TERM` ✅ verified | mid–discount |
| **[bpi.ebasicpower.com](https://bpi.ebasicpower.com/shop/)** — Basic Power Industries | Discount/NOS-leaning. PCM, Crusader (shares PCM's parent — many common Ford small-block marine parts). **Good for obsolete ignition and carb bits.** Root domain 301s; use the `bpi.` subdomain. | `search_2/show.php?q=TERM` | discount |
| **[myinboardmarine.com](https://www.myinboardmarine.com/)** | Dedicated **"5.0L–5.8L 302–351 FORD EXHAUST PCM"** category. Manifolds and risers are a known cost center on this engine. | Shopify `/search?q=` | mid |
| **[go2marine.com/collections/pleasurecraft](https://www.go2marine.com/collections/pleasurecraft)** | ~160 PCM items — ignition conversion kits, exhaust, cooling, FWC block-off kits. | Shopify `/search?q=` | mid |
| **[wholesalemarine.com](https://www.wholesalemarine.com/)** | Sierra dealer. **Cheap fulfillment once a Sierra number is established elsewhere.** This is where "cheapest that works" pays off. | `search.php?query=TERM` | discount |
| **[mniboats.com](https://www.mniboats.com/pleasurecraft-boat-engine-parts-s/103.htm)** | Nautique dealer-affiliated. PCM alternators, exhaust, cooling, transmission. Backup when skidim and nautiqueparts are out. | `[name]-s/NNN.htm` | premium |
| **[waterskis.com/engine-parts](https://waterskis.com/engine-parts/)** | Consumables — plugs, impellers, belts, filters. Year/make/model lookup. Not hard parts. | `?page=N` | mid |

**Low relevance:** [partsvu.com](https://www.partsvu.com/) — verified live, but an OEM
*outboard* specialist. Its schematics route to Yamaha and Mercury, not PCM. Skip except for
generic consumables.

---

## Tier 3 — Tribal

Real people who have done this. **Folklore by definition** — can raise confidence, can
usefully contradict a catalog, but **cannot by itself produce a `CONFIRMED` label.** Threads
with photos and part numbers are worth substantially more than threads without.

| Forum | Why it matters | Access | Search |
|---|---|---|---|
| **[correctcraftfan.com](https://www.correctcraftfan.com/)** | **THE community for pre-2000 Correct Crafts.** 251,557 posts in General Discussion alone. Hosts **[factory manuals and brochures](https://www.correctcraftfan.com/reference/)** — period-correct spec documentation for this exact hull. [Classifieds](https://www.correctcraftfan.com/forsale/). | ⚠️ **Free registration now required to read** (bandwidth attacks). Not scriptable. **Carson should register once.** | `google.com/search?q=site:correctcraftfan.com+TERM` |
| **[planetnautique.com](https://www.planetnautique.com/)** | Other active Nautique forum. Skews newer boats, deep institutional knowledge, active vintage contingent. Classifieds: 10,105 topics. | open | Google `site:` — native search builds a JSON query string, not constructible |
| **[forums.iboats.com](https://forums.iboats.com/)** | Best general inboard-engine troubleshooting depth. **No Ford/PCM subforum — search, don't browse.** | open | Google `site:` |
| **[ford-trucks.com/forums/forum28](https://www.ford-trucks.com/forums/forum28/)** | **The donor-engine community** — "1987–1996 F150 & Larger F-Series." Carb, timing, firing order, head and intake knowledge for exactly this engine generation. | 403s to plain fetch; loads with a browser UA | `google.com/search?q=site:ford-trucks.com+351w+TERM` |

**Deprioritize:** thehulltruth.com — did not resolve (Cloudflare), and it's
saltwater/offshore/outboard-centric. CorrectCraftFan and PlanetNautique own this topic.

---

## Salvage and used

Where "cheapest that works" actually lives.

| Channel | What's there |
|---|---|
| **[shipwrecksalvage.net](https://www.shipwrecksalvage.net/inboard-engine-components-c-7.html)** | **Standout — 1,999 used items** under Inboard Engine & Parts, explicitly including Pleasure Craft. Carbs, exhaust and intake manifolds, distributors, alternators, mounts. **Freshwater salvage — materially lower corrosion risk than a saltwater yard.** Running motors are call-for-availability. | 
| **[salvagemarine.net](https://salvagemarine.net/boat-parts-sales/)** | 55,000+ used/NOS claimed. Searchable stock lives on their [eBay store](https://www.ebay.com/str/salvagemarinenet) — query as `?_nkw=TERM`. Parts-request form for unlisted items. |
| **[marineenginesalvage.com/parts-locator](https://marineenginesalvage.com/parts-locator)** | Family-run since 1987. No browseable database — inquiry form by model/serial/part number. Listed stock on their [eBay store](https://www.ebay.com/str/Marine-Engine-Salvage). Good candidate for a used PCM carb, distributor, or manifold set. |
| **[car-part.com](https://www.car-part.com/)** | **Live inventory across hundreds of auto salvage yards.** Directly relevant — the donor is a 1992 F-150, and **donor-side parts are dramatically cheaper through auto salvage than marine channels.** Brackets, balancer, heads, takeout engines. Form-driven (year → model → part → ZIP), not a constructible GET. |
| **[row52.com](https://www.row52.com/)** | Pick-n-Pull self-service yard inventory — 48,800 vehicles across 51 yards. **Email/SMS alerts on "1987-1996 F-150" arrivals.** Set one and forget it. |
| **[correctcraftfan.com/forsale](https://www.correctcraftfan.com/forsale/)** | **The most fitment-safe used channel that exists for this hull.** Sellers know what they have. |
| **[facebook.com/groups/inboardSKIboats](https://www.facebook.com/groups/inboardSKIboats/)** | Dedicated inboard ski boat buy/sell/trade. URL verified; content requires login, **activity level unverified.** |

**Bot-blocked:** pyp.com (LKQ Pick Your Part) — Cloudflare. Use manually.

**The split that matters:** engine-side parts for the F150 block go through **auto** salvage
and are cheap. Marine-spec and driveline parts go through **marine** channels and are not.
Knowing which side a part belongs to is half the sourcing decision.

---

## eBay search mechanics

Full API detail in [`ebay-api.md`](ebay-api.md). This section is the URL-level mechanics, used
by [`../scripts/ebay-search.js`](../scripts/ebay-search.js).

### Category IDs — confirmed from eBay's own canonical `/b/` URLs

| Category | ID |
|---|---|
| **Inboard Engines & Components** | **`50440`** ← primary hunting category |
| Complete Inboard Gas Engines | `50442` |
| Boat Parts | `26443` |
| Car & Truck Parts & Accessories | `6030` ← donor-truck 351W parts |
| eBay Motors root | `6000` |

### URL parameters

Base: `https://www.ebay.com/sch/i.html?`

| Param | Meaning |
|---|---|
| `_nkw=` | keywords, URL-encoded, `+` for spaces |
| `_sacat=` | category (`0` = all) |
| `_udlo=` / `_udhi=` | price floor / ceiling, USD |
| `LH_BIN=1` / `LH_Auction=1` | Buy-It-Now only / auctions only |
| `LH_ItemCondition=` | `1000` New · `1500` Open box · `2000`–`2500` refurb · `3000` Used · `7000` For parts. Comma-combine: `3000%2C7000` |
| `LH_Sold=1&LH_Complete=1` | **sold comps, ~90-day window.** The only sold-price access there is — see `ebay-api.md`. |
| `_sop=` | `12` Best Match · `15` price+shipping low→high · `16` high→low |
| `_ipg=` / `_pgn=` | results per page / page number |

> **Sort-code caveat.** `_sop=12` and `_sop=15` are multiply confirmed and are the two this
> skill actually needs. Sources conflict on `1`, `10`, `13`, and `16` — **verify on first
> use.** `[medium]`
>
> **All eBay URL syntax was validated against documentation, not live fetch** — the research
> environment is blocked from ebay.com. First real run should sanity-check one URL.

### Exclusion syntax

- Single: `-term` — **no space after the minus**
- Multiple: `-(term1,term2,term3)`
- OR-group: `(holley,edelbrock)`
- Exact phrase: `"marine distributor"`

**Not supported:** the word `OR`, wildcards `*`, `NEAR`, field prefixes. One third-party guide
still claims wildcard support — it's wrong, eBay removed them years ago. `[high]`

### Standing exclusion strings

Marine searches drowning in wrong-brand hits:
```
-(mercruiser,omc,volvo,penta,indmar,crusader,sterndrive,outboard,alpha,bravo)
```
Automotive 351W searches — **keep truck terms, the donor IS an F-150:**
```
-(mustang,fairlane,galaxie,efi,fuel injection)
```
Universal junk:
```
-(decal,sticker,manual,cover,model,toy,poster,keychain)
```

*These are constructed on verified syntax but not empirically A/B tested. Tune in use and log
what works to [`lessons.md`](lessons.md).*

### Saved searches

Heart icon after any search; eBay emails on new matches. **Hard limit 100 per account.**
Filters are preserved, so save *fully filtered* searches. Alerts batch daily, not real-time —
fine for a slow parts hunt on a budget build. `[medium]`

---

## Known traps

| Trap | Why | Fix |
|---|---|---|
| **`PCM` alone** | Returns **Powertrain / Propulsion Control Modules** — automotive and Mercury computers. An entire retailer's catalog (perfprotech) uses "PCM" that way. | Always pair with `marine`, `Ford`, `351`, or `Pleasurecraft` |
| **`Windsor` alone** | Returns Windsor Ontario, chairs, castles | Pair with `351` or `Ford` |
| **`"marine"` in a listing title** | Means nothing — sellers add it as a keyword | Verify against a manufacturer part number, never a title |
| **Velvet Drive searches** | Probably the wrong transmission family entirely — see [`351w-swap.md`](351w-swap.md#the-transmission-is-probably-not-a-velvet-drive) | Search **PCM 40-series / Power Plus 1.23:1** |
| **Ring gear tooth count** | Often identical between marine and automotive 351W flywheels — proves nothing | Check thickness and damper-plate bolt circle |
| **Shipping on heavy iron** | Manifolds, covers, pumps, transmissions — shipping can exceed the part price | Rank on **landed cost**, never sticker |

---

## Bot-blocked — browser only

Live in a browser, invisible to automated fetch. **Flagged, not dropped** — Quint has live
browsing and should use it here.

| Site | Why it still matters |
|---|---|
| [marineengine.com](https://www.marineengine.com/parts/sierra-marine/pcm-pleasurecraft.html) | Hosts the Sierra PCM/Pleasurecraft application tables. Worth a manual visit. |
| perfprotech.com | ⚠️ **Its "PCM" pages mean Mercury Propulsion Control Module, not Pleasurecraft.** A search-term trap, not a source. |
| summitracing.com | Relevant for the automotive 351W side and marine-rated Holley carburetors. Discount pricing. |
| boats.net | OEM diagrams, but outboard-focused. Low relevance. |
| thehulltruth.com · basspro/cabelas · iboats store | Low relevance to this hull. |

**Dead:** `discountinboardmarine.com` — DNS-dead. Successor is [skidim.com](https://www.skidim.com/).
