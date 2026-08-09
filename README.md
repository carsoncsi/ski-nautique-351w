# 1994 Ski Nautique — 351W Repower

Research and tooling for a specific boat: a **1994 Ski Nautique** getting a **carbureted 351
Windsor** (donor: 1992 F-150) on a **PCM direct-drive** driveline.

The goal was to work out what actually has to be marine-spec versus what merely bolts on, pin
down the durable facts about the swap, and map out where to buy parts — before spending money
on something that goes back in the box nine days later.

Two halves:

- **[`research/`](research/)** — the raw research round. Scope, then ~830 lines of findings,
  every claim carrying a source link and a confidence rating.
- **[`skill/quint/`](skill/quint/)** — that research baked into a working Claude Code skill.
  A parts hunter with a persistent memory of this hull.

---

## The research

| File | What it is |
|---|---|
| [`research/R1-scope.md`](research/R1-scope.md) | The scope. What questions the research had to answer, what was deliberately left out, and which sources to trust. Read first if you want to know *why* the findings cover what they cover. |
| [`research/R4-findings.md`](research/R4-findings.md) | The findings, across four themes: marinization law, durable 351W swap facts, the parts venue map, and the eBay API. |

### Headline findings

- **Check the PCM timing cover for a fuel pump mounting pad before anything else.** On 1988+
  small-block Fords the mechanical fuel pump provision may be a *timing cover* feature, not a
  block feature — and the plan already carries PCM's cover over. A mechanical pump sidesteps the
  entire electrical-compliance stack an electric pump drags in (ignition protection,
  run-interlock per 183.524(b), pressure limiting). One physical look decides the fuel system
  architecture and a real chunk of the budget.
- **The transmission is probably a PCM Power Plus 40A, not a Velvet Drive.** Four independent
  lines of catalog evidence, including Correct Craft listing two different mufflers for
  1992–94 Ski Nautiques — one "with 1:1 transmission," a separate one for the 1.23:1. Velvet
  Drive direct-drive is 1:1 only; their reductions start at 1.52:1. Still circumstantial —
  defer to the physical tag.
- **Ring gear tooth count is useless as a compatibility check.** Marine and automotive 351W
  flywheels are often both 157T. The real differentiators are flywheel thickness/rigidity and
  the PCM-specific damper plate bolt circle.
- **Fuel hose is a bright line.** Pump→carb must be USCG Type A1, permanently stamped. The
  donor truck's SAE 30R9 does not qualify at any price — Continental's own spec sheet says
  "USCG Specifications: Not Applicable."
- **The eBay Browse API silently excludes auctions by default.** For rare marine parts that's
  where the inventory is. Any script has to query `FIXED_PRICE` and `AUCTION` explicitly.
- **Free Terapeak beats the gated API.** ~3 years of sold-price history in Seller Hub vs. 90 days
  from Marketplace Insights, which an individual developer will not get approved for anyway.

### How to read the confidence labels

Findings are labeled `high` / `medium` / `low`, with sources tagged *canonical* (regulation text,
manufacturer docs), *adjacent* (retailer listings, technical writeups), or *folklore* (forum
reports — useful for real-world fitment, never sufficient alone).

Two sections near the end of the findings are worth reading even if you skim the rest:
**Conflicts Between Sources** (where sources disagree, surfaced rather than averaged) and
**Honest Uncertainty** (what the evidence does not settle — ABYC standards are paywalled, so
anything attributed to them is secondhand or from a 1993 archive edition).

---

## The skill

[`skill/quint/`](skill/quint/) is a [Claude Code](https://claude.com/claude-code) skill built on
top of the research. Not a search wrapper — it carries the hull's spec and build state in a
persistent ledger, establishes a part number from a catalog *before* shopping, labels every
fitment claim `CONFIRMED` / `PROBABLE` / `UNVERIFIED`, and refuses any part that fails ignition
protection for a gasoline bilge.

```
skill/quint/
├── SKILL.md          entry point — the run procedure
├── CHARTER.md        immutable mission; never modified during a run
├── THE-RECIPE.md     the standing build plan
├── reference/        the baked knowledge base
│   ├── the-boat.md         hull spec + current build state
│   ├── parts-ledger.md     what's bought, what's needed, what's open
│   ├── marinization.md     33 CFR / ABYC — what must be marine
│   ├── 351w-swap.md        durable engine + driveline facts
│   ├── venues.md           retailers, forums, salvage, eBay syntax
│   ├── ebay-api.md         Browse API mechanics
│   ├── gotchas.md          the traps, collected
│   ├── sellers.md          who's been good
│   ├── lessons.md          accumulated verdicts
│   └── ...                 persona, philosophy, walkthroughs, learning loop
└── scripts/
    ├── ebay-search.js      deterministic search-URL builder
    ├── ebay-api.js         Browse API client (queries BIN + auction)
    ├── validate.js         preflight check
    └── learning-audit.js   reviews what the skill has learned
```

### Install

Copy it into your skills directory:

```bash
cp -r skill/quint ~/.claude/skills/quint
```

Then invoke it in Claude Code with `/quint` — or just describe a part or a symptom.

**Heads up:** the skill is written for *this* boat and addresses its owner by name throughout.
If you're pointing it at a different hull, `reference/the-boat.md`, `reference/parts-ledger.md`,
and `THE-RECIPE.md` are the files to rewrite. The regulatory and venue references
(`marinization.md`, `venues.md`, `ebay-api.md`) apply to any gasoline inboard.

### Scripts

Standalone Node — no dependencies, builtins only. Node 18+ (needs global `fetch`).

```bash
# Build search URLs — encodes the verified eBay syntax, category IDs,
# exclusion strings, and the two known search traps
node skill/quint/scripts/ebay-search.js "marine distributor 351w"
node skill/quint/scripts/ebay-search.js --auto --max 250 "351 windsor flywheel"

# Query the Browse API live (needs your own free eBay developer keyset)
export EBAY_CLIENT_ID=... EBAY_CLIENT_SECRET=...
node skill/quint/scripts/ebay-api.js --token          # verify credentials
node skill/quint/scripts/ebay-api.js "damper plate pcm"
```

`ebay-search.js` needs no credentials — it only builds URLs you open yourself. Getting a keyset
for `ebay-api.js` is free; the signup path (including the compliance step that otherwise leaves
your production keyset disabled) is documented in
[`reference/ebay-api.md`](skill/quint/reference/ebay-api.md).

---

## Known gaps

None of the identifying numbers have been collected yet — PCM engine serial, transmission tag,
HIN, Ford block casting number, and the PCM timing cover casting number. Every serial-gated
lookup is pending rather than resolved.

## Two search traps worth knowing regardless

- **`PCM` alone** returns Powertrain/Propulsion Control Modules — automotive and Mercury
  computers. Always pair it with `marine`, `Ford`, `351`, or `Pleasurecraft`.
- **`Windsor` alone** returns Windsor Ontario, chairs, and castles. Pair with `351` or `Ford`.
