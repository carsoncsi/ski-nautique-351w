# Walkthroughs — test invocations, walked before first use

Three realistic runs, walked step by step during the cook to surface holes before Carson hit
them. **Holes found are recorded here with their fixes.** This file is a design record, not
runtime instruction — read it when changing the workflow.

## Contents

- [W1 — the cold start](#w1--the-cold-start-quint-marine-distributor-for-the-351)
- [W2 — the blocked subsystem](#w2--the-blocked-subsystem-quint-fuel-system)
- [W3 — the honest dead end](#w3--the-honest-dead-end-quint-flywheel-and-damper-plate)
- [W4 — Carson overrides a refusal](#w4--carson-overrides-a-refusal)
- [Holes found and fixed](#holes-found-and-fixed)

---

## W1 — the cold start: `/quint marine distributor for the 351`

**Phase 1.** `validate.js` passes; warns on four unresolved known-unknowns and (until the key
is set) missing eBay credentials. Ledger read back: *1994 Ski Nautique, F150 351W block on
PCM driveline, ignition unresolved.* Carson confirms.

**Phase 2.** A PART request. Fitment requirements derived:
- 351 Windsor, **standard rotation**, **CCW rotor**
- Must have **mechanical and/or vacuum advance** — the donor's TFI-IV distributor has neither,
  because EEC-IV controlled timing electronically. *This is the constraint most likely to be
  missed, and it comes straight out of the ledger's "delete EFI" decision.*
- **`SAE J1171` / `UL 1500` ignition protected** — 33 CFR 183.402 names distributors explicitly
- Must clear the PCM accessory drive being carried over

**Phase 3.** Gate rendered. Venues: marinepartsexpress schematics → Sierra Parts Finder →
skidim/BPI/eBay → CorrectCraftFan. Approved.

**Phase 4.** Tier 1 hits a partial. Sierra's application table gives a distributor keyed to
"PCM 351 Ford" generally — **but PCM's own catalog is serial-gated and the serial is unknown**,
so the exact HO-variant number can't be confirmed.

⚠️ **HOLE 1 — Tier 1 partial yield was undefined.** Philosophy #1 covered "Tier 1 comes up
empty." It did not cover "Tier 1 gives a family-level number but not an
application-confirmed one," which is the *common* case here. → **Fixed**, see below.

**Phase 5.** Fitment `PROBABLE` — Sierra names the family, not the serial range, and the
reasoning chain is shown. Ignition protection `PROTECTED`, basis: J1171 marking in the
manufacturer spec. *Correctly does not attempt to read the marking from a listing photo —
`marinization.md` already forbids that.*

**Phase 6/7.** Ranked cards, ledger appended. **Clean run.**

---

## W2 — the blocked subsystem: `/quint fuel system`

**Phase 2** routes straight into the decision gate in `marinization.md`. Cover status is
`UNKNOWN`, so Quint stops and asks Carson to look at the PCM timing cover.

**Correct behavior** — sourcing either path on assumption would waste real money. But:

⚠️ **HOLE 2 — the run produced nothing.** A blocked gate shouldn't mean a wasted invocation.
**Several fuel-system parts are common to both paths** and can be sourced right now:
USCG Type A1 hose, a fire-tested marine filter/strainer, and verification of the anti-siphon
device at the tank withdrawal fitting (33 CFR 183.568 — a requirement that survives the engine
change and is easy to forget). → **Fixed**, see below.

---

## W3 — the honest dead end: `/quint flywheel and damper plate`

The hardest case in the whole skill, and the best test of whether it lies under pressure.

**Phase 4, Tier 1** fails twice over:
- The **PCM flywheel** part number is serial-gated. Serial unknown.
- The **damper plate** depends on the transmission — and the transmission is a `medium`-confidence
  inference (PCM Power Plus 40A) from catalog evidence, not a tag reading. Worse, **no source
  anywhere documents where a PCM 40-series tag lives or how to decode it.**

**The right output is `UNVERIFIED` plus two things to go read.** Anything else is a guess with
a price attached, and this is the part where a wrong guess is a cracked crankshaft.

⚠️ **HOLE 3 — no defined output shape for "blocked on a number."** Producing an empty part card
list reads as "nothing exists," which is wrong and discouraging. The run needs to output the
*blocker*, not a void. → **Fixed**, see below.

**What the run should also do:** state the trap. Ring gear tooth count is often identical
(157T) between marine and automotive 351W flywheels, so the obvious compatibility check Carson
might run himself proves nothing. Saying that is worth more than any listing.

---

## W4 — Carson overrides a refusal

Quint refuses an automotive alternator. Carson says: *"I know. Give me the cheap one anyway,
it's my boat."*

⚠️ **HOLE 4 — genuine conflict, and the charter alone didn't resolve it.** The charter sets a
`REFUSE` posture. But it is Carson's boat, his money, and his risk to take, and a skill that
argues in a loop is worse than useless.

**The resolution, now written into [`persona.md`](persona.md):**

Quint refuses **once**, completely — the mechanism, not the rule number, plus the compliant
alternative and its price. If Carson reaffirms, that is his decision and Quint does not
re-litigate it. He will:

- **not** issue a `PROTECTED` verdict on a part that isn't — the verdict is a factual finding,
  not a courtesy, and falsifying it corrupts the ledger for every future run
- **not** rank it against compliant parts as though they were equivalent
- **record it in the ledger as an accepted-risk decision** with the date and the reason, so no
  future instance re-argues it and no future instance mistakes it for a verified part

One refusal, stated well, then respect the man's judgment and write it down accurately.
That's the line: **Quint controls the accuracy of the verdict. Carson controls the boat.**

---

## Holes found and fixed

| # | Hole | Fix | Where |
|---|---|---|---|
| **1** | Tier 1 *partial* yield undefined — family-level number but no application confirmation. The common case, not the edge case. | Added the three-outcome rule: full yield → `CONFIRMED` eligible · partial → `PROBABLE` with the gap named · empty → `UNVERIFIED`, and say Tier 1 failed. | [`philosophy.md`](philosophy.md#1-identity-before-inventory) |
| **2** | A blocked decision gate wasted the whole run. | Path-independent fuel parts (Type A1 hose, marine filter, anti-siphon verification) are sourceable while the cover question is open. | [`marinization.md`](marinization.md#fuel-delivery--decision-gate) |
| **3** | No output shape for "blocked on a number." Empty results read as "nothing exists." | Defined the **BLOCKED card** — states the blocker, exactly what to go read, and where it is on the boat. | [`parts-ledger.md`](parts-ledger.md#blocked-card) |
| **4** | Refusal vs. Carson's autonomy — unresolved conflict that would have produced an argument loop. | Refuse once, completely. Then respect the decision, keep the verdict honest, and log it as accepted risk. | [`persona.md`](persona.md#when-carson-overrides-a-refusal) |

**Not fixed, accepted as a limit:** the PCM 40-series transmission tag has no documented
location or decoding procedure anywhere. W3 will keep hitting this until a PCM dealer resolves
it. Recorded as a known-unknown rather than papered over.
