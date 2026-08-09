# Marinization — what must be marine, and why

The safety knowledge base. Every ignition-protection verdict Quint issues comes from here.

**Confidence tags on every claim.** `[canonical]` = regulation text or manufacturer
documentation. `[adjacent]` = established technical source. `[folklore]` = forum or community
consensus, useful but never sufficient alone. Where a claim is reasoned rather than sourced,
it says so.

## Contents

- [FUEL DELIVERY — DECISION GATE](#fuel-delivery--decision-gate)
- [The two regulatory regimes](#the-two-regulatory-regimes)
- [33 CFR 183.410 — the ignition protection standard](#33-cfr-183410--the-ignition-protection-standard)
- [Component by component](#component-by-component)
- [Fuel hose](#fuel-hose)
- [Electric fuel pump — the full compliance stack](#electric-fuel-pump--the-full-compliance-stack)
- [The safety floor — where "cheapest that works" bottoms out](#the-safety-floor--where-cheapest-that-works-bottoms-out)

---

## FUEL DELIVERY — DECISION GATE

**Every fuel-system run starts here. Do not source a fuel component until this is answered.**

> ### Does the PCM timing cover have a fuel pump mounting pad?
>
> Two bolt holes and a machined pad, driver's side of the cover.

The F150 block has **no mechanical fuel pump provision** — Carson's direct observation, and it
governs. But on Ford small blocks from roughly 1988 the provision may live on the **timing
cover**, not the block `[folklore — sources conflict, see 351w-swap.md Q9]`. The plan already
carries PCM's cover — from a mechanically-pumped marine engine — onto this block.

If the pad is there, an entire compliance subsystem disappears.

### → PATH A · Mechanical (if the pad exists)

| Item | Detail |
|---|---|
| Pump | PCM `RA080002A`, marine mechanical, Ford 302/351. Double-diaphragm, vented to the flame arrestor rather than the bilge. `[adjacent]` |
| Eccentric | Two-piece pumping eccentric — inner `D5AZ-6287-B` / outer `D0AZ-6287-A`, repro [Ford Performance `M-6287-B302`](https://performanceparts.ford.com/part/M-6287-B302) `[canonical]`. Your EFI cam has the thin one-piece washer fitted; swap it. **Not a cam change.** |
| Compliance surface | **33 CFR 183.524(a) only** — diaphragm-failure containment. 183.410 does not apply; a mechanical pump is not electrical equipment. |

**This is almost certainly both cheaper and simpler to make legitimately compliant.** Prefer it.

### → PATH B · Electric (if the pad does not exist)

Dedicated low-pressure, ignition-protected pump, ~4–7 psi, plumbed straight to the carburetor.
**Not** a high-pressure pump with a regulator — that's an automotive TBI-conversion technique
with no marine precedent, and it adds a return line that must itself meet USCG standards
`[medium]`. Example class: Walbro FRB-series reciprocating, certified USCG 16623-1/16623-2
[`[canonical]`](https://www.walbro.com/fr-series-fuel-pumps/).

Full stack in [Electric fuel pump](#electric-fuel-pump--the-full-compliance-stack) below.

### → UNKNOWN

**Do not source a pump, an eccentric, or a regulator on assumption.** Ask Carson to look at
the cover, and record the answer in [`the-boat.md`](the-boat.md) once known — this only gets
asked once.

**But do not end the run empty.** These are required on **both** paths and are sourceable
right now:

| Part | Why it's path-independent |
|---|---|
| **USCG Type A1 hose**, pump→carb run | 183.558(a) permits no other grade regardless of what drives the pump |
| **Fire-tested marine fuel filter / strainer**, independently mounted, sized for carb flow | Needed either way; the factory TBI filter is wrong for carb flow either way |
| **Anti-siphon verification** at the tank withdrawal fitting | 183.568. **The requirement survives the engine change** — and it is the easiest item on the whole build to forget, because it's on the boat, not the engine |
| **Flame arrestor** | 46 CFR 25.35-1. Required the moment there's a carburetor, whatever feeds it |

Source those, then come back for the pump once the cover is known.

### Either path: the boat side changes too

The hull was factory ProTec TBI, reported around 13–15 psi against a carburetor's ~4–7 psi
need `[folklore — exact PCM spec never found in a PCM document; confirm against the spec
plate]`. Six items change:

1. Low-pressure supply — swap the pump, don't regulate the OEM high-pressure unit down. Its
   flow curve and relay/ECM control strategy are built around injector demand.
2. **USCG Type A1 hose throughout**, properly clamped. See below.
3. Carb-appropriate regulator, or rely on the low-pressure pump's own regulated output.
4. Fire-tested, independently mounted marine filter/strainer sized for carb flow — not the
   factory TBI filter.
5. **Re-verify anti-siphon** at the tank withdrawal fitting. 33 CFR 183.568. *This requirement
   does not go away because the engine changed.* `[canonical]`
6. Decide the factory TBI return line's fate — keep if using a return-style regulator, cap if
   using a simple non-return low-pressure pump.

---

## The two regulatory regimes

The most useful structural fact here: **two bodies of law, binding different people.**

**33 CFR Part 183** (Subpart I electrical, Subpart J fuel) is written against *manufacturers*.
[33 CFR 181.3](https://www.law.cornell.edu/cfr/text/33/181.3) defines a manufacturer as someone
engaged in the manufacture, construction, or assembly of boats or associated equipment, or
importation for sale. A DIY repower on a hull you already own doesn't meet it, and no CFR
provision was found requiring an owner to recertify after a repower.
`[canonical text; the owner-exemption reading is interpretive, medium confidence]`

**46 CFR 25.35-1** is different in kind — vessel-facing, phrased as a direct equipment
requirement, and **what a boarding officer actually checks.**
[`[canonical]`](https://www.law.cornell.edu/cfr/text/46/25.35-1)

**Quint does not treat the Part 183 nuance as a loophole.** The certification *mechanism* is
manufacturer-directed; the *physics* it encodes are not. The regulation describes what ignites
a bilge. The bilge does not check who installed the alternator. Part 183 is the design
standard throughout. 46 CFR 25.35-1 is flagged separately as a hard legal obligation on Carson
personally.

**Scope is confirmed.** 33 CFR 183.401(a) and 183.501(a), verbatim and identically: *"This
subpart applies to all boats that have gasoline engines, except outboard engines, for
electrical generation, mechanical power, or propulsion."* A carbureted 351W direct-drive
inboard is squarely in scope.
[183.401](https://www.law.cornell.edu/cfr/text/33/183.401) ·
[183.501](https://www.law.cornell.edu/cfr/text/33/183.501) `[canonical, high]`

**ABYC's status.** Not law. But per marine-surveyor sources, ABYC standards *"often become the
de facto standards in legal situations, such as product liability lawsuits, where they can be
regarded as reflecting the custom of the industry."* Not enforceable against an owner-builder
— but the benchmark an insurer, surveyor, or court measures the work against.
[`[adjacent]`](https://clmarinesurveying.com/difference-in-abyc-and-uscg/)

> ⚠️ **ABYC H-24, E-11, and P-1 are paywalled.** Every substantive ABYC requirement in this
> file came from a **1993 archive edition** (H-24, P-1) or third-party summaries (E-11).
> Directionally useful. **Not verbatim-current.** Say so when citing them.

---

## 33 CFR 183.410 — the ignition protection standard

**The performance bar**, 183.410(a):

> *"Each electrical component must not ignite a propane gas and air mixture that is 4.25 to
> 5.25 percent propane gas by volume surrounding the electrical component when it is operated
> at each of its manufacturer rated voltages and current loadings, unless it is isolated from
> gasoline fuel sources..."*

Isolation alternatives: a compliant bulkhead (183.410(b)–(c) — resists a 12-inch water head,
seepage ≤ ¼ fl oz/hr), position above or below the fuel source with protective measures, or
≥2 feet of open-air separation.
[`[canonical, high]`](https://www.law.cornell.edu/cfr/text/33/183.410)

**What counts as an electrical component**, 183.402 — non-exhaustive: *"conductors, solenoids,
motors, generators, **alternators**, **distributors**, resistors, appliances and electrical
control devices."* **Alternators, starters (motors), and distributors are named explicitly.**
This is not merely about wiring.
[`[canonical, high]`](https://www.law.cornell.edu/cfr/text/33/183.402)

### How to verify a part complies

**There is no public USCG certificate database** for these components the way there is for
PFDs. Verification is:

1. **Physical marking** — `SAE J1171`, `UL 1500`, or `Ignition Protected` permanently marked on
   the housing or a durable attached label, **and/or**
2. **Manufacturer compliance statement** citing J1171 or UL 1500 testing.

[`[adjacent, medium]`](https://www.mechprod.com/blog/ignition-protected) ·
[SAE J1171](https://www.sae.org/standards/content/j1171_201609/)

**Flame arrestors verify differently:** a cast or stamped `SAE J-1928` or `UL 1111` mark on the
body, plus a flame-tight connection to the carburetor air horn.
[`[adjacent, medium]`](https://newboatbuilders.com/pages/fuel2.html)

> **Ignition protection is not visible in a photo.** A marine alternator and an automotive one
> look alike. The verdict comes from the part number and the manufacturer's specification —
> never from a listing image.

---

## Component by component

| Component | Verdict | Basis | The mechanism — *why* |
|---|---|---|---|
| **Alternator** | **MUST be marine** | 183.402 names it; 183.410 sets the bar `[canonical, high]` | Brush/slip-ring contact sparks in normal operation. Harmless in open air under a truck. An ignition source in a closed box where vapor pools. |
| **Starter** | **MUST be marine** | 183.402 names "motors" `[canonical, high]` | Internal shielding around the brush/commutator area contains sparking; commutator end sealed against bilge moisture. `[adjacent — construction detail]` |
| **Distributor** | **MUST be marine** | 183.402 names it explicitly `[canonical, high]` | Marine housings stop internal arcing (points, cap-and-rotor) propagating outward — commonly a screen/mesh flame-quenching path. Automotive housings have no equivalent and are untested to J1171/UL1500. `[adjacent — construction detail]` |
| **Fuel pump — electric** | **MUST be marine + interlocked** | 183.402/.410 **and** 183.524(a) **and** 183.524(b) `[canonical, high]` | Three obligations stack. See below. |
| **Fuel pump — mechanical** | 183.410 **does not apply** | Not electrical equipment | Only 183.524(a) diaphragm containment. **The cheap compliant path.** |
| **Carburetor** | Marine strongly indicated | 46 CFR 25.35-1 mandates the arrestor; no CFR text bans an automotive carb body | Marine carbs vent float bowls **internally to the air horn**. Automotive carbs vent **to atmosphere** — dumping raw fuel vapor into an enclosed bilge. Industry practice associated with SAE J1223. `[medium — J1223 paywalled, could not quote verbatim]` |
| **Fuel hose** | **MUST be USCG Type A1** (pump→carb) | 183.558(a) — no substitute permitted `[canonical, high]` | See below. |
| **Exhaust manifolds/risers** | **MUST be marine wet exhaust** | ABYC P-1 (not an ignition-protection item) `[adjacent, 1993 ed.]` | A dry automotive manifold at 1,200–1,400 °F in a sealed fiberglass box has no way to shed heat — fire risk against glass, wiring, fuel hose. Also lacks the anti-siphon geometry stopping raw water re-entering cylinders after shutdown. |
| **Flame arrestor** | **MUST be marine — federal, on you** | 46 CFR 25.35-1 `[canonical, high]` | Backfire flame containment. The most legally unambiguous item here. |
| **Core / freeze plugs** | Brass recommended; **no compliance floor** | No CFR or ABYC coverage found `[folklore]` | Corrosion life only. Steel is not a safety violation. Rank on price. |

**The carburetor row is the clearest "bolts on but does not fit" case on the whole engine.**
An automotive carb mounts to the same manifold and runs the engine perfectly. It also vents
fuel vapor into a confined space you sit on top of.

### Flame arrestor — the specifics

46 CFR 25.35-1(a): *"Every gasoline engine installed in a motorboat or motor vessel after
April 25, 1940, except outboard motors, shall be equipped with an acceptable means of backfire
flame control."* Installations predating 19 Nov 1952 may remain if serviceable; **new
installations must meet current standards — no grandfathering applies to this repower.**
[`[canonical, high]`](https://www.law.cornell.edu/cfr/text/46/25.35-1)

"Acceptable means" is defined by reference to **SAE J-1928** (June 1989) or **UL 1111** (June
1988), incorporated by reference. Must be marked accordingly and secured to the carburetor air
intake with a flame-tight connection. Not required only if the air induction system itself
functions as an arrestor, or backfire is directed outside the boat away from occupants.
[`[canonical]`](https://www.law.cornell.edu/cfr/text/46/part-25/subpart-25.35)

---

## Fuel hose

**The four types** — 33 CFR 183.540, by SAE J1527 class plus the 183.590 fire test:

| Type | SAE J1527 class | Fire test |
|---|---|---|
| **USCG Type A1** | Class 1 | **Yes** |
| USCG Type A2 | Class 2 | **Yes** |
| USCG Type B1 | Class 1 | No |
| USCG Type B2 | Class 2 | No |

[`[canonical, high]`](https://www.law.cornell.edu/cfr/text/33/183.540)

**The `-15` suffix.** 40 CFR 1060.102 sets marine fuel line permeation at **≤15 g/m²/day**,
tighter than the J1527DEC85 baseline in the codified CFR text (Class 1 = 100 g/m²/24hr). Hence
`A1-15` on current product. Reported to apply to vessels manufactured on or after 1 Jan 2009.
[`[canonical page, medium — worker hit a redirect loop; figure and date from search snippets]`](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-U/part-1060/subpart-B/section-1060.102)

**Where each type is required** — 33 CFR 183.558 `[canonical, high]`:

- **(a) Fuel pump → carburetor: USCG Type A1. Hard requirement. No substitute grade.**
- (b)(2) Tank → engine fuel inlet: A1, or B1 only if a severed line discharges ≤5 oz in 2.5
  minutes under the specified test.
- (b)(1) Vent/fill lines: A1 or A2, or B1/B2 under the same 5-oz condition.
- (c) Connections secured by swaged sleeve, sleeve-and-threaded-insert, or hose clamp.

### How to identify it on the hose

183.540(e)–(h): permanently marked `USCG TYPE [A1/A2/B1/B2]`, year of manufacture, and
manufacturer name or trademark, in **block capitals ≥ ⅛ inch high, repeated every 12 inches or
less.**

> **No stamp means no type, whatever the seller says.** This is a disqualifier Quint can check
> from a clear listing photo — one of the few that is visually verifiable.

### The donor truck's hose does not qualify

SAE 30R9 — the F-150's EFI hose, sold today as low-permeation — is explicitly not USCG rated.
Continental's own spec sheet lists **"USCG Specifications: Not Applicable."** It may beat the
15 g/m²/day figure, but it has not been fire-tested per 183.590 and cannot carry a USCG TYPE
marking. **It fits the barbs. It does not meet the requirement.**
[`[adjacent, high]`](https://www.continental-engineparts.com/na/en-us/automotive/hoses/automotive-hoses/fuel-hose/products/product-range/fuel-injection-hose-sae-30r9)

**Service life:** no fixed CFR or ABYC calendar interval found. Condition-based — replace on
cracks, cover separation, blistering, seepage, coupling damage, exposed reinforcement,
kinking, abrasion, or loss of flexibility, regardless of age. A ~10-year figure attributed to
BoatUS appeared only in a search snippet and could not be confirmed.
[`[adjacent, low]`](https://wilmingtonrubber.com/marine-fuel-hose-inspection-replacement-guide-improve-safety-prevent-downtime-and-extend-hose-life)

---

## Electric fuel pump — the full compliance stack

Only relevant on **Path B**. This is what the mechanical pump avoids.

**1. Ignition protection** — it's electrical equipment, so 183.402/183.410 apply. J1171 or
UL 1500 marked. `[canonical]`

**2. The run interlock is law, not practice** — 33 CFR 183.524(b):

> *"Each electrically operated fuel pump must not operate except when the engine is operating
> or when the engine is started."*

The regulation mandates the **outcome**, not the method. An oil-pressure switch is the common
implementation; the CFR does not name it as the only compliant one.
[`[canonical, high]`](https://www.law.cornell.edu/cfr/text/33/183.524)

**3. Diaphragm containment** — 183.524(a): *"Each diaphragm pump must not leak fuel from the
pump if the primary diaphragm fails."* 183.524(c): as installed and fire-tested per 183.590,
no more than five ounces in 2½ minutes, inclusive of leaks from line, filter, and strainer.
**Applies to mechanical pumps too.** `[canonical, high]`

**4. The accepted circuit** `[folklore — no standard prescribes it]`: oil-pressure switch
(normally open, closing at roughly 4–6 psi) in series between switched ignition power and a
relay powering the pump, with a parallel bypass from the starter solenoid so the pump primes
during cranking before oil pressure builds. Satisfies the letter of 183.524(b) and fails safe.
[iBoats](https://forums.iboats.com/threads/electric-fuel-pump-wiring-with-safety-pressure-switch.478882/) ·
[Moyer Marine](https://www.moyermarineforum.com/forums/forum/discussion-topics/fuel-system/184-wiring-the-electric-fuel-pump)

**5. ABYC H-24 adds two** `[1993 edition, secondhand, medium]`: pumps *"shall be independently
supported and located within 12 inches of the engine,"* and *"the outlet pressure... shall be
rated or controlled to the maximum carburetor fuel inlet pressure specified by the engine
manufacturer."* The pressure limit matters — an electric pump easily overwhelms a carburetor's
needle-and-seat, and flooding in an enclosed bilge is itself a fire hazard.

**6. Fusing** — no CFR amperage found. E-11's general principle: protection must not exceed
the conductor's capacity. A 10 A inline fuse is commonly cited on forums; **that is not a
standard figure.** Size to the actual pump draw and installed wire gauge. `[low]`

**7. Anti-siphon** — 33 CFR 183.568. The tank-to-carburetor line must either run above the
tank top, or have an anti-siphon device or electrically operated fuel stop valve at the tank
withdrawal fitting. If the tank top sits below the carburetor inlet: all-metallic line per
183.538 or Type A1 hose, **plus** a manual shutoff directly at the tank connection accessible
from outside the compartment, **plus** a second manual shutoff at the engine inlet if the run
exceeds 12 feet.
[`[canonical, high]`](https://www.law.cornell.edu/cfr/text/33/183.568)

---

## The safety floor — where "cheapest that works" bottoms out

From the charter: **cheap is a ranking criterion, not a safety exemption.** Quint ranks by
value *among parts that pass*. Items marked ⛔ **never enter a price ranking at all.**

| Component | The floor | Hardness |
|---|---|---|
| **Fuel hose (pump→carb)** | USCG Type A1, stamped. In practice current A1-15 stock. | ⛔ **Bright line.** 183.558(a) permits nothing else. No automotive hose qualifies at any price. |
| **Flame arrestor** | Genuine `SAE J-1928` or `UL 1111` mark, correctly sized, flame-tight. | ⛔ **Bright line.** Federal, vessel-facing, no grandfathering. |
| **Exhaust manifolds/risers** | Marine wet-exhaust assembly, OEM-pattern (PCM / Indmar / Sierra / Barr). | ⛔ An automotive dry manifold is not a discount version — it's a categorically different and dangerous part. |
| **Alternator** | `J1171`/`UL 1500` marked marine unit, new or certified marine reman. | ⛔ 183.402 names it. Exclude unmarked units regardless of price. |
| **Starter** | `J1171`/`UL 1500` marked marine unit. | ⛔ Same basis. |
| **Distributor** | `J1171`-marked marine ignition-protected unit. | ⛔ The donor F-150's distributor is below the floor. |
| **Fuel pump** | Path A: OEM-pattern marine double-diaphragm, vented to the arrestor. Path B: `J1171`/`UL1500` + verified run interlock + pressure limiting. | ⛔ on the part. The **architecture** is a real choice — see the decision gate. |
| **Carburetor** | Marine carb, internally vented float bowls, plus a compliant arrestor. | ⚠️ Not a bright-line federal prohibition, but a real physics-level gap. Treat as the practical floor. |
| **Core / freeze plugs** | Brass, for corrosion life. | ✅ **No compliance floor.** Genuinely rank on price. Lowest priority in this table. |

### Where cheap legitimately wins

The floor is not "buy OEM." **Sierra, Mallory Marine, and comparable aftermarket lines
cross-reference to OEM numbers and are fully legitimate** — they carry the same J1171/UL1500
certification at a fraction of dealer pricing. Finding the OEM number first is what unlocks
the cheaper equivalent.

**Do not confuse the aftermarket equivalent with the automotive substitute.** One is a
certified part at a better price. The other is below the floor.
