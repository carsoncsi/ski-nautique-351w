# The Boat — Specification Ledger

**This is the spine. Read it first, every run, before anything else.**

No Quint instance ever asks "what boat are we working on." The answer is here. If something
below is wrong or out of date, that is the highest-priority correction in the session —
a stale ledger silently contaminates every downstream fitment decision.

## Contents

- [At a glance](#at-a-glance)
- [Hull](#hull)
- [Original engine (out of service)](#original-engine-out-of-service)
- [Replacement engine (current build)](#replacement-engine-current-build)
- [Transmission / driveline](#transmission--driveline)
- [Current build state](#current-build-state)
- [Locked decisions](#locked-decisions)
- [Open decisions](#open-decisions)
- [Known unknowns — and what each one blocks](#known-unknowns--and-what-each-one-blocks)
- [Change log](#change-log)

---

## At a glance

> **1994 Ski Nautique** (Correct Craft), direct drive inboard.
> Factory **PCM High Output 351 Windsor, ProTec TBI** — blown head gasket, out of service.
> Replaced with a **1992 Ford F-150 351W**, being converted to **carbureted marine** spec.
> Both engines: **regular rotation, flat tappet cam.**
> Transmission **1.23:1 direct drive**, already mounted to the new block.
> Budget posture: **cheapest that works, never below the safety floor.**

---

## Hull

| Field | Value | Source |
|---|---|---|
| Year | 1994 | Owner |
| Make | Correct Craft | Owner |
| Model | Ski Nautique | Owner |
| Drive configuration | Direct drive inboard | Owner |
| HIN | **UNKNOWN** — to be collected | — |

---

## Original engine (out of service)

| Field | Value | Source |
|---|---|---|
| Manufacturer | PCM — Pleasurecraft Marine | Owner |
| Family | 351 Windsor (Ford 5.8L) | Owner |
| Variant | High Output | Owner |
| Fuel system | Throttle body injection (TBI) | Owner |
| Engine management | **ProTec** | Owner |
| Rotation | Regular (standard) | Owner |
| Valvetrain | Flat tappet cam | Owner |
| Status | **Blown head gasket. Removed. Pending refurbishment.** | Owner |
| Engine serial number | **UNKNOWN** — to be collected | — |

**Parts being harvested from this engine:**
- Front timing cover and its accessory drive attachments → transferring to the new block
- Heads and cam → **not** being used initially; will return after refurb

---

## Replacement engine (current build)

| Field | Value | Source |
|---|---|---|
| Donor | 1992 Ford F-150 | Owner |
| Family | 351 Windsor (5.8L) | Owner |
| Original fuel system | EFI, high-pressure electric pump | Owner |
| Rotation | Regular (standard) — **matches PCM** | Owner |
| Valvetrain | Flat tappet cam — **matches PCM** | Owner |
| Mechanical fuel pump boss | **ABSENT.** No mounting provision on the block. | Owner, direct observation |
| Block casting number | **UNKNOWN** — to be collected | — |
| Heads | F150 originals, running as interim | Owner |
| Cam | F150 original, running as interim | Owner |

**The absent fuel pump boss is a load-bearing constraint.** It rules out the conventional
carbureted fuel setup and forces an electric low-pressure solution — which on a gasoline
inboard drags in ignition protection, a safety shutoff circuit, and hose rating
requirements. See `reference/marinization.md`.

---

## Transmission / driveline

| Field | Value | Source |
|---|---|---|
| Reduction ratio | 1.23:1 | Owner |
| Configuration | Direct drive | Owner |
| Supplied by | PCM | Owner |
| Make / model | **UNKNOWN** — tag not yet read | — |
| Status | **Already mounted to the new block.** | Owner |

---

## Current build state

*This is the section most likely to go stale. Confirm it at the start of any run where it matters.*

```
ENGINE          1992 F150 351W block, on the stand / in the boat
HEADS           F150 originals            [INTERIM — PCM HO heads to return post-refurb]
CAM             F150 original             [INTERIM — PCM HO cam to return post-refurb]
TIMING COVER    PCM unit + accessories    [PLANNED transfer — verify fitment]
TRANSMISSION    PCM 1.23:1, MOUNTED       [DONE]
FUEL SYSTEM     PATH A — MECHANICAL       [RESOLVED — see below]
IGNITION        Not resolved              [OPEN — marine distributor required]
INDUCTION       Not resolved              [OPEN — marine intake + carburetor required]
EFI / PROTEC    Both being deleted        [DECIDED]
```

### ✅ RESOLVED — the fuel pump mount is on the timing cover

**Carson, direct observation:** the mechanical fuel pump mount is present **on the timing
cover** — two bolts with a **block-off plate** over it.

This matches the Ford-Trucks account that the provision moved from the block to the cover on
1988+ Ford small blocks, and it settles the conflict recorded in
[`351w-swap.md`](351w-swap.md#the-fuel-pump-boss-and-the-eccentric). The block having no boss
was never the whole question.

**Consequence — PATH A is live.** The entire electric-pump compliance stack is deleted from
this build: no J1171/UL1500 pump, no 183.524(b) run-interlock circuit, no oil-pressure switch,
no relay, no cranking bypass, no outlet-pressure regulation, no fusing question, no 12-inch
mounting rule.

**What's needed instead:**

| Item | Detail | Status |
|---|---|---|
| Mechanical fuel pump | PCM `RA080002A`, marine double-diaphragm, Ford 302/351, vented to the flame arrestor | To source |
| Pumping eccentric | Two-piece — `D5AZ-6287-B` inner / `D0AZ-6287-A` outer, repro Ford Performance `M-6287-B302`. **The F150 cam currently has the thin one-piece EFI washer — it must come off.** | To source |
| Block-off plate | Remove from the cover | On hand |
| Compliance | **33 CFR 183.524(a) only** — diaphragm-failure containment. Satisfied by the OEM marine double-diaphragm design. | — |

**Still required regardless of path:** USCG Type A1 hose on the pump→carb run · fire-tested
marine filter/strainer · anti-siphon verification at the tank withdrawal fitting · flame
arrestor.

**Still open on the boat side:** the hull is plumbed for factory high-pressure TBI. The
mechanical pump draws from the tank directly, so the OEM high-pressure pump and its return
line need to be removed, bypassed, or capped. Not blocking, but not done.

⚠️ **One thing to confirm while the cover is off:** that the pump mount and the **raw water
pump drive** on this cover don't conflict, and that the cover casting number is recorded. The
Ford-Trucks source noted some serpentine covers are "mechanical fuel pump **or** accessory
drive, but not both." PCM's cover should carry both — it came off a mechanically-pumped marine
engine — but confirm it rather than assume.

---

## Locked decisions

Decisions already made. Quint does not relitigate these; he sources against them.

1. **Delete the PCM ProTec system.** Not being repaired or reused.
2. **Delete the Ford EEC-IV EFI.** Not being adapted.
3. **Convert to carburetor + marine distributor.**
4. **Carry the PCM front timing cover and its accessory drive onto the F150 block.**
5. **Run the F150 heads and cam as the interim setup** until the PCM HO units return from refurb.
6. **Transmission stays as-is** — already mounted, not being changed.
7. **Budget posture: cheapest that works.** Bounded by the charter's safety floor —
   cheap is a ranking criterion, not a safety exemption.

---

## Open decisions

Things Quint is expected to research and bring options for.

| Decision | Constraint | Status |
|---|---|---|
| ~~**Fuel delivery architecture**~~ | ~~No mechanical pump boss.~~ | ✅ **RESOLVED — Path A, mechanical.** Mount found on the timing cover. |
| **Remove/bypass the OEM high-pressure TBI pump** | Mechanical pump draws from the tank; the hull is plumbed for high-pressure EFI | Open — not blocking |
| **Carburetor** | Cheapest that works. Sized for a 351W with a stock '92 truck cam in a ski boat. Marine-spec. | Open |
| **Intake manifold** | Marine 4-bbl (or 2-bbl) to suit the chosen carb. | Open — depends on carb |
| **Distributor** | Marine, ignition protected, 351W, with advance (the EFI TFI unit has none). | Open |
| **Flywheel / damper plate** | Must interface the F150 block to the PCM transmission. Balance must match. | Open — likely blocking |
| **Oil pan** | Must suit the installed engine angle and clear the mounts. | Open |
| **Core plugs** | Brass, not steel, for raw-water service. | Open — cheap, easy, do not forget |

---

## Known unknowns — and what each one blocks

**These four numbers unlock a large fraction of precise parts lookup.** Until they exist,
Quint flags affected findings as *pending* rather than resolving them on assumption.

| # | Missing | Where to find it | What it blocks |
|---|---|---|---|
| 1 | **PCM engine serial number** | Tag on the original HO block | PCM's own catalog is serial-gated. Blocks precise identification of the HO variant, and the flywheel / damper plate PCM specified for it. |
| 2 | **Transmission make + model** | Tag on the transmission housing | Damper plate selection, coupler, fluid specification, service parts. The 1.23:1 ratio alone is not enough to order against. |
| 3 | **Hull Identification Number** | Transom, starboard side | Correct Craft dealer lookups and exact hull configuration for the model year. |
| 4 | **Ford block casting number + date code** | Block, typically above the starter / bellhousing flange area | Confirms which 351W variant is actually on the stand. Settles the balance specification and the flat-tappet question with a document instead of an assumption, and confirms whether the fuel pump boss was ever machined. |

When any of these arrive, update this file and log it in the change log below.

---

## Change log

| Date | Change | Source |
|---|---|---|
| Initial build | Ledger created from owner brief during skill cook. Four known-unknowns recorded. | Owner interview |
| 2026-08-09 | **Fuel system RESOLVED to Path A (mechanical).** Pump mount confirmed present on the PCM timing cover — two bolts under a block-off plate. Electric-pump compliance stack deleted from the build. Settles the block-vs-cover conflict in `351w-swap.md`. | Owner, direct observation |

*(Append above. Never remove history. Proposed changes require confirmation before writing —
see CHARTER non-goal #5.)*
