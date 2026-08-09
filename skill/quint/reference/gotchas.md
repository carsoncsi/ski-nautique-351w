# Gotchas — failure modes and traps

The most valuable file in the skill. Two halves: **how Quint fails** (recognize it, catch it)
and **traps in the domain itself** (things that look like the right move).

Grows through the Learning Loop. Candidate entries accumulate in `../scratch/reflections/`
and are promoted here only through the gate — never silently.

## Contents

- [Failure modes — how Quint breaks](#failure-modes--how-quint-breaks)
- [Category traps — the Researcher's signature failures](#category-traps--the-researchers-signature-failures)
- [Domain traps — marine parts sourcing](#domain-traps--marine-parts-sourcing)
- [Platform traps — this boat specifically](#platform-traps--this-boat-specifically)

---

## Failure modes — how Quint breaks

### F1 — The confident cross-reference
**What happens:** Quint finds a part number, finds it listed for sale, and reports it. But
the number was for a different year, a different application, or a different serial range.
Everything about the output looks correct.

**Why it's the worst one:** It is indistinguishable from success until the box arrives.

**How to catch it:** Fitment reads `CONFIRMED` — now read the *citation*, not the label. Does
the cited source explicitly name a 1994 Ski Nautique, a PCM HO 351W, or the relevant serial
range? If the source names a *similar* application and Quint reasoned across the gap, the
correct label was `PROBABLE`, and the reasoning chain should be visible.

**Structural defense:** Identity before inventory (philosophy #1). The part number comes
from a catalog, not from a listing title.

---

### F2 — The automotive substitute
**What happens:** The part is cheaper, more available, and physically identical. It gets
recommended on those merits. It is not ignition protected, and it is going into a closed
space that accumulates gasoline vapor.

**How to catch it:** The ignition-protection verdict is missing, or it reads as a hedge —
"likely fine," "generally acceptable," "many people use these." Those are not verdicts.

**Structural defense:** A boat is not a truck (philosophy #2), plus the charter's REFUSE
posture. This is the one axis where Quint refuses rather than warns.

---

### F3 — The dead link
**What happens:** The listing sold between the research and Carson reading the report.

**Why it's the least serious:** It is an expiry, not a defect. But it degrades trust in the
whole report if it isn't handled honestly.

**How to catch it:** Every listing carries an as-of stamp. If it's more than a day old,
treat it as a lead, not as inventory.

**Structural defense:** Availability is a stamped field on every part card, never implied.

---

### F4 — The stale ledger
**What happens:** The build state changes — the PCM heads go back on, the transmission tag
finally gets read, a part gets installed — and the ledger isn't updated. Every subsequent
run reasons confidently from a wrong baseline.

**Why it's insidious:** It is silent, and it compounds. Every future run inherits it.

**How to catch it:** Phase 1 reads the current build state back out loud specifically so
Carson can catch it. If the read-back doesn't match the engine on the stand, stop and fix
the ledger before doing anything else.

**Structural defense:** Philosophy #5. Read-back at Phase 1, deposit at Phase 7.

---

### F5 — Forum-post gospel
**What happens:** One person on a forum in 2009 said it fit. No photos, no part number, no
follow-up. It gets promoted to `CONFIRMED`.

**How to catch it:** Single-source fitment, undated or old forum post, labeled `CONFIRMED`
instead of `PROBABLE`.

**Structural defense:** Tier 3 sources are explicitly folklore. A forum report can *raise*
confidence and it can *contradict* a catalog usefully — but it cannot by itself produce a
`CONFIRMED`. Threads with photos and part numbers are worth substantially more than threads
without.

---

### F6 — Price anchoring on asking prices
**What happens:** For rare marine parts, asking prices are aspirational. A seller who has
had a part listed for three years at $400 is not evidence that the part is worth $400.
Quint reports the range of asking prices as though it were a market.

**How to catch it:** Every price in the report is an ask, and none is a sale.

**Structural defense:** Distinguish ask from sold explicitly wherever sold data is
obtainable. Where it isn't, label the price as an ask and say the market value is unknown.

---

## Category traps — the Researcher's signature failures

From the skill taxonomy. Pre-loaded because the category predicts the failure.

- **Ungrounded synthesis.** Producing a coherent, confident answer that no single source
  supports. Defense: cite inline, per claim, not per section.
- **Hallucinated citations.** A URL that looks right and doesn't exist, or exists and
  doesn't say what was claimed. Defense: only cite pages actually opened this run.
- **Confirmation bias.** Finding the part Carson hoped for and stopping. Defense: the
  conflicts section is mandatory, and an empty one is a red flag, not a clean bill.
- **Cataloguing trivia as findings** (the Auditor half). Fifteen minor observations burying
  the one that matters. Defense: rank by consequence, lead with what blocks the build.

---

## Domain traps — marine parts sourcing

- **"Marine" in a listing title means nothing.** It is a keyword sellers add. Verify against
  a manufacturer part number, not a title.
- **Ignition protection is not visible in a photo.** A marine alternator and an automotive
  one look alike. The verdict comes from the part number and the manufacturer's
  specification, never from an image.
- **Rebuilt marine parts are a real market** and often the best value on this platform —
  but rebuilder quality varies enormously and the warranty terms are where the difference
  shows. Check the terms, not just the price.
- **Sierra, Mallory Marine, and similar aftermarket lines cross-reference to OEM numbers.**
  Finding the OEM number first usually unlocks a cheaper equivalent. This is where "cheapest
  that works" actually pays off — the aftermarket equivalent is legitimate, the automotive
  substitute is not. Do not confuse the two.
- **Shipping on heavy parts (manifolds, blocks, transmissions) can exceed the part price.**
  A cheap part three states away may lose to a dearer one nearby. Landed cost is the number
  that matters.
- **Boat parts have brutal seasonality.** Prices and availability move with the season.
  A part that's scarce in spring may be findable in November.

---

## Platform traps — this boat specifically

- **PCM catalog lookups are serial-gated.** Without the engine serial, PCM-side results are
  approximate. Flag them as pending rather than resolving on assumption.
- **"351W" spans a lot of variation.** Truck, car, marine, and across a long production run.
  A part that fits *a* 351W may not fit *this* one. The block casting number is what settles
  it — and it is currently unknown.
- **Correct Craft used multiple engine suppliers across years.** Confirm PCM specifically
  rather than assuming the boat's model year implies the engine.
- **The engine in the boat is no longer the engine the boat came with.** This is the trap
  most likely to catch a future instance that skims the ledger: a catalog lookup keyed to
  "1994 Ski Nautique" returns parts for the *PCM HO*, which is on a pallet, not in the hull.
  Anything engine-side must be keyed to the F150 block. Anything driveline-side is still PCM.
  **Read the ledger. This is exactly why it exists.**
