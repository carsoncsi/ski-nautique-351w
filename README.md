# 1994 Ski Nautique — 351W Repower

Research and tooling for a specific boat: a **1994 Ski Nautique** getting a **carbureted 351
Windsor** (donor: 1992 F-150) on a **PCM direct-drive** driveline.

The goal was to work out what actually has to be marine-spec versus what merely bolts on, pin
down the durable facts about the swap, and map out where to buy parts — before spending money
on something that goes back in the box nine days later.

Three parts:

- **[`research/`](research/)** — the raw research round. Scope, then ~830 lines of findings,
  every claim carrying a source link and a confidence rating.
- **[`skill/quint/`](skill/quint/)** — that research baked into a working Claude Code skill.
  A parts hunter with a persistent memory of this hull.
- **[`skill/breaking-bot/`](skill/breaking-bot/)** — the meta-skill that *built* Quint. It
  interviews you, researches, and generates a complete skill. Included so you can cook your own.

---

## Start here

If you have [Claude Code](https://claude.com/claude-code) installed, clone this and run one
command:

```bash
git clone https://github.com/carsoncsi/ski-nautique-351w
cd ski-nautique-351w
claude
```

Then type:

```
/start-here
```

It checks what's on your machine, gives you a two-minute tour, installs both skills, and walks
you into building one of your own. If you'd rather do it by hand, the manual steps are further
down.

**Two things to know before your first run:** both skills will call you *Carson* — they're one
person's working tools shipped as-is rather than sanded into a generic template, and the
specificity is most of why they work. And Breaking Bot references a few sibling skills that
aren't in this repo (`/claudefather`, `/ocean`, `/build-agent`); it'll occasionally suggest
handing work off to one, and that suggestion just goes nowhere. Nothing breaks either way.

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

### Install by hand

`/start-here` does this for you, but if you'd rather:

```bash
mkdir -p ~/.claude/skills
cp -r skill/quint ~/.claude/skills/quint
cp -r skill/breaking-bot ~/.claude/skills/breaking-bot
```

Restart Claude Code so the new skills register, then invoke `/quint` — or just describe a part
or a symptom.

### Pointing it at a different boat

Quint is built for one specific hull. Rewrite `reference/the-boat.md`,
`reference/parts-ledger.md`, and `THE-RECIPE.md` for yours. Keep `reference/marinization.md`,
`reference/venues.md`, and `reference/ebay-api.md` as-is — those apply to any gasoline inboard.
Replace `reference/351w-swap.md` if you're running a different engine family.

`/start-here` will do the rewrite with you, interview-style, if you ask it to.

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

## Cooking your own skill

[`skill/breaking-bot/`](skill/breaking-bot/) is the meta-skill that built Quint. You interview
with it, it researches, and it generates a complete skill directory — charter, knowledge base,
scripts, the works. Three tiers: *basic* (quick scaffold), *normal* (a solid working skill), and
*Heisenberg* (the full treatment — baked-in research, persona, philosophy, learning loop). Quint
is Heisenberg tier.

```
/breaking-bot
```

Start smaller than Quint. A good first cook is *normal* tier on something you already do by hand
every week — where there's real judgment involved and getting it wrong has a cost you can name.

Worth reading either way:
[`skill/breaking-bot/scratch/reflections/2026-08-09-quint-cook.md`](skill/breaking-bot/scratch/reflections/2026-08-09-quint-cook.md)
is Breaking Bot's own write-up of the run that produced Quint — what it caught, what broke, and
what it learned. It's the seam between the two halves of this repo. One example from it: a
generated search script shipped with a universal exclusion list containing the word `cover`,
which would have silently zeroed out every search for a *timing cover* — the single most
important part in the whole project. A realistic test query caught it; a placeholder wouldn't
have.

---

## Known gaps

None of the identifying numbers have been collected yet — PCM engine serial, transmission tag,
HIN, Ford block casting number, and the PCM timing cover casting number. Every serial-gated
lookup is pending rather than resolved.

## Two search traps worth knowing regardless

- **`PCM` alone** returns Powertrain/Propulsion Control Modules — automotive and Mercury
  computers. Always pair it with `marine`, `Ford`, `351`, or `Pleasurecraft`.
- **`Windsor` alone** returns Windsor Ontario, chairs, and castles. Pair with `351` or `Ford`.
