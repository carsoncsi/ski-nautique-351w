# R4 — Research Findings

## Pinned Goal

Identify, verify, and locate parts for one specific boat: a 1994 Ski Nautique running a
carbureted 351 Windsor conversion on a PCM direct-drive driveline. It carries the hull's
full specification and current build state in a persistent ledger so no run ever starts
cold. It knows the difference between a part that fits and a part that merely bolts on.
Every part it recommends comes with a live source Carson can open and judge for himself —
because the cost of being wrong is nine days of shipping and a part that goes back in the box.

---

# Theme 1 — Marinization law and practice

*Destination: `reference/marinization.md`*

## The two regulatory regimes — and why the distinction matters

The single most useful structural finding of this theme: **there are two separate bodies of
law here and they bind different people.**

**33 CFR Part 183** (Subpart I — Electrical Systems; Subpart J — Fuel Systems) is written
against *manufacturers*. 33 CFR 181.3 defines "Manufacturer" as a person engaged in the
manufacture, construction, or assembly of boats or associated equipment, or importation for
sale. An individual performing a DIY repower on a hull he already owns does not meet that
definition, and no CFR provision was found requiring an owner to recertify or relabel after
a repower.
[33 CFR 181.3](https://www.law.cornell.edu/cfr/text/33/181.3) ·
[33 CFR 183.401](https://www.law.cornell.edu/cfr/text/33/183.401) — *canonical; the
owner-exemption inference is the worker's synthesis from definitional text, labeled `medium`
confidence, not an explicit CFR statement.*

**46 CFR 25.35-1** is different in kind. It is vessel-facing, phrased as a direct equipment
requirement, and it is what a boarding officer actually checks.
[46 CFR 25.35-1](https://www.law.cornell.edu/cfr/text/46/25.35-1)

**Why Quint does not treat the Part 183 nuance as a loophole:** the certification *mechanism*
is manufacturer-directed, but the *physics* the standards encode are not. The regulation
describes what ignites a bilge; the bilge does not check who installed the alternator. Part
183 is therefore treated as the design standard throughout, with 46 CFR 25.35-1 flagged
separately as hard legal obligation on Carson personally.

**Scope confirmation:** 33 CFR 183.401(a) and 183.501(a) both state, verbatim, *"This subpart
applies to all boats that have gasoline engines, except outboard engines, for electrical
generation, mechanical power, or propulsion."* A carbureted 351W direct-drive inboard is
squarely in scope for both subparts.
[183.401](https://www.law.cornell.edu/cfr/text/33/183.401) ·
[183.501](https://www.law.cornell.edu/cfr/text/33/183.501) — *canonical, high confidence.*

## Q1 — What 183.410 requires, and how to verify compliance

**The performance standard.** 33 CFR 183.410(a):

> *"Each electrical component must not ignite a propane gas and air mixture that is 4.25 to
> 5.25 percent propane gas by volume surrounding the electrical component when it is operated
> at each of its manufacturer rated voltages and current loadings, unless it is isolated from
> gasoline fuel sources..."*

Isolation alternatives: a compliant bulkhead (183.410(b)–(c) — must resist a 12-inch water
head with seepage ≤ ¼ fl oz/hr), position above or below the fuel source with protective
measures, or at least two feet of open-air separation.
[33 CFR 183.410](https://www.law.cornell.edu/cfr/text/33/183.410) — *canonical, high.*

**What counts as an "electrical component."** 33 CFR 183.402 defines it non-exhaustively as
*"electrical equipment such as, but not limited to, conductors, solenoids, motors,
generators, alternators, distributors, resistors, appliances and electrical control
devices."* **Alternators, starters (motors), and distributors are named explicitly.** This is
the operative scope — it is not merely about wiring.
[33 CFR 183.402](https://www.law.cornell.edu/cfr/text/33/183.402) — *canonical, high.*

**How to verify a part.** By physical marking plus manufacturer documentation — there is no
public USCG certificate database for these components the way there is for PFDs. Look for
`SAE J1171`, `UL 1500`, or `Ignition Protected` permanently marked on the housing or a
durable attached label, and/or a manufacturer compliance statement citing J1171 or UL 1500
testing.
[SAE J1171](https://www.sae.org/standards/content/j1171_201609/) ·
[Mechanical Products — ignition protection](https://www.mechprod.com/blog/ignition-protected)
— *canonical + adjacent, medium.*

**Flame arrestors verify differently:** a cast or stamped `SAE J-1928` or `UL 1111` mark on
the device body, plus a flame-tight mechanical connection to the carburetor air horn.
[46 CFR 25.35 Subpart](https://www.law.cornell.edu/cfr/text/46/part-25/subpart-25.35) ·
[newboatbuilders.com](https://newboatbuilders.com/pages/fuel2.html) — *the worker could not
render the eCFR page for the acceptable-means provision on this pass; the marking detail is
adjacent-sourced, `medium`.*

**ABYC, and what it adds.** Both relevant standards are paywalled; findings are secondhand
and flagged as such.

- **H-24** (Gasoline Fuel Systems) — scope per ABYC's own page covers design, materials,
  construction, and installation of permanently installed gasoline fuel systems from the fill
  opening to the engine connection. Current edition Jan 2025.
  [abycinc.org/news/h-24standard](https://abycinc.org/news/h-24standard/) — *canonical for
  scope only.* Substantive requirements below were drawn from a freely readable **1993
  edition** via archive.org and are **30+ years old** — directionally useful, not
  verbatim-current.
  [archive.org H-24 1993](https://archive.org/stream/gov.law.abyc.H-24.1993/abyc.H-24.1993_djvu.txt)
- **E-11** (AC & DC Electrical Systems) — covers AC <300V and DC ≤60V nominal. Third-party
  summaries report: overcurrent protection sized to conductor ampacity (breakers to 150% of
  ampacity permitted where an exact match is unavailable), tinned stranded copper marine wire
  (never solid), wire sized by the greater of ampacity or voltage-drop, and — layering
  directly on 183.410 — *"circuit breakers installed in spaces requiring ignition protection
  shall comply with SAE J1171... or UL 1500."*
  [ANSI listing](https://webstore.ansi.org/standards/abyc/abyc112025) ·
  [Paneltronics E-11 excerpts](https://www.paneltronics.com/images/technical/E11Excerpts.pdf) ·
  [PKYS overcurrent summary](https://shop.pkys.com/abyc-overcurrent-protection-summary)
  — *secondhand, `medium`. All specific figures are from summaries, not the standard.*

**ABYC's legal status.** Per a marine-surveyor source: ABYC recommendations are not law, but
"often become the de facto standards in legal situations, such as product liability lawsuits,
where they can be regarded as reflecting the custom of the industry." Practical read: not
criminally enforceable against an owner-builder, but it is the benchmark an insurer, a
surveyor, or a court will measure the work against.
[clmarinesurveying.com](https://clmarinesurveying.com/difference-in-abyc-and-uscg/) —
*adjacent, medium.*

## Q2 — Component by component: what must be marine

| Component | Verdict | Basis | The mechanism — *why* |
|---|---|---|---|
| **Alternator** | **MUST be marine** | 183.402 names alternators; 183.410 sets the bar | Brush/slip-ring contact sparks in normal operation. Harmless in open air under a truck; an ignition source in a closed box where vapor pools. |
| **Starter** | **MUST be marine** | 183.402 names "motors" | Internal shielding around the brush/commutator area contains sparking; commutator end sealed against bilge moisture. |
| **Distributor** | **MUST be marine** | 183.402 names distributors explicitly | Marine housings are built to stop internal arcing (points, cap-and-rotor) propagating outward — commonly a screen/mesh flame-quenching path. An automotive housing has no equivalent and is untested to J1171/UL1500. |
| **Fuel pump — electric** | **MUST be marine + interlocked** | 183.402/183.410 (it's electrical) **and** 183.524(a) **and** 183.524(b) | Three separate obligations stack. See Q4. |
| **Fuel pump — mechanical** | 183.410 **does not apply** | Not electrical equipment | Only 183.524(a) diaphragm containment applies. **This is the cheap compliant path.** |
| **Carburetor** | Marine strongly indicated | No CFR text bans automotive; 46 CFR 25.35-1 mandates the arrestor | Marine carbs vent float bowls **internally to the air horn**; automotive carbs vent **to atmosphere** — dumping raw fuel vapor into an enclosed bilge. The clearest "bolts on but does not fit" case in the whole list. |
| **Fuel hose** | **MUST be USCG Type A1** (pump→carb) | 183.558(a) — no substitute permitted | See Q3. One of the two hardest floors found. |
| **Exhaust manifolds/risers** | **MUST be marine wet exhaust** | ABYC P-1 (not an ignition-protection item) | A dry automotive manifold at 1,200–1,400°F in a sealed fiberglass box has no way to shed heat — fire risk against glass, wiring, and fuel hose. Also lacks the anti-siphon geometry that stops raw water re-entering cylinders after shutdown. |
| **Flame arrestor** | **MUST be marine — federal, on you** | 46 CFR 25.35-1 | Backfire flame containment. The most legally unambiguous item here. |
| **Core / freeze plugs** | Brass recommended; **no compliance floor** | No CFR or ABYC coverage found | Corrosion life only. Steel plugs are not a safety violation. Rank accordingly. |

Sources for the table: [183.402](https://www.law.cornell.edu/cfr/text/33/183.402) ·
[183.410](https://www.law.cornell.edu/cfr/text/33/183.410) ·
[183.524](https://www.law.cornell.edu/cfr/text/33/183.524) ·
[183.558](https://www.law.cornell.edu/cfr/text/33/183.558) ·
[46 CFR 25.35-1](https://www.law.cornell.edu/cfr/text/46/25.35-1) ·
[ABYC P-1 1993](https://archive.org/stream/gov.law.abyc.P-01.1993/abyc.P-01.1993_djvu.txt) ·
[The Marine King — starters](https://themarineking.com/blogs/news/comparing-marine-and-automotive-starters) ·
[iBoats — marine vs auto carb](https://forums.iboats.com/threads/whats-the-diff-between-marine-carb-and-auto-carb.169247/) *(folklore)* ·
[MasterCraft TeamTalk](https://teamtalk.mastercraft.com/forum/maintenance-tips-how-tos-and-refurbishing-topics/engine-drive-train/79183-marine-vs-automotive-carburetor) *(folklore)*

**Confidence note:** the *legal* column is high confidence throughout (direct CFR citation).
The *mechanism* column is medium for starter internals, distributor mesh, and carburetor
venting — well-corroborated across technical and forum sources, but SAE J1223 (marine
carburetors) is paywalled and could not be quoted verbatim. Freeze plugs are folklore-tier by
necessity: no standard addresses them at all.

## Q3 — Fuel hose: the ratings, the locations, the stamp

**Definitions.** 33 CFR 183.540 defines the four USCG types by SAE J1527 class plus the
183.590 fire test:

| Type | SAE J1527 class | Fire test (183.590 / UL 1114) |
|---|---|---|
| **USCG Type A1** | Class 1 | **Yes** |
| USCG Type A2 | Class 2 | **Yes** |
| USCG Type B1 | Class 1 | No |
| USCG Type B2 | Class 2 | No |

Under the J1527DEC85 baseline in the codified text, Class 1 permeation is ≤100 g/m²/24hr,
Class 2 ≤300 g/m²/24hr.
[33 CFR 183.540](https://www.law.cornell.edu/cfr/text/33/183.540) — *canonical, high.*

**The baseline is superseded in practice.** 40 CFR 1060.102 sets marine fuel line permeation
at **≤15 g/m²/day**, which is the origin of the `-15` suffix on current product (`A1-15`,
`B1-15`). Reported to apply to vessels manufactured on or after 1 Jan 2009.
[40 CFR 1060.102](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-U/part-1060/subpart-B/section-1060.102)
— *the worker hit a redirect loop and could not render the full page; the figure and date come
from search snippets of it. `medium` confidence.*

**Where each type is required** — 33 CFR 183.558:

- **(a) Fuel pump → carburetor: USCG Type A1. Hard requirement. No substitute grade.**
- (b)(2) Tank → engine fuel inlet: Type A1, or Type B1 only if a severed line discharges
  ≤5 oz in 2.5 minutes under the specified test.
- (b)(1) Vent/fill lines: Type A1 or A2, or B1/B2 under the same 5-oz condition.
- (c) Connections secured by swaged sleeve, sleeve-and-threaded-insert, or hose clamp.

[33 CFR 183.558](https://www.law.cornell.edu/cfr/text/33/183.558) — *canonical, high.*

**How to identify it on the hose** — 183.540(e)–(h): permanently marked with
`USCG TYPE [A1/A2/B1/B2]`, year of manufacture, and manufacturer name or trademark, in block
capitals **at least ⅛ inch high, repeated at intervals of 12 inches or less.**
**No stamp means no type, whatever the seller says.**
[33 CFR 183.540](https://www.law.cornell.edu/cfr/text/33/183.540) — *canonical, high.*

**The donor truck's hose does not qualify.** SAE 30R9 — the F-150's EFI hose, and a hose
marketed today as low-permeation — is explicitly not USCG rated. Continental's own product
spec sheet lists **"USCG Specifications: Not Applicable."** 30R9 may beat the 15 g/m²/day
permeation figure, but it has not been fire-tested per 183.590 and cannot carry a USCG TYPE
marking. It fits the barbs. It does not meet the requirement.
[Continental SAE 30R9](https://www.continental-engineparts.com/na/en-us/automotive/hoses/automotive-hoses/fuel-hose/products/product-range/fuel-injection-hose-sae-30r9) ·
[183.540](https://www.law.cornell.edu/cfr/text/33/183.540) — *high.*

**Service life.** No fixed CFR or ABYC calendar interval found. Guidance is condition-based:
inspect for cracks, cover separation, blistering, seepage, coupling damage, exposed
reinforcement, kinking, abrasion, or loss of flexibility — any one triggers replacement
regardless of age. A ~10-year figure attributed to BoatUS appeared only in a search snippet;
the worker could not render the article body to confirm it.
[Wilmington Rubber guide](https://wilmingtonrubber.com/marine-fuel-hose-inspection-replacement-guide-improve-safety-prevent-downtime-and-extend-hose-life) ·
[BoatUS](https://www.boatus.com/expert-advice/expert-advice-archive/2013/january/ethanol-and-older-engines)
— *`low` confidence on the 10-year figure specifically.*

## Q4 — Electric fuel pump: the compliance surface

**The interlock is law, not practice.** 33 CFR 183.524(b):

> *"Each electrically operated fuel pump must not operate except when the engine is operating
> or when the engine is started."*

The regulation mandates the **outcome**, not the method. An oil-pressure safety switch is the
common implementation; the CFR does not name it as the only compliant one.
[33 CFR 183.524](https://www.law.cornell.edu/cfr/text/33/183.524) — *canonical, high.*

**Diaphragm containment applies to any pump, mechanical or electric.** 183.524(a): *"Each
diaphragm pump must not leak fuel from the pump if the primary diaphragm fails."* 183.524(c):
as installed and fire-tested per 183.590, a pump must not leak more than five ounces in 2½
minutes, inclusive of leaks from fuel line, filter, and strainer.
[183.524](https://www.law.cornell.edu/cfr/text/33/183.524) — *canonical, high.*

**The accepted circuit** *(folklore — no standard prescribes it)*: an oil-pressure switch
(normally open, closing at roughly 4–6 psi) in series between switched ignition power and a
relay powering the pump, with a parallel bypass from the starter solenoid so the pump primes
during cranking before oil pressure builds. Satisfies the letter of 183.524(b) and fails
safe — engine stalls, pressure drops, pump stops within seconds.
[iBoats thread](https://forums.iboats.com/threads/electric-fuel-pump-wiring-with-safety-pressure-switch.478882/) ·
[Moyer Marine](https://www.moyermarineforum.com/forums/forum/discussion-topics/fuel-system/184-wiring-the-electric-fuel-pump)
— *folklore, `low`. Physically sound, but not a cited standard.*

**Anti-siphon** — 33 CFR 183.568. The tank-to-carburetor line must either run above the tank
top, or have an anti-siphon device or electrically operated fuel stop valve at the tank
withdrawal fitting. If the tank top sits below the carburetor inlet: all-metallic line per
183.538 or Type A1 hose, **plus** a manual shutoff valve directly at the tank connection,
accessible from outside the compartment — **plus** a second manual shutoff at the engine inlet
if the run exceeds 12 feet.
[33 CFR 183.568](https://www.law.cornell.edu/cfr/text/33/183.568) — *canonical, high.*

**ABYC H-24 adds two constraints** *(1993 edition, paywalled current — secondhand)*: electric
fuel pumps *"shall be independently supported and located within 12 inches of the engine,"*
and *"the outlet pressure... shall be rated or controlled to the maximum carburetor fuel inlet
pressure specified by the engine manufacturer."* The pressure limit matters — an electric pump
easily overwhelms a carburetor's needle-and-seat, and flooding in an enclosed bilge is itself
a fire hazard.
[archive.org H-24 1993](https://archive.org/stream/gov.law.abyc.H-24.1993/abyc.H-24.1993_djvu.txt)
— *`medium`.*

**Fusing.** No CFR amperage found. E-11's general principle applies — protection must not
exceed the conductor's capacity. A 10A inline fuse is commonly cited on forums; that is not a
standard figure and should be sized to the actual pump draw and installed wire gauge.
[Paneltronics E-11 excerpts](https://www.paneltronics.com/images/technical/E11Excerpts.pdf)
— *`low`.*

## Q5 — Where "cheapest that works" bottoms out

Ranked hardest floor first. **Items marked ⛔ are automatic disqualifiers — they never enter
a price ranking at all.**

| Component | The floor | Hardness |
|---|---|---|
| **Fuel hose (pump→carb)** | USCG Type A1, stamped. In practice current A1-15 stock. | ⛔ **Bright line.** 183.558(a) permits nothing else. No automotive hose qualifies at any price. |
| **Flame arrestor** | Genuine `SAE J-1928` or `UL 1111` mark, correctly sized, flame-tight connection. | ⛔ **Bright line.** Federal, vessel-facing, no grandfathering for a 2026 install. |
| **Exhaust manifolds/risers** | Marine wet-exhaust assembly, OEM-pattern (PCM / Indmar / Sierra / Barr). | ⛔ An automotive dry manifold is not a discount version — it is a categorically different and dangerous part. |
| **Alternator** | J1171 / UL 1500 marked marine unit, new or certified marine reman. | ⛔ 183.402 names it. Exclude unmarked units regardless of price. |
| **Starter** | J1171 / UL 1500 marked marine unit. | ⛔ Same basis. |
| **Distributor** | J1171-marked marine ignition-protected unit. | ⛔ 183.402 names it. The donor F-150's distributor is below the floor. |
| **Fuel pump** | **Mechanical:** OEM-pattern marine double-diaphragm with vent to arrestor — satisfies 183.524(a) and avoids the entire electrical compliance surface. **Electric:** J1171/UL1500 + verified run-interlock (183.524(b)) + outlet-pressure limiting. | ⛔ on the part; the *architecture* is a real choice. Mechanical is very likely cheaper **and** simpler to make legitimately compliant. |
| **Carburetor** | Marine carb with internally vented float bowls (SAE J1223 practice) + compliant arrestor. | ⚠️ Not a bright-line federal prohibition — but a real physics-level gap, not a technicality. Treat as the practical floor. |
| **Core / freeze plugs** | Brass for corrosion life. | ✅ **No compliance floor.** Genuinely rank on price. Lowest priority of anything in this table. |

Sources as cited throughout Q1–Q4.

---

# Theme 2 — The 351W marine swap, durable facts

*Destination: `reference/351w-swap.md`*

## Q6 — Engine identity facts

**External balance: 28 oz (commonly stated 28.2 oz-in), consistent across the entire 351W
production run, 1969–1997** — truck, automotive, and PCM marine alike. There was never an
internally balanced or differently balanced 351W variant. Ford Performance's own
reproduction damper for 302/351W is sold explicitly as "28.2 oz."
[CJ Pony Parts / Ford Performance M6316C351](https://www.cjponyparts.com/ford-performance-crankshaft-damper-28-2-oz-302-351w/p/M6316C351/) *(adjacent)* ·
corroborated across [Classic Broncos](https://classicbroncos.com/forums/threads/1995-351w-50oz-or-28oz-balance.262651/),
[Corral](https://forums.corral.net/forums/5-0-5-8-engine-tech/2112210-351w-external-balance-all-them-28oz.html),
[Speed-Talk](https://www.speed-talk.com/forum/viewtopic.php?t=42523),
[MasterCraft TeamTalk (PCM-specific)](https://teamtalk.mastercraft.com/forum/maintenance-tips-how-tos-and-refurbishing-topics/engine-drive-train/69048-351-pcm-flywheel-balancer) *(folklore)*
— **`high`.** No contradicting source found. Caveat: this describes the stock OEM rotating
assembly. If the PCM HO bottom end was ever built with an aftermarket crank, that changes —
no evidence of it for a stock PCM HO 351.

**Firing order: 1-3-7-2-6-5-4-8**, for the entire 351W production run. Different from the
351C (Cleveland) 1-5-4-2-6-3-7-8, and different from the early pre-H.O. 289/302 order.
[GT Spark Plugs](https://gtsparkplugs.com/firing-order-ford-302-351.html) ·
[Summit Racing KB](https://help.summitracing.com/knowledgebase/article/HE-04973/en-us) —
**`high`.**

**Distributor rotor rotation: counterclockwise**, viewed from the top with the cap off, on a
standard-rotation 351W. **Do not conflate this with crankshaft rotation** — both use CW/CCW
language and they are different specs. The ledger confirms the block is standard rotation, so
CCW rotor applies.
[Jalopy Journal](https://www.jalopyjournal.com/forum/threads/hei-in-a-351-w-need-rotor-location.1052490/) *(folklore)* ·
[GT Spark Plugs](https://gtsparkplugs.com/firing-order-ford-302-351.html) — **`medium`.**

**Balance mismatch risk** lives at the balancer/flywheel pairing. Both are independent
external-balance components and both must match the crank's 28 oz spec. A mismatch (28 oz
balancer against a 50 oz flywheel or vice versa) is reported to cause severe vibration across
the whole RPM range, accelerated bearing wear, and in at least one account was blamed for
crankshaft cracking.
[Vintage Mustang](https://www.vintage-mustang.com/threads/harmonic-balancer-and-flywheel-mismatch-cause-vibration.387390/) ·
[Corral](https://www.corral.net/threads/351-balanced-to-50oz-imbalance.1360513/) *(folklore)*
— **`medium`. The crankshaft-breakage consequence is anecdotal, not an engineering study.**

## Q7 — Flywheel, damper plate, and what the transmission actually is

**The coupling is a marine flywheel plus a separate damper (drive) plate** — a flat, thicker
marine flywheel bolted to the crank, with a rubber-cushioned damper plate bolted to its face
that couples to the transmission input. Mechanically different from an automotive
flexplate/torque-converter arrangement. Damper plates are sold as distinct, engine-family- and
transmission-specific parts.
[Marine Engine Depot](https://marineenginedepot.com/flywheelscouplers-and-damper-plates) ·
[Skidim — damper plate, PCM 80-series](https://skidim.com/damper-plate-gm-pcm-80-series-zf-velvet-drive/) ·
[Twister Ski Shop — PCM I-80 damper plate](https://twisterskishop.com/product/pcm-pleasurecraft-marine-damper-drive-plate-i-80-indmar/) — **`medium`.**

**An automotive F150 flexplate is very likely not usable.** Automotive flexplates are thin
stamped steel designed to flex with torque-converter fluid coupling and crank fore-aft
movement. The marine damper plate is a rigid coupling that must not flex — bolting it to a
thin flexplate risks fatigue cracking. **Ring-gear tooth count is often identical (157T)
between PCM marine flywheels and automotive 351W units, so tooth count is not a valid
compatibility check.** The differentiators are flywheel thickness/rigidity and the
damper-plate bolt circle, which are PCM-specific and not standardized like an SAE bellhousing.
[EngineerFix](https://engineerfix.com/is-a-flexplate-and-flywheel-the-same-thing/) ·
[Highway & Heavy Parts](https://highwayandheavyparts.com/blog/whats-the-difference-between-a-flywheel-and-a-flexplate/) — **`medium`. No canonical PCM
statement prohibiting it was found; this is reasoned from catalog structure — marine flywheels
and damper plates are sold as their own product line, never as "use any automotive flexplate."**

### ⚠️ The working hypothesis was wrong: this is probably not a Velvet Drive

Four independent lines of evidence:

1. **PCM's own "Power Plus" line includes a 1.23:1** — the PCM 40A, superseded by 80-series
   parts around 2013. Cataloged as a distinct product family from Borg Warner Velvet Drive
   ("Warner 71C/72C") everywhere it appears.
   [Skidim — PCM 40-series parts](https://skidim.com/drive-train/transmissions/pcm-40-series-parts/) ·
   [nautiqueparts — PCM Power Plus 1.23:1 transmission parts](https://nautiqueparts.com/engine/engine-parts/transmission-parts---pcm-power-plus-1.231/transmissions/)
2. **Velvet Drive direct-drive is 1:1 only**; their reduction options start at 1.52:1. No
   1.23:1 Velvet Drive product found anywhere.
   [TA Diesels — Borg Warner inline](https://www.tadiesels.com/borg_warner-inline.html)
3. **Correct Craft's OEM catalog lists two different mufflers for 1992–94 Ski Nautique /
   Sport Nautique 351 boats** — one specified "with 1:1 transmission," a separate one for the
   1.23:1. Both ratios were factory options in exactly this model-year range.
   [nautiqueparts — muffler, 1:1 trans](https://www.nautiqueparts.com/product/muffler-ski-nautique-sport-nautique-1993-1994-with-351-ford-and-1-1-transmission/) ·
   [nautiqueparts — muffler SN/SNB/SPN 92-94](https://nautiqueparts.com/muffler-sn-snb-spn-3-1-2-x-4-92-94/)
4. A PlanetNautique post references a "PCM Power Plus 1:23" on a 1990 Ski Nautique —
   the product predates 1994.
   [PlanetNautique](https://www.planetnautique.com/vb5/forum/nautique-topics/maintenance-technical-discussion/472025-transmission-question) *(folklore)*

**`medium` confidence. Strong circumstantial catalog evidence, not a read of the actual tag.**
**Open gap: no source documented where a PCM 40-series tag lives or how to decode it.**

## Q8 — Oil pan and pickup

**Ski boats sit at a steep installation angle** — general marine-engineering discussion cites
roughly 8.5° or more of shaft/engine angle as typical for ski and work boats, versus shallower
angles on V-drive cruisers. That static tilt plus the dynamic bow-up trim on plane is what
drives the marine pan requirement: the pickup must stay submerged under both.
[YBW forum](https://forums.ybw.com/threads/engine-installation-angle.107782/) ·
[Boat Design Net](https://www.boatdesign.net/threads/angle-of-mounting-working-engine.38745/)
*(folklore)* — **`medium`. Not Ski-Nautique-specific; the exact angle for this hull was not
found and should be checked against Correct Craft / PCM installation documentation.**

**PCM's OEM steel pan for the 351 Ford marine engine is listed as part `R005004A`** —
center-sump, dipstick threaded into the pan itself on the port side rather than into the
block, sitting roughly ½" lower than a standard pan. Listed as fitting both standard-rotation
(no windage tray) and H.O. (with windage tray) engines across PCM, Indmar, Commander, and
Escort 351 marine engines, 240–310 hp.
[My Inboard Marine — OEM R005004A](https://www.myinboardmarine.com/products/oil-pan-steel-351-ford-new-for-standard-or-h-o-engines-oem-r005004a)
— **`medium`. Retailer listing, not a PCM factory drawing. A separate rear-sump 9"-deep pan
(`QSTOPF351T`) is also cataloged for "351 marine," so more than one marine pan geometry exists
across PCM's range — confirm against the actual build.**

**Two distinct failure modes from using a truck pan:** physical interference (truck pans are
shaped around chassis crossmembers and steering linkage, not boat stringers and engine beds),
and oil starvation (pickup geometry engineered for a level chassis can uncover at the boat's
continuously tilted, tail-down running attitude). Marine repower discussions consistently list
the oil pan alongside manifolds, carb, and starter as a must-switch component.
[Shamrock Boat Owners Club](https://shamrockboatownersclub.com/forums/threads/oil-pan-source.39536/) ·
[Speed-Talk](https://www.speed-talk.com/forum/viewtopic.php?t=54301) *(folklore)* —
**`medium`. Synthesis of general repower consensus plus mechanical reasoning; no documented
case study of this exact combination.**

## Q9 — The fuel pump boss and the eccentric

**Sources directly conflict on the mechanism, and the worker flagged it `low` confidence.**
Three incompatible accounts:

- The pad is cast into the **block** on all SBF including EFI, but left unmachined — "punch
  out the cast-in block-off plate... on some blocks the mounting bolt holes are already
  tapped."
  [Corral](https://www.corral.net/threads/mechanical-fuel-pump-and-a-roller-block-with-e-cam.116013/)
- **Around 1988 the provision moved to being a TIMING COVER feature** for Ford small blocks;
  EFI covers from 1988-on omit the boss, and a pre-1988-style cover restores it.
  [Ford-Trucks — "when did the 351W lose the fuel pump mounting location"](https://www.ford-trucks.com/forums/1123946-when-did-the-351w-lose-the-fuel-pump-mounting-location.html)
- It is **truck-line-specific**: F-Series 351W serpentine covers reportedly retain mechanical
  pump compatibility while contemporaneous Explorer covers do not — "mechanical fuel pump or
  Explorer accessory drive, but not both."
  [Classic Broncos](https://classicbroncos.com/forums/threads/94-351w-mechanical-fuel-pump-questions.249251/) *(all folklore)*

**Carson's direct observation — no provision on this block — outranks all three.** The worker
explicitly recorded this. Resolving *why* would need the block casting number (passenger-side
pan rail near the starter, format like `F2AE-6015-xx`) and the timing cover's own casting
number. **It is arguably moot, because the plan carries PCM's cover over rather than the
F150's.**

**The eccentric is a separate bolt-on part, not machined into the cam.** It rides between the
timing sprocket and the cam bolt. Two forms exist: a two-piece pumping eccentric (inner
`D5AZ-6287-B` / outer `D0AZ-6287-A`, reproduction [Ford Performance
`M-6287-B302`](https://performanceparts.ford.com/part/M-6287-B302) — *canonical*) used on
mechanical-pump engines, and a thinner one-piece washer version on EFI engines that performs
no pumping function. **A 1992 EFI camshaft therefore presents no barrier** — the limiting
factor is whether a mounting provision exists at all, not the cam.
Corroborated by [Vintage Mustang](https://www.vintage-mustang.com/threads/finding-out-if-351w-engine-still-has-the-fuel-pump-eccentric-installed-inside.1215544/) ·
[Ford-Trucks](https://www.ford-trucks.com/forums/931736-converting-351w-roller-block-to-mechanical-fuel-pump.html) *(folklore)* — **`medium-high`.**

## Q10 — PCM timing cover transferability

**302/351W timing covers share a common bolt pattern across the production run** (~1966 to
mid-1990s). What differs between part numbers is what the cover was machined *for*: water pump
rotation (standard vs. reverse, tied to the mid-1980s serpentine transition), presence of a
mechanical fuel pump boss, dipstick tube hole, and on some EEC-IV applications a crank/cam
sensor boss. Corroborated by aftermarket reproductions sold as one universal stock replacement
across 1966–1995 351W applications.
[COMP Cams / Edelbrock 4251](https://www.compcams.com/sbf-timing-cover-86-93-5-0l-88-later-351w-w-reverse-rotation-pump-4251.html) *(adjacent)* ·
[Corral](https://www.corral.net/threads/351w-efi-swap-and-crank-trigger.1802946/) *(folklore)*
— **`medium-high`. No OEM Ford diagram located confirming bolt-hole continuity.**

**No crank-sensor complication expected.** The 1992 F150 5.8L used EEC-IV with a **TFI-IV
distributor-based ignition** — the PIP sensor lives inside the distributor, not on a
crank trigger. Distributorless EDIS (which does use a cover/balancer-mounted VR sensor on a
36-1 wheel) was used on other EEC-IV applications of that era, not the F-Series 5.8L.
[MSD 8452](https://www.msdignition.com/products/distributors/parts/8452) *(adjacent)* —
**`medium-high`. Confirm visually against the actual distributor and harness pulled off this
truck; running changes through the EEC-IV era were not fully ruled out.**

**Raw water pump drive is independent of the fuel-pump question.** PCM 351 marine engines
commonly drive a Sherwood G21 raw water pump (PCM `RA057007`) off the front crank pulley by
V-belt — a separate path from the cam-driven eccentric.
[waterskis.com](https://waterskis.com/raw-water-pump-pcm) ·
[My Inboard Marine — Sherwood G21](https://www.myinboardmarine.com/products/https-www-myinboardmarine-com-collections-winterization-maintenance-products-pleasurecraft-marine-raw-water-pump-sherwood-g21-sher-g21-_pos-1-_sid-f61da2451-_ss-r)
— **`medium-high`. Two different PCM drive configurations are cataloged (belt-driven off the
crank pulley vs. a distinct "crankshaft-driven" product) — confirm which this accessory set
uses.** [Twister Ski Shop — crankshaft-driven variant](https://twisterskishop.com/product/pcm-pleasurecraft-marine-raw-water-pump-crankshaft-driven/)

## Q11 — Low-pressure fuel delivery, and the boat side

**The marine standard is a dedicated low-pressure, ignition-protected electric pump** — roughly
4–7 psi output, USCG-approved (e.g. Walbro FRB-series reciprocating pumps, certified to USCG
16623-1/16623-2), plumbed straight to the carburetor. No return line needed; the pump's own
output is already at carb pressure.
[Walbro FR-series](https://www.walbro.com/fr-series-fuel-pumps/) *(canonical)* ·
[Fisheries Supply — Walbro FRB](https://www.fisheriessupply.com/walbro-frb-variable-rate-pressure-limited-reciprocating-fuel-pump) — **`high`.**

**High-pressure pump + regulator + return is an automotive technique, not a marine one.**
Well documented in land-vehicle TBI-to-carb conversions; no marine source presents it as
standard practice. It adds a return-line run that must itself meet USCG hose and fitting
standards, for no documented marine benefit over a purpose-built low-pressure pump.
[ThirdGen](https://www.thirdgen.org/forums/carburetors/562956-tbi-carb-why-return.html) ·
[Performance Boats](https://www.performanceboats.com/threads/converting-tbi-to-carb-question.25928/) *(folklore)* — **`medium`. Viable but non-standard.**

**The boat side has to change too — six items.** The factory ProTec TBI system is reported
around 13–15 psi against a carburetor's ~4–7 psi need, so pump, regulator, filter, and hose
sizing all change, not just pressure:

1. Swap to a dedicated low-pressure marine pump rather than regulating the OEM pump down —
   the OEM pump's flow curve and relay/ECM control strategy are built around injector demand.
2. Fuel lines USCG Type A1-rated throughout, properly clamped.
3. A carb-appropriate low-pressure regulator, or rely on the low-pressure pump's regulated
   output.
4. A fire-tested, independently mounted marine filter/strainer sized for carb flow — not the
   factory TBI in-line/in-tank filter.
5. Re-verify the anti-siphon device or shutoff valve at the tank withdrawal fitting is present
   and correctly rated. **This requirement does not go away because the engine changed.**
6. Decide the fate of the factory TBI return line — kept if a return-style regulator is used,
   capped if a simple non-return low-pressure pump is used.

[marineengine.com forum — PCM fuel pressure](https://www.marineengine.com/boat-forum/threads/fuel-pressure-pcm.434373/) *(folklore)* ·
[33 CFR 183.568](https://www.law.cornell.edu/cfr/text/33/183.568) *(canonical)* ·
[33 CFR Part 183 Subpart J](https://www.law.cornell.edu/cfr/text/33/part-183/subpart-J) *(canonical)*
— **`medium`. The exact ProTec pressure spec was not found in a PCM document; forum figures
range 13–15 psi (PCM-specific) to ~30 psi (a Mercruiser TBI, different manufacturer). Confirm
against the actual PCM spec plate or manual.**

---

# Theme 3 — The venue map

*Destination: `reference/venues.md`. All URLs below were fetched live by the worker unless
flagged as bot-blocked.*

## Q12 — Retailers, ranked by what they're actually good for

**Tier 1 — identity sources (parts diagrams and application data). Use these first.**

| Venue | Why it's Tier 1 | Search pattern |
|---|---|---|
| [marinepartsexpress.com/schematics/pleasurecraft](https://www.marinepartsexpress.com/schematics/pleasurecraft) | **Publishes actual PCM exploded parts diagrams.** Also carries Borg Warner, ZF, Volvo schematics. One of the very few places to establish a PCM part number *from a diagram* before shopping. | `/schematics/[brand]` |
| [sierraparts.com](https://www.sierraparts.com/) | Official Sierra/Dometic catalog — the aftermarket brand for PCM Ford ignition, cooling, fuel. Parts Finder application lookup at [/pages/parts-finder](https://www.sierraparts.com/pages/parts-finder). Sierra's PCM application tables are republished at [marineengine.com](https://www.marineengine.com/parts/sierra-marine/pcm-pleasurecraft.html) *(bot-blocked, live in a browser)*. | Shopify `/search?q=` |
| [marinepartssource.com](https://marinepartssource.com/pleasurecraft-marine-pcm-engine-model-identification) | **PCM engine model identification reference page** — pins down what the original PCM 351 actually was before cross-referencing. | `/marine-parts/[cat]/[subcat]` |
| [pcmengines.com/dealers](https://pcmengines.com/dealers/) | Manufacturer site. Sells nothing, publishes no public catalog. Value is the dealer locator — a dealer can pull OEM numbers from the dealer-side catalog. Authority of last resort. | n/a |

**Tier 2 — inventory.**

| Venue | Best for | Search pattern | Price |
|---|---|---|---|
| [skidim.com](https://www.skidim.com/) — Discount Inboard Marine | **Best all-round for this boat.** Inboard-only specialist, PCM/Indmar/Correct Craft. No diagrams; compensates with fitment help by email ("include what boat you are working on"). | `search.php?search_query=TERM` ✅verified | mid |
| [nautiqueparts.com](https://www.nautiqueparts.com/) | Correct Craft OEM. Explicit **"Ski Nautique 1978-2002"** category segmentation. Hull-specific items nobody else carries. | browse `/[cat]/[subcat]/[model-range]/` | OEM premium |
| [michiganmotorz.com](https://www.michiganmotorz.com/) | Complete/reman engines — verified live "5.8L (351 ci) Ford Marine Engine" and reman Ford 5.8L heads. **The fallback if the F150 swap goes sideways.** | `search.php?search_query=TERM` ✅verified | mid-discount |
| [bpi.ebasicpower.com](https://bpi.ebasicpower.com/shop/) — Basic Power Industries | Discount/NOS-leaning. Covers PCM, Crusader (shares PCM's parent, many common Ford SB marine parts). Good for obsolete ignition and carb bits. Root domain 301s — use the `bpi.` subdomain. | `search_2/show.php?q=TERM` | discount |
| [myinboardmarine.com](https://www.myinboardmarine.com/) | Has a dedicated **"5.0L–5.8L 302–351 FORD EXHAUST PCM"** category — manifolds/risers are a known cost center here. | Shopify `/search?q=` | mid |
| [go2marine.com/collections/pleasurecraft](https://www.go2marine.com/collections/pleasurecraft) | ~160 PCM items — ignition conversion kits, exhaust, cooling, FWC block-off kits. | Shopify `/search?q=` | mid |
| [wholesalemarine.com](https://www.wholesalemarine.com/) | Sierra dealer. **Cheap fulfillment once a Sierra number is established elsewhere.** | `search.php?query=TERM` | discount |
| [mniboats.com](https://www.mniboats.com/pleasurecraft-boat-engine-parts-s/103.htm) | Nautique dealer-affiliated. PCM alternators, exhaust, cooling, transmission. Backup when skidim/nautiqueparts are out. | `[name]-s/NNN.htm` | premium |
| [waterskis.com/engine-parts](https://waterskis.com/engine-parts/) | Consumables — plugs, impellers, belts, filters. Has a year/make/model lookup. Not hard parts. | `?page=N` | mid |

**Low relevance:** [partsvu.com](https://www.partsvu.com/) — verified live but OEM *outboard*
specialist; its schematics route to Yamaha/Mercury, not PCM.

**Bot-blocked — live in a browser, flagged rather than dropped:** marineengine.com (hosts the
Sierra PCM application tables — worth a manual visit), perfprotech.com (**trap: its "PCM" pages
mean Mercury Propulsion Control Module, not Pleasurecraft**), boats.net (outboard diagrams),
summitracing.com (relevant for the automotive 351W side and marine-rated Holley carbs),
basspro/cabelas, iboats store. **Dead: discountinboardmarine.com** — successor is skidim.com.

## Q13 — Forums

| Forum | Why it matters | Access | Search |
|---|---|---|---|
| [correctcraftfan.com](https://www.correctcraftfan.com/) | **THE community for pre-2000 Correct Crafts.** 251,557 posts in General Discussion alone, active yesterday. Hosts [factory manuals and brochures](https://www.correctcraftfan.com/reference/) — period-correct spec documentation for this hull. [Classifieds](https://www.correctcraftfan.com/forsale/). | ⚠️ **Free registration now required to read** (bandwidth attacks). Scripted scraping won't work. | `google.com/search?q=site:correctcraftfan.com+TERM` |
| [planetnautique.com](https://www.planetnautique.com/) | Other active Nautique forum. Skews newer boats, deep institutional knowledge, active vintage contingent. Classifieds: 10,105 topics. | open | Google `site:` — native search builds a JSON query string, not constructible |
| [forums.iboats.com](https://forums.iboats.com/) | Best general inboard-engine troubleshooting depth. No Ford/PCM subforum — search, don't browse. | open | Google `site:` |
| [ford-trucks.com/forums/forum28](https://www.ford-trucks.com/forums/forum28/) | **The donor-engine community** — "1987–1996 F150 & Larger F-Series." Carb, timing, firing order, head/intake knowledge for exactly this engine generation. | 403s to plain fetch, loads with browser UA | Google `site:ford-trucks.com 351w TERM` |

**Deprioritize:** thehulltruth.com — did not resolve (Cloudflare), and it's saltwater/offshore/
outboard-centric anyway. CCF and PlanetNautique own this topic.

## Q14 — Salvage and used channels

| Channel | What's there |
|---|---|
| [shipwrecksalvage.net](https://www.shipwrecksalvage.net/inboard-engine-components-c-7.html) | **Standout. 1,999 used items** in Inboard Engine & Parts — explicitly including Pleasure Craft. Carbs, exhaust/intake manifolds, distributors, alternators, mounts. **Freshwater salvage** — lower corrosion risk than saltwater yards. Zen Cart; running motors are call-for-availability. |
| [salvagemarine.net](https://salvagemarine.net/boat-parts-sales/) | 55,000+ used/NOS claimed. Searchable inventory lives on their [eBay store](https://www.ebay.com/str/salvagemarinenet) — query it as `?_nkw=TERM`. Parts-request form for unlisted items. |
| [marineenginesalvage.com/parts-locator](https://marineenginesalvage.com/parts-locator) | Family-run since 1987. No browseable DB — inquiry form by model/serial/part number. Listed stock on their [eBay store](https://www.ebay.com/str/Marine-Engine-Salvage). Good candidate for a used PCM carb, distributor, or manifold set. |
| [car-part.com](https://www.car-part.com/) | **Live inventory across hundreds of auto salvage yards.** Directly relevant — the donor is a 1992 F-150, and donor-side parts (brackets, balancer, heads, takeout engines) are dramatically cheaper through auto salvage than marine channels. Form-driven, not a constructible GET. |
| [row52.com](https://www.row52.com/) | Pick-n-Pull self-service yard inventory — 48,800 vehicles, 51 yards. **Email/SMS alerts for "1987-1996 F-150" arrivals.** |
| [correctcraftfan.com/forsale](https://www.correctcraftfan.com/forsale/) | **The most fitment-safe used channel that exists for this hull.** |
| [facebook.com/groups/inboardSKIboats](https://www.facebook.com/groups/inboardSKIboats/) | Dedicated inboard ski boat buy/sell/trade. URL verified; content requires login. Activity level unverified. |

**Flagged bot-blocked:** pyp.com (LKQ Pick Your Part) — Cloudflare. Use manually.

## Q15 — eBay search mechanics

**Category IDs — confirmed from eBay's own canonical `/b/` URLs:**

| Category | ID |
|---|---|
| **Inboard Engines & Components** | **`50440`** ← primary hunting category |
| Complete Inboard Gas Engines | `50442` |
| Boat Parts | `26443` |
| Car & Truck Parts & Accessories | `6030` ← donor-truck 351W parts |
| eBay Motors root | `6000` |

**URL parameters** (base `https://www.ebay.com/sch/i.html?`): `_nkw=` keywords · `_sacat=` category ·
`_udlo=`/`_udhi=` price floor/ceiling · `LH_BIN=1` Buy-It-Now / `LH_Auction=1` auctions ·
`LH_ItemCondition=` `1000` New, `1500` Open box, `2000–2500` refurb, `3000` Used, `7000` For
parts — comma-combine as `3000%2C7000` · `LH_Sold=1&LH_Complete=1` **sold comps, ~90-day
window** · `_sop=` sort (`12` Best Match, `15` price+shipping low→high, `16` high→low) ·
`_ipg=` per page · `_pgn=` page.
[AuctionMapper operators guide](https://www.auctionmapper.com/guides/ebay-search-operators/) ·
[AuctionMapper sold guide](https://www.auctionmapper.com/guides/ebay-advanced-search-sold/) ·
[Decodo](https://decodo.com/blog/how-to-web-scrape-ebay) — **`medium`. ebay.com is
bot-blocked from the research environment, so these were validated against documentation, not
live fetch. Sort-code conflict: one guide claims `_sop=13` = ending soonest and `12` = newest;
the `12`/`15` pair is multiply confirmed, treat `1`/`10`/`13`/`16` as verify-on-first-use.**

**Exclusion syntax:** single `-term` (no space after the minus). Multiple:
`-(term1,term2,term3)`. OR-groups: `(holley,edelbrock)`. Quotes force exact phrase.
**Not supported: `OR`, wildcards `*`, `NEAR`, field prefixes.** One third-party guide still
claims wildcard support — it's wrong, eBay removed them years ago. **`high`.**

**Two verified search traps:**
- **`PCM` alone returns Powertrain/Propulsion Control Modules** — automotive and Mercury
  computers. Always pair with `marine`, `Ford`, `351`, or `Pleasurecraft`.
- **`Windsor` alone returns Windsor Ontario, chairs, and castles.** Pair with `351` or `Ford`.

**Practical exclusion strings** (constructed on verified syntax; tuning expected in use):
- Marine searches drowning in wrong-brand hits:
  `-(mercruiser,omc,volvo,penta,indmar,crusader,sterndrive,outboard,alpha,bravo)`
- Automotive 351W searches: `-(mustang,fairlane,galaxie,efi,fuel injection)` — **keep truck
  terms, the donor IS an F-150.**
- Universal junk: `-(decal,sticker,manual,cover,model,toy,poster,keychain)`

**Saved searches:** heart icon after any search; eBay emails on new matches. **Hard limit 100
per account.** Filters are preserved, so save fully-filtered searches. Alerts are batched
daily, not real-time — fine for a slow parts hunt. **`medium`.**

---

# Theme 4 — eBay API

*Destination: `reference/ebay-api.md` + `scripts/`*

> **Method note:** developer.ebay.com blocks non-browser fetches. Every official claim below
> was verified against **Wayback Machine captures** of the canonical pages — Browse overview
> and search reference from May 2026, Buy requirements May 2026, filters and keyset pages
> April 2026, Marketplace Insights May 2025, call-limits and deprecation mid-2024 (latest
> captures), corroborated by 2025–26 community evidence.

## Q16 — Browse API: buildable, free, and enough

**Signup, verified step by step:**
1. Free eBay Developers Program account at developer.ebay.com (requires an ordinary eBay member account)
2. Application Keys page
3. Create a keyset separately under **Sandbox** and under **Production** — each yields App ID (Client ID), Dev ID, Cert ID (Client Secret)
4. ⚠️ **Before the Production keyset works you must complete the "marketplace account deletion/closure notifications" compliance step** (subscribe or opt out). Until then the keyset reads *"Your Keyset is currently disabled."*

[Creating API keysets](https://developer.ebay.com/api-docs/static/gs_create-the-ebay-api-keysets.html) ·
[Wayback Apr 2026](http://web.archive.org/web/20260414031800/https://developer.ebay.com/api-docs/static/gs_create-the-ebay-api-keysets.html) — **`high`.**

**Free. 5,000 Browse calls/day** per application on the default tier. Higher limits need the
free Application Growth Check (~5–7 business days per community reports; raising Browse above
5,000 is sometimes refused).
[API call limits](https://developer.ebay.com/develop/apis/api-call-limits) ·
[Wayback Jul 2024](http://web.archive.org/web/20240722004605/https://developer.ebay.com/develop/apis/api-call-limits) —
**`medium`. Snapshot is 2024-07; corroborated by community threads through 2025, not
re-verified on a 2026 capture.**

**Auth: OAuth2 client-credentials, application token only. No user login.** Scope is the basic
`https://api.ebay.com/oauth/api_scope` granted to every keyset. (`buy.browse` is *not* a valid
scope.)
[search method reference](https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search) ·
[Wayback May 2026](http://web.archive.org/web/20260514014436/https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search) — **`high`.**

**Endpoint:** `GET https://api.ebay.com/buy/browse/v1/item_summary/search`
Params: `q`, `category_ids`, `epid`, `gtin`, `filter`, `aspect_filter`, `compatibility_filter`,
`sort`, `limit`, `offset`, `fieldgroups`.

**Returned fields — everything a part card needs:** `itemId` · `title` · `price` · `condition`
/ `conditionId` · `seller.username` / `seller.feedbackPercentage` / `seller.feedbackScore` ·
`image` + `thumbnailImages` · **`itemWebUrl`** *(the live clickable listing — exactly the
charter's requirement)* · `itemLocation` · `shippingOptions` · `buyingOptions`.
Result sets cap at 10,000 items; **wildcards not allowed**.
[Browse overview](https://developer.ebay.com/api-docs/buy/browse/overview.html) — **`high`.**

**Filters cover everything needed:** category, condition, price range
(`filter=price:[10..50]`), item location and delivery, `sellers`/`excludeSellers`,
`excludeCategoryIds`, date ranges, `searchInDescription`, `returnsAccepted`, `bidCount`,
`buyingOptions` (`FIXED_PRICE` | `AUCTION` | `BEST_OFFER`).
[Browse filter reference](https://developer.ebay.com/api-docs/buy/static/ref-buy-browse-filters.html) — **`high`.**

### ⚠️ The default that would silently break this skill

> **Search returns ONLY listings with a `FIXED_PRICE` buying option by default.** Pure auction
> listings — and auctions that have received a bid — require explicitly filtering
> `buyingOptions:{AUCTION}`.

For rare marine parts this is the difference between finding the part and not. **Any script
built against this API must query both.**

**Production access is contradictory on paper, workable in practice.** The Buy APIs
Requirements page frames all Buy APIs as partner-only via eBay Partner Network. But eBay
Developer Support has stated on the record that *"most of the Browse API methods are not
restricted and open,"* the basic scope is issued to every production keyset, and eBay's own
Finding-API retirement guidance points all developers to Browse as the replacement. The partner
gauntlet applies to the genuinely restricted methods — checkout/Order, Feed, affiliate, and
Marketplace Insights.
[Buy requirements](https://developer.ebay.com/api-docs/buy/static/buy-requirements.html) ·
[eBay community — Browse production access](https://community.ebay.com/t5/Traditional-APIs-Orders/Need-Production-Access-to-Browse-API-Buy-API/m-p/35317034) —
**`medium`. eBay's own docs conflict. Verify with one live production call after keyset creation.**

## Q17 — Sold prices: the answer is no, and here's the workaround

**This is the high-value negative. Plan around it.**

**Finding API is fully retired.** All calls deprecated 2024-01-04, **decommissioned
2025-02-05**. `findCompletedItems` had been deprecated with restricted access since 2020-10-15.
Post-decommission, callers get permanent Error 10001; eBay Developer Support confirmed in
thread: *"The Finding API has been decommissioned."* **There is no legacy backdoor.**
[API deprecation status](https://developer.ebay.com/develop/apis/api-deprecation-status) ·
[community thread](https://community.ebay.com/t5/Traditional-APIs-Search/Issue-with-the-FindingService-API-when-using-findItemsAdvanced/td-p/34970218) — **`high`.**

**Marketplace Insights has the data but is gated.** `GET /buy/marketplace_insights/v1_beta/
item_sales/search` returns `lastSoldPrice`, `lastSoldDate`, `totalSoldQuantity` — **but only 90
days back**, and it has sat in `v1_beta` for years. Official overview states verbatim it is *"a
(Limited Release) API available only to select developers approved by business units,"* with
per-partner category whitelisting.
[Marketplace Insights overview](https://developer.ebay.com/api-docs/buy/marketplace-insights/overview.html) — **`high`.**

**Approval likelihood for an individual: effectively nil.** Community evidence is uniform —
denials, with eBay indicating access is reserved for major partners. One support-adjacent reply:
*"Market insight API is restricted API, even If you get it working in sandbox, you will not
able to get access in production."* No individual-developer approval was found anywhere.
**Assume it is not obtainable.**
[Access denied thread](https://community.ebay.com/t5/RESTful-Sell-APIs-Marketing/Marketplace-Insight-API-responded-with-Access-denied/td-p/35066691) ·
[small project thread](https://community.ebay.com/t5/eBay-APIs-Talk-to-your-fellow/Marketplace-Insights-API-query-about-small-project/td-p/34802982) — **`high`.**

### The workaround is better than the thing you can't have

**Terapeak Product Research is free with any eBay seller account** — Seller Hub → Research tab
— and gives up to **~3 years of actual sold-price history**, versus Marketplace Insights' 90
days. (Terapeak *Sourcing* Insights additionally needs a Store subscription.) **No public
API** — eBay staff: *"At this time there is not a Terapeak API."* So it is a manual research
surface for Carson, not a programmatic source for Quint.
[eBay Terapeak announcement](https://export.ebay.com/en/resources/important-updates/ebay-news-archive/terapeak) ·
[community — no Terapeak API](https://community.ebay.com/t5/Traditional-APIs-Search/Get-data-of-terapeak-research-using-API/td-p/33565469) — **`high`.**

**The compliant pattern, and it fits the charter exactly:** Quint constructs the sold-listings
search URL (`LH_Sold=1&LH_Complete=1`) and hands Carson a live link he opens and judges
himself. That satisfies "a live source Carson can open" without any API at all.

**Explicitly do not build on:** scraping sold-listings pages, or third-party "sold data API"
vendors. Their provenance is scraping and it violates eBay's User Agreement and API License
Agreement. Flagged as ToS risk, not an option.

---

# Conflicts Between Sources

1. **Transmission identity.** My stated working hypothesis (Velvet Drive / Borg Warner) vs.
   catalog evidence pointing to a **PCM Power Plus 40A**. *Resolution: the catalog evidence is
   substantially stronger — four independent lines, including Correct Craft's own two-muffler
   listing. But it is still circumstantial. Defer to the physical tag.*
2. **Where the fuel pump boss lives** on a 1988+ SBF — block-cast-but-unmachined vs.
   timing-cover feature vs. truck-line-specific. Three folklore sources, mutually
   incompatible. *Resolution: Carson's direct observation governs for the block. The cover
   question is unresolved and is the single highest-value physical check available.*
3. **eBay Browse production access** — official Buy requirements page says partner-only;
   eBay Developer Support says Browse is open. *Resolution: cannot be settled from documents.
   One live production call after keyset creation settles it definitively.*
4. **eBay `_sop` sort codes** — one guide gives `13`=ending soonest / `12`=newest; convention
   and two other sources give `12`=Best Match / `1`=ending soonest / `10`=newly listed.
   *Resolution: `12` and `15` are multiply confirmed and are the two the skill actually needs.
   Others flagged verify-on-first-use.*
5. **PCM oil pan geometry** — a center-sump `R005004A` and a rear-sump `QSTOPF351T` are both
   cataloged for "351 marine." *Resolution: unresolved. Needs confirmation against the actual
   PCM build.*
6. **PCM raw water pump drive** — belt-driven off the crank pulley vs. a distinct
   "crankshaft-driven" product, both cataloged. *Resolution: confirm against the accessory
   bracket set being carried over.*
7. **Marketplace Insights for individuals** — one community reply claimed eBay "may grant
   access... especially for non-commercial projects." *Resolution: uncorroborated and
   contradicted by every firsthand account and by the official limited-release language.
   Discard.*

# Honest Uncertainty

- **ABYC H-24, E-11, and P-1 are paywalled.** Every substantive requirement attributed to them
  came from a 1993 archive edition (H-24, P-1) or third-party summaries (E-11). Directionally
  useful; **not verbatim-current.** The 12-inch pump proximity rule, the pressure-limiting
  requirement, and the 150% breaker rule all carry this caveat.
- **Whether 33 CFR Part 183 binds Carson personally** is an interpretive synthesis from
  definitional text, rated `medium` by the worker. Not a settled legal conclusion. 46 CFR
  25.35-1 is unambiguous and does bind him.
- **The exact PCM ProTec fuel pressure** was never found in a PCM document. Forum figures span
  13–15 psi (PCM) to ~30 psi (a different manufacturer's TBI).
- **Ski Nautique installation angle** — the ~8.5° figure is general marine engineering, not
  this hull.
- **eBay's 5,000/day limit** rests on a 2024 snapshot.
- **eBay search URL syntax was validated against documentation, not live fetch** — the research
  environment is blocked from ebay.com.
- **No PCM 40-series transmission tag location or decoding procedure was found anywhere.** Real
  gap.
- **Facebook group activity is unverified** — URL confirmed, content behind login.
- **All four serial/casting numbers remain unknown**, so every serial-gated lookup in this
  document is pending rather than resolved.

# What Surprised Me

1. **The PCM timing cover may restore the mechanical fuel pump — and collapse the entire
   electric-pump compliance stack.** Neither worker had both halves: Theme 1 established the
   mechanical pump as the cheap compliant path and that PCM still sells one for the Ford
   302/351; Theme 2 found that on 1988+ SBF the provision may be a *timing cover* feature.
   Carson is already carrying PCM's cover over. **This is the highest-leverage finding in the
   round and it costs one physical look at the cover.**
2. **The transmission hypothesis I supplied was probably wrong.** Good — the research was
   built to refute, and it did.
3. **Ring gear tooth count is often identical between marine and automotive 351W flywheels.**
   The most natural compatibility check a person would run is worthless here. Straight into
   gotchas.
4. **The eBay Browse API silently excludes auctions by default.** For rare parts, that is
   where the inventory is.
5. **Free Terapeak beats the gated API.** ~3 years of sold history in Seller Hub versus 90 days
   from Marketplace Insights. The thing Carson can actually get is the better data.
6. **Real PCM exploded diagrams are publicly available** at marinepartsexpress.com. This makes
   identity-before-inventory genuinely executable rather than aspirational.
7. **The mechanical fuel pump eccentric is a bolt-on, not part of the cam.** Removes what
   looked like a hard blocker.
8. **CorrectCraftFan now requires registration** — the single best knowledge source for this
   hull is no longer scriptable. Quint must be told to route through Google `site:` search.
9. **"PCM" is a genuine search trap** — Powertrain Control Module. A whole retailer's catalog
   (perfprotech) uses it that way.

# Concrete Recommendations

1. **Check the PCM timing cover for a fuel pump mounting pad before anything else.** It decides
   the fuel system architecture and a meaningful chunk of the budget. One look.
2. **Collect the four numbers** — PCM engine serial, transmission tag, HIN, Ford block casting.
   Add a fifth: the **PCM timing cover casting number**.
3. **Bake the venue map as three tiers**, with identity sources (marinepartsexpress schematics,
   Sierra Parts Finder, marinepartssource model ID) enforced as Tier 1.
4. **Build the eBay script against Browse API for active listings, and generate sold-listing
   deep links for Carson.** Do not plan on programmatic sold data. Query `FIXED_PRICE` and
   `AUCTION` explicitly.
5. **Register on CorrectCraftFan once**, and pull the factory manuals from `/reference/`.
6. **Treat the transmission as PCM Power Plus 40A pending the tag**, not Velvet Drive.
7. **Encode the two search traps** (`PCM`, `Windsor`) and the exclusion strings into the
   URL-builder script rather than prose.

# Sources

Full inline citations throughout. Canonical anchors:
[33 CFR 183.402](https://www.law.cornell.edu/cfr/text/33/183.402) ·
[183.410](https://www.law.cornell.edu/cfr/text/33/183.410) ·
[183.524](https://www.law.cornell.edu/cfr/text/33/183.524) ·
[183.540](https://www.law.cornell.edu/cfr/text/33/183.540) ·
[183.558](https://www.law.cornell.edu/cfr/text/33/183.558) ·
[183.568](https://www.law.cornell.edu/cfr/text/33/183.568) ·
[46 CFR 25.35-1](https://www.law.cornell.edu/cfr/text/46/25.35-1) ·
[eBay Browse search](https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search) ·
[eBay deprecation status](https://developer.ebay.com/develop/apis/api-deprecation-status) ·
[Ford Performance M-6287-B302](https://performanceparts.ford.com/part/M-6287-B302) ·
[Walbro FR-series](https://www.walbro.com/fr-series-fuel-pumps/)
