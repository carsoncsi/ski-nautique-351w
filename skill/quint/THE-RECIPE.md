# The Recipe — Quint

*A one-time note from Heisenberg. Read it, act on it, archive or delete. This isn't living
context — it's a letter.*

---

*sets down the beaker. wipes his hands.*

You came in asking for a search wrapper with a memory. What you're walking out with is a
machine that will tell you no.

## What I cooked

Quint is a parts hunter for exactly one boat. He carries your hull, both engines, the
driveline, and the current build state in a ledger he reads before he does anything else — so
no instance ever asks you what boat this is, and none of them ever reasons from the engine
that's sitting on a pallet instead of the one on the stand.

The architecture has one load-bearing idea: **identity before inventory.** He does not search
a marketplace for a description. He establishes the part number from a catalog or an exploded
diagram first, and only then goes looking for one to buy. That single ordering is what stops
the failure you named — a confident part number on a live listing that doesn't fit your
application. Everything else in the skill is scaffolding around that.

The second idea is that he refuses. On ignition protection and fuel-system safety he does not
recommend-with-a-caveat, because a caveat gets skimmed and a refusal does not. You told me
"cheapest that works," and he honors it — he ranks by value and he hunts for the deal. But he
ranks *among parts that pass*. That distinction is written into the charter where the Learning
Loop can't reach it.

**Mission:** find, verify, and locate parts for the 1994 Ski Nautique 351W conversion — every
recommendation carrying a live source you can open and judge yourself.

## Purity standard

How you know this skill did its job:

1. **Open every URL in the output.** They all resolve to a live, on-topic page. One 404 or
   wrong-part page means the run was contaminated.
2. **Every recommendation carries exactly one fitment label** — `CONFIRMED`, `PROBABLE`, or
   `UNVERIFIED`. A recommendation without a label isn't an oversight, it's contamination.
3. **Every engine-bay electrical or fuel item carries an ignition-protection verdict** with a
   stated basis. A missing verdict is a safety gap, not a formatting gap.

If you see output and none of these hit, you shipped garbage. Stop using it. Fix the skill.

## How to invoke

**Primary:** `/quint`

**Natural triggers:** "find me a…" · "what part do I need for…" · "source a…" ·
"the Nautique needs…" · describing a symptom on the boat

**Sub-commands:** `/quint ledger` prints the boat's spec and build state · `/quint log <finding>`
deposits something you learned in the garage · `/quint` bare runs teach-me mode

**Cold start:** `/quint marine distributor for the 351`

## Known limits

- **One boat.** The ledger is hardcoded. He will not help with another hull, and that's by design.
- **He does not transact.** No bidding, no buying, no messaging sellers. He finds, you pull the trigger.
- **He will not write to the spec ledger without your confirmation.** Proposals only.
- **Engine and driveline only.** Not hull, trailer, upholstery, canvas, electronics, steering.
- **No sold-price data from eBay, programmatically.** That door is closed — see below.

These aren't bugs. They're boundaries. `CHARTER.md` has the full list.

## Contamination risks

Ways this thing can quietly hand you bad output:

- **The stale ledger (F4).** You swap the PCM heads back on and don't tell him. Every run after
  that reasons confidently from a wrong baseline, silently, forever. This is why Phase 1 reads
  the build state back to you out loud — *actually read it.* It's ten seconds and it's the
  cheapest insurance in the skill.
- **Folklore promoted to fact (F1, F5).** A meaningful share of what he knows about your
  driveline is forum consensus, not manufacturer documentation — the flywheel conclusion in
  particular has **no** canonical PCM source behind it. It's all tagged `[folklore]` and
  `[medium]` in the reference files. When he cites something, **read the citation, not the
  label.**
- **Asking prices masquerading as market value (F6).** For rare marine parts, a seller who's
  had a part listed three years at $400 is not evidence it's worth $400.

More in `reference/gotchas.md`.

## Learning Loop — on

`learns: true`. Reflections land in `scratch/reflections/` after runs that surface a
correction, a wrong label, a dead venue, or a near-miss. Patterns seen three times get offered
to you for promotion into `reference/lessons.md`. Nothing promotes silently, and **no lesson
can ever relax the safety floor** — a candidate pointing that direction gets killed at the
gate, not debated.

The three highest-value lessons this skill is likely to learn: which venues' fitment data
actually held up, which sellers described parts honestly, and whether `PROBABLE` findings are
turning out right. That last one is invisible from any single run — it's the entire reason the
Loop exists.

`node scripts/learning-audit.js` tells you whether it's actually working or just accumulating
drafts nobody reads.

## Sources I used

Four research workers, seventeen questions. Full draft with every citation in
`~/Desktop/Boat research/research/R4-findings.md`. Anchors:

- **[33 CFR 183](https://www.law.cornell.edu/cfr/text/33/183.410)** — .402 (what counts as an
  electrical component), .410 (the ignition-protection standard), .524 (fuel pumps), .540/.558
  (hose types and where each is required), .568 (anti-siphon)
- **[46 CFR 25.35-1](https://www.law.cornell.edu/cfr/text/46/25.35-1)** — backfire flame
  control. Vessel-facing, no grandfathering, and the one that binds you personally
- **ABYC H-24, E-11, P-1** — paywalled. Cited secondhand from a 1993 archive edition and
  third-party summaries, and **labeled that way everywhere it appears**
- **[Ford Performance M-6287-B302](https://performanceparts.ford.com/part/M-6287-B302)** — the
  fuel pump eccentric, which turns out to be a bolt-on, not part of the cam
- **[eBay developer docs](https://developer.ebay.com/api-docs/buy/browse/overview.html)** — via
  Wayback captures; the live site blocks automated fetch
- **14 retailers, 4 forums, 7 salvage channels** — every URL fetched live and verified

## What I'd build next

**Three things, in this order.**

**One — go read four numbers.** PCM engine serial, transmission tag, HIN, Ford block casting.
Add a fifth I didn't have when we started: **the PCM timing cover casting number.** Every
serial-gated lookup in this skill is currently flagged *pending* instead of resolved, and
that's the honest answer, but it's a worse answer than the real one.

**Two — look at the timing cover.** Two bolt holes and a machined pad, driver's side. If
they're there, the mechanical fuel pump comes back and an entire compliance subsystem —
ignition-protected pump, oil-pressure interlock, relay, bypass, pressure regulation, fusing —
evaporates. That is the highest-leverage ten seconds available to you on this whole build, and
neither of us knew it existed when we started this conversation.

**Three — get the eBay keyset.** Twenty minutes. And **do the account-deletion-notification
compliance step** or the production key sits there disabled while you wonder why nothing works.

One more, when you have a slow evening: register on CorrectCraftFan and pull the factory
manuals. Manufacturer documentation outranks every forum thread in this skill's knowledge base,
and right now the skill has almost none of it. That's the single biggest quality upgrade
available.

---

*pulls off the safety glasses.*

I'll tell you what I like about this one. You gave me a real constraint — no mechanical pump
boss — and the research came back and told us the constraint might not be real. That's not me
being clever. That's the process working. Two workers who never spoke to each other, each
holding half of an answer neither could see.

That's what the ledger is for. Not so the skill remembers your boat. So it remembers what it
figured out about your boat, and doesn't have to figure it out again.

Feed it. Every run, every part, every seller that shipped you the wrong thing. A skill that
doesn't eat, starves.

*Now go check that cover.*

---

*Read once. Archive or delete. The skill speaks for itself from here.*
