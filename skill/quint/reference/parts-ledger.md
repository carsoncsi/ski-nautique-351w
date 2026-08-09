# Parts Ledger — the compounding record

Every part Quint has researched for this boat. This is the asset the skill accumulates —
the search is disposable, this is not.

**Append-only in spirit.** Entries get *updated* (status changes as a part moves from
researched → ordered → installed → verified) but are never deleted. A part that turned out
to be the wrong answer is one of the most valuable entries in the file, because it stops a
future run from re-deriving the same mistake.

## Contents

- [How to use this file](#how-to-use-this-file)
- [Entry format](#entry-format)
- [BLOCKED card](#blocked-card)
- Systems: [ignition](#engine--ignition) · [fuel](#engine--fuel-system) · [induction](#engine--induction) · [cooling](#engine--cooling) · [electrical](#engine--electrical) · [internals](#engine--internals--long-block) · [driveline](#driveline--transmission-and-coupling) · [exhaust](#exhaust)
- [Dead ends and rejected parts](#dead-ends-and-rejected-parts)

## How to use this file

- **Before hunting:** search this file first. If Quint already established the part number,
  Tier 1 is done — go straight to inventory.
- **After hunting:** append what was learned. Even a dead end.
- **Status vocabulary:** `RESEARCHED` · `SOURCED` (found, not bought) · `ORDERED` ·
  `INSTALLED` · `VERIFIED FIT` · `WRONG PART` · `ABANDONED`

## Entry format

```
### <Part name> — <system>

- **Status:**            RESEARCHED | SOURCED | ORDERED | INSTALLED | VERIFIED FIT | WRONG PART | ABANDONED
- **Part number(s):**    <OEM number> / <aftermarket equivalents>
- **Fitment:**           CONFIRMED | PROBABLE | UNVERIFIED
- **Fitment evidence:**  <what source established it, with URL — not "a catalog", the catalog>
- **Ignition protection:** PROTECTED | NOT PROTECTED | N/A  — <basis>
- **Sourced from:**      <vendor / listing URL> — <price> as of <date>
- **Alternatives found:** <the runners-up, with prices — so a re-run doesn't redo the search>
- **Notes:**             <anything a future run needs: gotchas, what didn't work, cross-refs>
- **First researched:**  YYYY-MM-DD
- **Last updated:**      YYYY-MM-DD
```

## BLOCKED card

When Tier 1 cannot yield because a number is missing, **the run outputs this — not an empty
result list.** An empty list reads as "no such part exists," which is wrong and discouraging.
The blocker *is* the finding.

```
### <Part name> — BLOCKED

- **Status:**        BLOCKED
- **Blocked on:**    <the specific number or fact that's missing>
- **Where to get it:** <exactly where on the boat, in plain terms —
                      "tag on the transmission housing", "pan rail near
                      the starter, format F2AE-6015-xx">
- **What it unlocks:** <what becomes answerable once it exists>
- **Best available now:** <family-level candidates, labeled UNVERIFIED,
                      with the reasoning — or "nothing responsible">
- **Do not buy on this alone.** <the specific consequence of guessing:
                      wrong bolt circle, balance mismatch, wrong ratio>
```

A BLOCKED card is a successful run. It converts an unknown into an errand.

---

## Engine — ignition

*(No entries yet.)*

## Engine — fuel system

### Mechanical fuel pump — fuel system

- **Status:**            RESEARCHED
- **Part number(s):**    PCM `RA080002A` (OEM) / Skidim `CCI080002A` / Sierra `18-7267` /
                         Protorque `PH500-M012`. Replaces Carter `M60389`.
- **Fitment:**           CONFIRMED
- **Fitment evidence:**  "All Ford 302 & 351 cu. in. marine engines equipped with a mechanical
                         fuel pump 1971 and up" —
                         [MyInboardMarine](https://www.myinboardmarine.com/products/fuel-pump-assembly-mechanical-pcm-ford-small-block-302-351-factory-pcm).
                         Inlet 7 o'clock / outlet 6 o'clock, gasket incl., "provision for vent
                         tube to carburetor" —
                         [MarineEngineParts](https://marineengineparts.com/pleasurecraft-marine-ra080002a-mechanical-fuel-pump-302-and-351-ford/).
                         Skidim `CCI080002A` "6 o'clock output from the side of the engine" —
                         [Skidim](https://skidim.com/fuel-pump-pcm-ford-302-351/).
- **Ignition protection:** N/A — mechanical, not electrical equipment. 33 CFR 183.410 does not apply.
- **183.524(a) verdict:** **PASS** on OEM and on Sierra `18-7267`. CFR text verified verbatim
                         this run: *"Each diaphragm pump must not leak fuel from the pump if the
                         primary diaphragm fails"* —
                         [33 CFR 183.524](https://www.law.cornell.edu/cfr/text/33/183.524).
                         OEM satisfies via the **vent tube to the carburetor**; Sierra `18-7267`
                         satisfies via **dual diaphragm**, "eliminating the need for a sight tube"
                         — [MyInboardMarine 18-7267](https://www.myinboardmarine.com/products/fuel-pump-assembly-mechanical-pcm-ford-small-block-302-sierra-18-7267).
                         **UNVERIFIED** on Protorque `PH500-M012` and Amazon-grade copies — no
                         published diaphragm or vent claim. Confirm the vent nipple exists on the
                         body before installing.
- **Pressure:**          **5–7 PSI** for PCM mechanical pumps — Correct Craft Ski Nautique
                         owner's manual p.78
                         [(ManualsLib)](https://www.manualslib.com/manual/812754/Correct-Craft-Ski-Nautique.html?page=78).
                         Hull-canonical. Squarely in carburetor range.
- **Sourced from:**      Prices as of **2026-08-09**:
                         [Skidim `CCI080002A` **$124.59, in stock**](https://skidim.com/fuel-pump-pcm-ford-302-351/) ⭐ best value ·
                         [iNet Marine OEM **$187.67, 7 in stock**](https://inetmarine.com/PCMRA080002APCMFordSmallBlockFuelPumpAssembly.aspx) ⭐ best OEM availability
- **Alternatives found:** [BPI Protorque $99.95](https://bpi.ebasicpower.com/shop/all-applications/fuel-system/fuel-pumps-filters/fuel-pumps/fuel-pump-mechanical-for-pcm-ford-small-block-302-351-ra080002a) ·
                         [Bakes $167.99 (1 left)](https://bakesonline.com/products/pcm-fuel-pump-mechanical-ford-302-351) ·
                         [MyInboardMarine $177.90 SOLD OUT](https://www.myinboardmarine.com/products/fuel-pump-assembly-mechanical-pcm-ford-small-block-302-351-factory-pcm) ·
                         [MarineEngineParts $161.99 OUT OF STOCK](https://marineengineparts.com/pleasurecraft-marine-ra080002a-mechanical-fuel-pump-302-and-351-ford/) ·
                         [WaterSkis.com $249.99 in stock](https://waterskis.com/pcm-fuel-pump-assembly-for-ford-302-and-351) ·
                         [Twister $393.00](https://twisterskishop.com/product/pcm-pleasurecraft-marine-pcmra080002a-fuel-pump-assembly-302-351/) ·
                         [Go2Marine Sierra 18-7267 $152.45, out of stock 3–6 wk](https://www.go2marine.com/AC-Fuel-Pump-OMC-Mercruiser-Ford-302-351-18-7267)
- **Notes:**             ⚠️ **Sierra `18-7266` is NOT the cross.** Different flange (41413 vs
                         41414), crosses to Carter `M6696` / Mercruiser, does **not** list
                         `RA080002A` —
                         [MyInboardMarine 18-7266](https://www.myinboardmarine.com/products/fuel-pump-assembly-mechanical-indmar-merc-ford-small-block-302-351-sierra).
                         A search result claimed it does. **Source conflict, not averaged** —
                         the product pages win. Vent/sight tube runs in Tygon from the pump
                         nipple to a barb on the flame arrestor; it must NOT go to a vacuum port.
                         eBay could not be searched this run — bot challenge. Constructed URLs
                         are in the run notes for manual use.
- **First researched:**  2026-08-09
- **Last updated:**      2026-08-09

### Pumping eccentric, two-piece — fuel system

- **Status:**            RESEARCHED
- **Part number(s):**    Ford `D5AZ-6287-B` (inner) + `D0AZ-6287-A` (outer). Kits: Regis
                         `FP-612`, Scram Speed `SBF100`.
- **Fitment:**           **PROBABLE** — gated on one measurement: the cam dowel pin length.
- **Fitment evidence:**  Regis `FP-612` lists both OEM numbers and "FITS FORD SB & BB 255, 302,
                         **351W**, 429, & 460" —
                         [Regis](https://regismanufacturing.com/ford-fuel-pump-eccentric-kit-fp-612/).
                         1973-and-later SBF = short **1.125"** dowel + two-piece eccentric;
                         1972-and-earlier = **1.375"** dowel + one-piece. Factory Five builder
                         converting a **1996 EFI 351W** used the two-piece, "worked great" —
                         [ffcars](https://www.ffcars.com/threads/351w-fuel-pump-eccentric-1-or-2-piece.101714/)
                         `[folklore, corroborated]`. Cam bolt **3/8"** on Ford letter cams —
                         [302budgetbuild](https://www.302budgetbuild.com/fuel-pump-eccentric-installation-302-small-block-ford-mechanical-fuel-pump/).
- **Ignition protection:** N/A — internal mechanical component.
- **Sourced from:**      [Regis `FP-612` **$16.99**](https://regismanufacturing.com/ford-fuel-pump-eccentric-kit-fp-612/)
                         — inner + outer + bolt + washer. As of 2026-08-09.
- **Alternatives found:** [Scram Speed `SBF100` $44.99, in stock](https://www.scramspeed.com/products/small-block-ford-mechanical-fuel-pump-eccentric-kit.html)
                         — adds the **correct-length cam dowel**. Buy this one if the installed
                         dowel turns out to be the wrong length.
- **Notes:**             **Cam end-play is NOT affected by this swap.** Ford Performance sells
                         `M-6269-A302`, a **.250" production camshaft thrust plate for 302/351W,
                         "for use with flat tappet and hydraulic roller camshafts"** —
                         [Ford Performance](https://performanceparts.ford.com/part/M-6269-A302).
                         The Windsor controls cam thrust at the plate, not at the eccentric.
                         Raised as the run's top risk at the Phase 3 gate; **investigated and
                         cleared.** Nothing to shim or measure.
- **First researched:**  2026-08-09
- **Last updated:**      2026-08-09

## Engine — induction

*(No entries yet.)*

## Engine — cooling

*(No entries yet.)*

## Engine — electrical

*(No entries yet.)*

## Engine — internals / long block

*(No entries yet.)*

## Driveline — transmission and coupling

*(No entries yet.)*

## Exhaust

*(No entries yet.)*

---

## Dead ends and rejected parts

The most under-valued section in the file. A part that was investigated and rejected saves a
future run the entire investigation — but only if the *reason* is recorded.

```
### <Part> — REJECTED
- **Why rejected:** <the actual reason — failed ignition protection, wrong rotation,
  wrong balance, unobtainable, landed cost too high>
- **Evidence:** <URL>
- **Do not revisit unless:** <the condition that would change the answer>
```

### Ford Performance `M-6287-B302` fuel pump eccentric — REJECTED

- **Why rejected:** **It is a ONE-PIECE eccentric, not a reproduction of the two-piece
  `D5AZ-6287-B`/`D0AZ-6287-A`.** It needs the pre-1973 long (1.375") cam dowel. Ford
  Performance's own catalog carries the disqualifier: *"Not compatible with stepped faced timing
  sprocket originally equipped with two piece fuel pump eccentric."* The 1992 351W is a
  short-dowel, two-piece-era engine. Also $165 against $16.99 for the correct kit.
- **Evidence:** [performanceparts.ford.com/part/M-6287-B302](https://performanceparts.ford.com/part/M-6287-B302)
  `[canonical]`
- **Do not revisit unless:** the cam dowel measures ~1.375" (long), meaning someone fitted a
  one-piece setup during a rebuild — in which case this becomes correct and the two-piece
  becomes wrong.
- **Note:** This part was carried in `the-boat.md` and `351w-swap.md` as the "repro" of the
  two-piece unit. **That was wrong.** Classic F1 — right-looking part number, wrong application.
  Corrected 2026-08-09.

### Sierra `18-7266` fuel pump — REJECTED as the RA080002A cross

- **Why rejected:** Wrong flange. `18-7266` is flange ID **41413**, crossing to Carter `M6696`,
  Mercruiser, Indmar `592011`, Mallory `9-35410` — it does **not** list `RA080002A`. The correct
  Sierra cross is **`18-7267`**, flange **41414**, which names `PCM RA080002A` explicitly and is
  dual-diaphragm.
- **Evidence:** [18-7266](https://www.myinboardmarine.com/products/fuel-pump-assembly-mechanical-indmar-merc-ford-small-block-302-351-sierra)
  vs [18-7267](https://www.myinboardmarine.com/products/fuel-pump-assembly-mechanical-pcm-ford-small-block-302-sierra-18-7267)
- **Do not revisit unless:** a Sierra factory application table (not a search snippet) shows
  `18-7266` against PCM Ford. A web search summary asserted this; the vendor product pages
  contradict it. Conflict surfaced, not averaged.
