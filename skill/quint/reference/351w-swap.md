# The 351W Marine Swap — durable facts

Engine and driveline knowledge for putting a 1992 F-150 351 Windsor into a 1994 Ski Nautique
behind PCM's direct-drive gear. Facts that don't change month to month. Prices and inventory
live nowhere in this file — those are fetched at runtime.

**Confidence tags on every claim.** `[canonical]` regulation or manufacturer documentation ·
`[adjacent]` established technical source · `[folklore]` forum or community consensus.

## Contents

- [Engine identity facts](#engine-identity-facts)
- [The driveline interface](#the-driveline-interface)
- [The transmission is probably not a Velvet Drive](#the-transmission-is-probably-not-a-velvet-drive)
- [Oil pan and pickup](#oil-pan-and-pickup)
- [The fuel pump boss and the eccentric](#the-fuel-pump-boss-and-the-eccentric)
- [PCM timing cover transferability](#pcm-timing-cover-transferability)
- [The numbers that unlock the rest](#the-numbers-that-unlock-the-rest)

---

## Engine identity facts

### External balance: 28 oz — consistent across every 351W

**28 oz** (commonly stated **28.2 oz-in**), across the entire 351W production run 1969–1997.
Truck, automotive, and PCM marine alike. **There was never an internally balanced or
differently balanced 351W variant.** Ford Performance's own reproduction damper for 302/351W
is sold explicitly as "28.2 oz."
[`[adjacent, high]`](https://www.cjponyparts.com/ford-performance-crankshaft-damper-28-2-oz-302-351w/p/M6316C351/)
Corroborated across four independent forum sources including a PCM-specific thread. No
contradicting source found.

*Caveat:* this describes the stock OEM rotating assembly. If the PCM HO bottom end were ever
built with an aftermarket crank, that changes — no evidence of it for a stock PCM HO 351.

**Where the mismatch risk lives:** balancer and flywheel are *independent* external-balance
components and **both** must match the crank's 28 oz spec. A mismatch (28 oz balancer against a
50 oz flywheel or the reverse) is reported to cause severe vibration across the whole RPM
range — not a narrow band — plus accelerated bearing wear, and in at least one account was
blamed for crankshaft cracking.
[`[folklore, medium — the crankshaft-breakage consequence is anecdotal, not an engineering study]`](https://www.vintage-mustang.com/threads/harmonic-balancer-and-flywheel-mismatch-cause-vibration.387390/)

### Firing order: 1-3-7-2-6-5-4-8

Entire production run. **Different from the 351C (Cleveland)** at 1-5-4-2-6-3-7-8, and
different from the early pre-H.O. 289/302 order.
[`[adjacent, high]`](https://gtsparkplugs.com/firing-order-ford-302-351.html) ·
[Summit Racing KB](https://help.summitracing.com/knowledgebase/article/HE-04973/en-us)

### Distributor rotor rotation: counterclockwise

Viewed from the top with the cap off, on a standard-rotation 351W.
[`[adjacent/folklore, medium]`](https://gtsparkplugs.com/firing-order-ford-302-351.html)

> ⚠️ **Do not conflate rotor rotation with crankshaft rotation.** Both use CW/CCW language and
> they are entirely different specs. The ledger confirms this block is **standard rotation**
> (crank), so **CCW rotor** applies. A reverse-rotation marine engine — used in some
> twin-engine boats — needs different hardware entirely. This boat is single-engine standard
> rotation; reverse-rotation parts are always the wrong answer here.

---

## The driveline interface

### Marine flywheel + separate damper plate — not a flexplate

A PCM direct drive couples through a **flat, thicker marine flywheel** bolted to the crank,
with a **rubber-cushioned damper (drive) plate** bolted to its face that couples to the
transmission input. Mechanically different from an automotive flexplate/torque-converter
arrangement. Damper plates are sold as distinct parts, specific to both engine family and
transmission.
[`[adjacent, medium]`](https://marineenginedepot.com/flywheelscouplers-and-damper-plates) ·
[Skidim damper plate, PCM 80-series](https://skidim.com/damper-plate-gm-pcm-80-series-zf-velvet-drive/) ·
[Twister Ski Shop, PCM I-80](https://twisterskishop.com/product/pcm-pleasurecraft-marine-damper-drive-plate-i-80-indmar/)

**An automotive F150 flexplate is very likely not usable.** Automotive flexplates are thin
stamped steel designed to *flex* with torque-converter fluid coupling and crank fore-aft
movement. The marine damper plate is a rigid coupling that must **not** flex — bolting it to a
thin flexplate risks fatigue cracking.
[`[adjacent, medium]`](https://engineerfix.com/is-a-flexplate-and-flywheel-the-same-thing/)

> ⚠️ **The obvious compatibility check is worthless here.** Ring gear tooth count is **often
> identical (157T)** between PCM marine flywheels and automotive 351W units. Matching tooth
> count proves nothing. The real differentiators are **flywheel thickness/rigidity** and the
> **damper-plate bolt circle** — both PCM-specific, neither standardized the way an SAE
> bellhousing pattern is.

**Honest limit:** no canonical PCM document prohibiting an automotive flexplate was found.
This conclusion is reasoned from catalog structure — marine flywheels and damper plates are
sold as their own product line, never as "use any automotive 351W flexplate." Treat as
`PROBABLE`, not `CONFIRMED`, until a PCM source or a first-hand build report with photos
confirms it.

---

## The transmission is probably not a Velvet Drive

**Working assumption: PCM Power Plus 40A, 1.23:1.** Not Borg Warner / Velvet Drive.
`[adjacent, medium]`

Four independent lines of evidence:

1. **PCM's own "Power Plus" line includes a 1.23:1** — the PCM 40A, superseded by 80-series
   parts around 2013. Cataloged as a distinct family from Borg Warner ("Warner 71C/72C")
   everywhere it appears.
   [Skidim PCM 40-series](https://skidim.com/drive-train/transmissions/pcm-40-series-parts/) ·
   [nautiqueparts — PCM Power Plus 1.23:1](https://nautiqueparts.com/engine/engine-parts/transmission-parts---pcm-power-plus-1.231/transmissions/)
2. **Velvet Drive direct-drive is 1:1 only.** Reduction options start at 1.52:1. No 1.23:1
   Velvet Drive product exists anywhere in their catalog.
   [TA Diesels](https://www.tadiesels.com/borg_warner-inline.html)
3. **Correct Craft's own catalog lists two different mufflers** for 1992–94 Ski Nautique /
   Sport Nautique 351 boats — one specified "with 1:1 transmission," a separate one for the
   1.23:1. Both ratios were factory options in exactly this model-year range.
   [1:1 muffler](https://www.nautiqueparts.com/product/muffler-ski-nautique-sport-nautique-1993-1994-with-351-ford-and-1-1-transmission/) ·
   [SN/SNB/SPN 92-94](https://nautiqueparts.com/muffler-sn-snb-spn-3-1-2-x-4-92-94/)
4. A PlanetNautique post references a "PCM Power Plus 1:23" on a 1990 Ski Nautique — the
   product predates 1994. `[folklore]`

**Practical effect:** start damper-plate, coupler, fluid-spec, and service-part lookups at
**PCM 40-series**, not Borg Warner. Searching "Velvet Drive 1.23" will return nothing useful,
and worse, may return a 1.52:1 part that looks close.

> **Open gap:** no source anywhere documented where a PCM 40-series transmission tag lives or
> how to decode it. The tag still needs to be read physically. If a run finds the tag location
> documented, that is a high-value ledger update.

---

## Oil pan and pickup

**Ski boats sit at a steep installation angle** — roughly 8.5° or more of shaft/engine angle
is cited as typical for ski and work boats, versus shallower angles on V-drive cruisers. That
static tilt *plus* the dynamic bow-up trim on plane is what drives the marine pan requirement:
**the pickup must stay submerged under both conditions.**
[`[folklore, medium — general marine engineering, not this hull. The exact Ski Nautique angle
was not found; check Correct Craft / PCM installation documentation if it surfaces.]`](https://forums.ybw.com/threads/engine-installation-angle.107782/)

**PCM's OEM steel pan for the 351 Ford marine engine: part `R005004A`** — center-sump,
**dipstick threaded into the pan itself on the port side** rather than into the block, sitting
roughly ½" lower than a standard pan. Listed as fitting both standard-rotation (no windage
tray) and H.O. (with windage tray) engines across PCM, Indmar, Commander, and Escort 351
marine engines, 240–310 hp.
[`[adjacent, medium — retailer listing, not a PCM factory drawing]`](https://www.myinboardmarine.com/products/oil-pan-steel-351-ford-new-for-standard-or-h-o-engines-oem-r005004a)

> **Unresolved conflict:** a separate **rear-sump 9"-deep** pan (`QSTOPF351T`) is also
> cataloged for "351 marine" applications including PCM. **More than one marine pan geometry
> exists across PCM's range.** Confirm against the actual build before ordering — this is
> exactly the kind of thing that looks settled and isn't.

**Two distinct failure modes from a truck pan:**

1. **Physical interference** — truck pans are shaped around chassis crossmembers and steering
   linkage, not boat stringers and engine beds.
2. **Oil starvation** — pickup geometry engineered for a level chassis can uncover at the
   boat's continuously tilted, tail-down running attitude.

Marine repower discussions consistently list the oil pan alongside manifolds, carb, and
starter as a must-switch component.
[`[folklore, medium]`](https://shamrockboatownersclub.com/forums/threads/oil-pan-source.39536/)

---

## The fuel pump boss and the eccentric

**Carson's ground truth governs: this block has no mechanical fuel pump provision.** Direct
observation outranks everything below.

**Sources conflict on *why*, three incompatible ways** `[all folklore, low confidence]`:

- The pad is cast into the **block** on all SBF including EFI, but left unmachined — "punch
  out the cast-in block-off plate... on some blocks the mounting bolt holes are already
  tapped."
  [Corral](https://www.corral.net/threads/mechanical-fuel-pump-and-a-roller-block-with-e-cam.116013/)
- **Around 1988 the provision moved to being a TIMING COVER feature** for Ford small blocks;
  EFI covers from 1988-on omit the boss, and a pre-1988-style cover restores it.
  [Ford-Trucks](https://www.ford-trucks.com/forums/1123946-when-did-the-351w-lose-the-fuel-pump-mounting-location.html)
- It is **truck-line-specific** — F-Series 351W serpentine covers reportedly retain mechanical
  pump compatibility while contemporaneous Explorer covers do not: "mechanical fuel pump or
  Explorer accessory drive, but not both."
  [Classic Broncos](https://classicbroncos.com/forums/threads/94-351w-mechanical-fuel-pump-questions.249251/)

**Why this matters enormously:** if the provision lives on the **cover**, and the plan already
carries **PCM's cover** — from a mechanically-pumped marine engine — onto this block, then the
mechanical fuel pump may be back on the table. That collapses the entire electric-pump
compliance stack. See the decision gate at the top of
[`marinization.md`](marinization.md#fuel-delivery--decision-gate).

**One physical look at the PCM cover settles it.** Two bolt holes and a machined pad,
driver's side.

### The eccentric is a bolt-on, not part of the cam

It rides between the timing sprocket and the cam bolt. **Two forms:**

- **Two-piece pumping eccentric** — inner `D5AZ-6287-B` / outer `D0AZ-6287-A`. Reproduction:
  [Ford Performance `M-6287-B302`](https://performanceparts.ford.com/part/M-6287-B302)
  `[canonical]`
- **Thin one-piece "washer"** version on EFI engines — performs no pumping function. **This is
  what's on the F150 cam now.**

**A 1992 EFI camshaft therefore presents no barrier.** The limiting factor is whether a
mounting provision exists at all — not the cam. `[medium-high]`

---

## PCM timing cover transferability

**302/351W timing covers share a common bolt pattern** across the production run, roughly 1966
to mid-1990s. What differs between part numbers is what the cover was machined *for*:

- Water pump rotation (standard vs. reverse — tied to the mid-1980s serpentine transition)
- Presence of a mechanical fuel pump boss
- Dipstick tube hole
- On some EEC-IV applications, a crank/cam sensor boss

Corroborated by aftermarket reproductions sold as a single universal stock replacement across
1966–1995 351W applications.
[`[adjacent, medium-high — no OEM Ford diagram located confirming bolt-hole continuity]`](https://www.compcams.com/sbf-timing-cover-86-93-5-0l-88-later-351w-w-reverse-rotation-pump-4251.html)

**No crank-sensor complication expected.** The 1992 F150 5.8L used EEC-IV with a **TFI-IV
distributor-based ignition** — the PIP sensor lives *inside the distributor*, not on a crank
trigger. Distributorless EDIS (which does use a cover- or balancer-mounted VR sensor reading a
36-1 wheel) was used on other EEC-IV applications of that era, **not** the F-Series 5.8L.
[`[adjacent, medium-high]`](https://www.msdignition.com/products/distributors/parts/8452)
*Confirm visually against the actual distributor and harness pulled off this truck — running
changes through the EEC-IV era were not fully ruled out.*

**Raw water pump drive is independent of the fuel pump question.** PCM 351 marine engines
commonly drive a **Sherwood G21** raw water pump (PCM `RA057007`) off the front crank pulley by
V-belt — a separate path from the cam-driven eccentric.
[`[adjacent, medium-high]`](https://waterskis.com/raw-water-pump-pcm)

> **Unresolved:** two different PCM drive configurations are cataloged — belt-driven off the
> crank pulley, and a distinct ["crankshaft-driven" product](https://twisterskishop.com/product/pcm-pleasurecraft-marine-raw-water-pump-crankshaft-driven/).
> Confirm which this accessory bracket set actually uses before ordering.

---

## The numbers that unlock the rest

Five numbers. Four are in [`the-boat.md`](the-boat.md#known-unknowns--and-what-each-one-blocks);
this file adds the fifth.

| # | Number | Where | Unlocks |
|---|---|---|---|
| 1 | PCM engine serial | Tag on the original HO block | PCM's serial-gated catalog. The HO variant. The flywheel/damper plate PCM specified. |
| 2 | Transmission tag | Housing | Confirms PCM 40A vs. something else. Damper plate, coupler, fluid spec. **No decoding procedure documented anywhere — this one may need a dealer.** |
| 3 | HIN | Transom, starboard | Correct Craft dealer lookups, exact hull config. |
| 4 | Ford block casting number | Passenger-side pan rail near the starter. Format like `F2AE-6015-xx` | Which 351W variant is actually on the stand. Settles balance and flat-tappet with a document. Whether the pump boss was ever machined. |
| 5 | **PCM timing cover casting number** | On the cover | Whether this specific cover carries the fuel pump provision — **and therefore which fuel system you're building.** |

**Until these exist, every serial-gated lookup is flagged `pending`, not resolved.** That is
the honest answer and it is more useful than a confident guess.
