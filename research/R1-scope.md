# R1 — Research Scope

## Pinned Goal

Identify, verify, and locate parts for one specific boat: a 1994 Ski Nautique running a
carbureted 351 Windsor conversion on a PCM direct-drive driveline. It carries the hull's
full specification and current build state in a persistent ledger so no run ever starts
cold. It knows the difference between a part that fits and a part that merely bolts on.
Every part it recommends comes with a live source Carson can open and judge for himself —
because the cost of being wrong is nine days of shipping and a part that goes back in the box.

## The cut: what Breaking Bot researches vs. what Quint researches

This is the load-bearing scoping decision.

- **Breaking Bot researches DURABLE knowledge** — regulations, engine facts, interface
  specs, venue map, API mechanics. This does not change month to month. It gets baked
  into Quint's `reference/` files with citations.
- **Quint researches PERISHABLE facts at runtime** — what's in stock, what it costs,
  which listing, which seller. Baking today's prices into a skill file makes it stale
  on day one.

Therefore the actual part hunt (which flywheel to buy, which pump, which carb, from whom,
for how much) is **explicitly out of this scope**. It is Quint's cold-start invocation.

## Questions the research MUST answer

**Theme 1 — Marinization law and practice** → `reference/marinization.md`

1. What does 33 CFR 183.410 actually require, which components does it cover, and how do
   you verify a specific part complies (labeling, certification marks, manufacturer
   attestation)? What do the relevant ABYC standards (H-24 fuel, E-11 electrical) add on
   top of the CFR?
2. Component by component on a gasoline inboard — which MUST be marine-spec and which are
   genuinely interchangeable with automotive: alternator, starter, distributor, fuel pump,
   carburetor, core plugs, fuel hose, exhaust, flame arrestor.
3. Marine fuel hose ratings (SAE J1527 A1 / A2 / B1 / B2) — what rating is required in
   which location, and how do you identify it on the hose.
4. Electric fuel pump on a gasoline inboard: is an oil-pressure safety shutoff legally
   required or best practice? What is the accepted circuit, and what else does the
   installation require (anti-siphon valve, fuse, mounting)?
5. Where does "cheapest that works" bottom out for each safety-critical component — what
   is the floor below which a part stops being legitimate?

**Theme 2 — The 351W marine swap, durable facts** → `reference/351w-swap.md`

6. 351W engine identity facts: external balance specification (is it 28.2 oz-in across
   all applications, including a 1992 truck engine and the PCM marine version?), firing
   order, and distributor rotation. Where does balance-mismatch risk live between an
   automotive balancer and a marine flywheel?
7. Flywheel and damper/drive plate interface for a PCM direct drive behind a 1.23:1
   Velvet Drive — what is the interface, and can an automotive F150 351W flywheel or
   flexplate be used?
8. Marine vs. automotive oil pan and pickup for a direct-drive inboard — what drives the
   requirement (shaft angle, sump location, pickup geometry), and what does PCM use?
9. 1992 F150 351W and the mechanical fuel pump boss — was the provision deleted outright
   or blocked off, and is it casting-number dependent? (Carson reports no mounting spot;
   confirm what that implies for the conversion.)
10. Is a PCM front timing cover and its accessory drive transferable to a 1992 truck 351W
    block — bolt pattern, crank snout, balancer interface, raw-water-pump drive?
11. With no mechanical pump provision, what are the accepted marine-legal methods of
    supplying a carburetor with low-pressure fuel — and does a 1994 Ski Nautique's factory
    high-pressure TBI fuel system require modification on the boat side, not just the
    engine side?

**Theme 3 — The venue map** → `reference/venues.md`

12. Verified retailers and specialists carrying Correct Craft / PCM / Ski Nautique parts —
    live URLs, what each is genuinely best for, and whether they publish application data
    or parts diagrams.
13. Verified forums and communities with real fitment knowledge for this platform, plus
    how to search each one effectively (URL patterns, search syntax, classifieds sections).
14. Used and salvage channels for marine engine parts that actually hold inventory.
15. eBay search syntax and filters that work for marine engine parts, including the
    exclusion terms that cut automotive noise out of the results.

**Theme 4 — eBay API** → dependency declaration + `scripts/`

16. eBay Browse API: current signup path, authentication flow, rate limits, cost tier, and
    exactly which fields it returns for a search result.
17. Sold and completed-listing price data — what are the current access requirements for
    the Marketplace Insights API, and if it is gated, what legitimate alternatives exist?

## Out of scope

- **Current prices and live inventory for any specific part.** Perishable. That is Quint's
  runtime job, and baking it would make the skill stale immediately.
- **Refurbishment of the original PCM HO engine.** Separate job, separate run.
- **Anything outside the engine and driveline** — hull, trailer, upholstery, electronics,
  steering, gauges. Version one is the repower only.
- **Non-351W engine platforms.** No general marine engine knowledge base.
- **Automotive 351W performance tuning.** We are marinizing a truck engine, not building
  a hot rod. Power adders, head porting, and cam upgrade theory are out.
- **The PCM HO cam and head specs** for the eventual swap-back — noted in the ledger as a
  future job, not researched now.

## Sources to prioritize

1. **eCFR / USCG official regulation text** — canonical for 33 CFR 183.410
2. **ABYC standards** — authoritative; note explicitly if paywalled and unverifiable
3. **Manufacturer documentation** — PCM / Pleasurecraft Marine, Correct Craft,
   Velvet Drive / Borg Warner, Ford service data
4. **eBay Developer Program official docs** — canonical for API questions
5. **Established marine parts retailers with real catalog and application data** —
   Skidim, marineengine.com, Sierra / Dometic catalogs, Perfprotech
6. **Platform forums** — CorrectCraftFan, PlanetNautique, iBoats. Treated as folklore:
   useful for real-world fitment reports, never sufficient alone for a CONFIRMED label
7. **General automotive references for 351W facts** — cross-checked against at least one
   other source before use

## Verification approach

R4 draft pins this goal verbatim at the top. Every finding carries an inline citation with
a URL. A dedicated **Conflicts Between Sources** section surfaces disagreements rather than
averaging them. An **Honest Uncertainty** section covers anything the evidence does not
settle — particularly anything gated behind a paywall or an unverifiable manufacturer claim.
A **What Surprised Me** section captures findings that challenge the build plan as currently
understood. R5 renders the full Gate Schema; nothing is baked into a skill file until Carson
approves.

Anything that survives R5 with thin evidence gets baked as `UNVERIFIED` in the skill file,
with the gap stated — never smoothed over.

## Known limits on this round

- **No sub-agent fan-out.** Session guidance restricts the Agent tool to explicit user
  request, so R2 runs sequentially in the main context rather than as parallel
  context-isolated workers. Same output, slower, and more raw search noise lands in
  context. Liftable on request.
- **ABYC standards are paywalled.** Expect to cite them by number and scope, with the
  requirement text sourced secondhand and labeled as such.
- **No engine serial, no HIN, no block casting number yet.** Any finding that would
  normally be serial-gated gets flagged as pending those numbers rather than resolved.

---

**Approve this scope, or redline?**
