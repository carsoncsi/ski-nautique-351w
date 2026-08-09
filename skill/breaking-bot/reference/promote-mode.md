# Promote Mode

Breaking Bot's third job. The build flow *makes* skills; audit mode *detects* rot; **promote mode renovates a skill upward a tier** — basic→normal, normal→heisenberg — without throwing away what the skill has learned. Skills drift upward: something cooked at normal grows a knowledge base, gates, a persona, and becomes de-facto heisenberg work with none of the scaffolding. Re-cooking from scratch destroys accumulated content; promote preserves it.

> **Preserve-first. One-way upward. Gated at the target.** Existing prose is load-bearing — generate only what's missing; never rewrite live content unseen.

Read this doc when `$ARGUMENTS` begins with `promote`.

---

## Invocation

| Command | Meaning |
|---|---|
| `promote <slug>` | Assess and renovate to the next tier up (assess may recommend skipping straight to heisenberg) |
| `promote <slug> --to <tier>` | Carson pre-names the target; assess validates rather than recommends |

Promote is **one-way upward**. There is no demote mode — stripping scaffolding from a skill is a manual call Carson makes himself. If a skill seems over-tiered, say so and stop; that's an observation, not a flow.

---

## The flow

### P1 — Assess *(voice-on, light — then HARD GATE)*

1. Read the candidate skill in full: SKILL.md, every reference file, scripts, lessons/reflections if present.
2. Gather drift evidence: does it have a knowledge base bolted on? A persona? Human-approval gates? 5+ phases? Run the **signals matrix in `interview/tier-selection.md`** against what the skill *actually does today*, not what its frontmatter claims.
3. Render the **Gate Schema** (`~/.claude/skills/_shared/gate-schema.md`): recommended target tier, the drift evidence, and an honest `strongest_objection` (the usual one: "this skill runs monthly — renovation may not pay for itself"). **"No promotion needed" is a legitimate verdict** — precision over recall, same as audit. If the skill is fine at its tier, say so and stop.
4. Carson approves the target. This is the hard gate — everything downstream commits to it.

### P2 — Diff *(voice-off, mechanical — no gate)*

Walk the target tier's template tree + the 19-feature checklist against the existing skill. Classify every element:

- **PRESENT** — exists and serviceable. Migrates verbatim. Lessons, gotchas, reflections, working prose: untouched.
- **PARTIAL** — exists but below target standard (e.g., a gotchas section with one generic entry). Flag for upgrade — *with a visible diff*, never a silent rewrite.
- **MISSING** — required by the target tier, absent (typically: CHARTER.md, purity criteria, walkthroughs, scripts/validate.js, philosophy).

Output: a **renovation manifest** shown to Carson (mechanical, no gate — he can scan it while the gap interview starts).

### P3 — Gap interview *(voice-off)*

Run **only the interview sections that feed MISSING/PARTIAL pieces** — usually CHARTER non-goals + invariants, purity criteria, failure modes, and (if heisenberg) philosophy + persona-or-not. Pre-fill aggressively from the skill's existing content: confirm, don't ask blind. A skill that's been running for months has already answered most questions through its own files.

### P4 — Generate *(voice-off)*

Build the MISSING pieces from the target templates; apply PARTIAL upgrades as visible diffs Carson sees. Then the standard generation audits: cache-stability contract, SKILL.md ≤3k cap, every link resolves to a file that exists (see lessons — dead links are how templates rot).

**A freshly-authored CHARTER.md is approved by Carson before it becomes immutable.** It's the one artifact you can't quietly fix later.

### P5 — Walkthrough, wire, wrap *(voice-off → voice-on)*

Phase 8-equivalent test walkthrough on the renovated skill (2-3 invocations, including one that exercises the *new* scaffolding). Update the skill's CLAUDE.md entry with its new tier. Reflection step. Voice-on wrap.

---

## Rules

1. **Never rewrite live content unseen.** PARTIAL upgrades render as diffs; PRESENT content migrates byte-for-byte.
2. **Slug, triggers, and data contracts never change during a promote.** Renames and contract changes are separate, explicit work — bundling them into a renovation is contamination.
3. **Lessons and reflections migrate verbatim.** They are the skill's accumulated experience — the entire reason promote exists instead of re-cook.
4. **CHARTER authored at promote-time gets Carson's explicit approval** before the immutability rule attaches.
5. **"Already at tier" / "not worth it" are first-class P1 outcomes.** Don't manufacture renovations.

---

## Integration

- **Audit mode feeds promote.** An `open-for-build` verdict whose finding is tier-drift ("this normal-tier skill has a knowledge base and gates") routes here: `promote <slug>`.
- **Tier-selection is the shared rubric.** P1's assessment reuses `interview/tier-selection.md`'s signals matrix — one source of truth for what each tier means.
- **Voice:** on at P1 and wrap, off in the middle. Same contract as a cook.
