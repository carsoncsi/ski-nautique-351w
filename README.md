# 1994 Ski Nautique — 351W Repower Research

Research notes for a specific boat: a **1994 Ski Nautique** getting a **carbureted 351 Windsor**
(donor: 1992 F-150) on a **PCM direct-drive** driveline.

The goal was to work out what actually has to be marine-spec versus what merely bolts on, pin
down the durable facts about the swap, and map out where to buy parts — before spending money
on something that goes back in the box nine days later.

## What's in here

| File | What it is |
|---|---|
| [`research/R1-scope.md`](research/R1-scope.md) | The scope. What questions the research had to answer, what was deliberately left out, and which sources to trust. Read this first if you want to know *why* the findings cover what they cover. |
| [`research/R4-findings.md`](research/R4-findings.md) | The findings. ~830 lines across four themes, every claim carrying an inline source link and a confidence rating. |

## The four themes

1. **Marinization law and practice** — 33 CFR 183 / 46 CFR 25.35-1, ABYC, and a
   component-by-component verdict on what must be marine.
2. **The 351W marine swap** — balance spec, flywheel/damper plate interface, oil pan, the fuel
   pump boss question, timing cover transferability.
3. **The venue map** — retailers, forums, and salvage channels that actually carry this stuff,
   ranked by what each is genuinely good for.
4. **eBay API** — whether a parts-hunting script is buildable, and what the sold-price data
   situation really is.

## Headline findings

- **Check the PCM timing cover for a fuel pump mounting pad before anything else.** On 1988+
  small-block Fords the mechanical fuel pump provision may be a *timing cover* feature, not a
  block feature — and the plan already carries PCM's cover over. A mechanical pump sidesteps the
  entire electrical-compliance stack that an electric pump drags in (ignition protection,
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

## How to read the confidence labels

Findings are labeled `high` / `medium` / `low`, with sources tagged *canonical* (regulation text,
manufacturer docs), *adjacent* (retailer listings, technical writeups), or *folklore* (forum
reports — useful for real-world fitment, never sufficient alone).

Two sections near the end are worth reading even if you skim the rest:

- **Conflicts Between Sources** — where sources disagree, surfaced rather than averaged.
- **Honest Uncertainty** — what the evidence does not settle. ABYC standards are paywalled, so
  anything attributed to them is secondhand or from a 1993 archive edition.

## Known gaps

None of the identifying numbers have been collected yet — PCM engine serial, transmission tag,
HIN, Ford block casting number, and the PCM timing cover casting number. Every serial-gated
lookup in the findings is pending rather than resolved.
