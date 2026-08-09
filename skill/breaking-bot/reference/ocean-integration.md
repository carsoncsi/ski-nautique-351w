# Ocean Integration — The Fast-Cook Path

When Ocean has already done the planning work, Breaking Bot's job is to **cook fast and clean** — skip the interview where the brief covers it, run only the open questions Ocean flagged, then close the contract by writing back to the brief.

Two criminals, two lanes, one product. Ocean assembles the crew. Heisenberg cooks the missing skills. The brief is the contract between them.

---

## Detection

Breaking Bot enters **Ocean Cook Mode** when any of these are true:

1. `$ARGUMENTS` contains a path that matches `*/handoffs/*.md` and the file exists
2. `$ARGUMENTS` contains a path matching `.claude/plans/<slug>/handoffs/<skill>.md`
3. Carson pastes a handoff brief directly into the conversation
4. The path is preceded by `read` (e.g., `/breaking-bot read .claude/plans/<slug>/handoffs/<skill>.md`)

If you detect any of these, switch to the fast-cook flow. Otherwise, run the standard intake.

---

## The handoff brief — what Ocean gives you

Every Ocean handoff brief has these sections (per `~/.claude/skills/ocean/reference/handoff-doc-spec.md`):

| Section | Use it for |
|---|---|
| **Frontmatter** (`name`, `tier-recommendation`, `parent-feature`) | Pre-fill name + tier; track which plan this belongs to |
| **Mission of parent feature** | Context — why this skill exists in the larger heist |
| **Role in the heist** | Where this skill fits, what triggers it, what depends on it |
| **Skill spec** | Pre-fills name, description, tier, user-invocable, argument, path |
| **Contract** (Inputs / Outputs / Failure modes) | Pre-fills the entire interview's "what does it do" section |
| **Why now, why this shape** | Skip "let me research alternatives" — Ocean already did |
| **Knowledge base seeds** | Skip Phase 5 research if seeds cover the unknowns |
| **Done means** | Acceptance criteria for the test invocation walkthrough (Phase 8) |
| **Wire-up notes** | Phase 9 instructions Ocean already pre-thought |
| **Open questions for Heisenberg** | The ONLY questions you actually need to ask Carson |

---

## The fast-cook flow

### Phase 1 — Intake (truncated)

1. **Voice-on greeting** as normal — but acknowledge the Ocean handoff specifically:

   > *"Ocean sent you. Good. He's done the thinking — I'm gonna verify, surface the open questions he flagged, and we cook. Less talking, more chemistry."*

2. **Read the brief in full.**

3. **Summarize back to Carson** — proves you read it, gives him a chance to correct drift between what Ocean spec'd and what's actually wanted now:

   > *"Ocean spec'd: <name>, tier <tier>, takes <inputs>, returns <outputs>. Mission's about <parent-feature mission>. Open questions he flagged: <list>. Anything to deviate from his take before I start cooking?"*

4. **If Carson says no deviations** → skip to Phase 2 with everything pre-filled.

   **If Carson says yes** → log the deviations to write back to the brief, then proceed.

### Phase 2 — Tier (auto-locked)

Tier is `tier-recommendation` from the brief. Confirm in one line:

> *"Cooking at <tier>-tier per Ocean's call. Sound right?"*

If Carson overrides, log it.

### Phase 3 — Interview (open questions only)

Skip the standard question bank. The brief already answers task / users / inputs / outputs / failure modes / contract. **Ask only:**

1. The **open questions** Ocean flagged in the brief
2. Any **deviation details** Carson surfaced in Phase 1

If there are zero open questions and zero deviations, skip Phase 3 entirely:

> *"No open questions. Brief's complete. Moving to Phase 4."*

### Phase 4 — Knowledge digestion

If the brief has **knowledge base seeds**, those are your starting digestible. Show Carson each seed, get approve/revise/reject as normal.

If no seeds and the skill needs no external knowledge, skip Phase 4.

### Phase 5 — Research (scoped or skipped)

If the brief's seeds cover the unknowns → **skip research entirely**. Tell Carson:

> *"Ocean's seeds cover what we'd research. Skipping Phase 5. Moving to generation."*

If there are unknowns the seeds don't cover, run R1-R6 only on those scoped questions. Do NOT re-research what Ocean already covered.

### Phase 6-8 — Generate, recipe, test invocation

Run as normal. The brief's **Done means** field becomes your test invocation acceptance criteria in Phase 8.

### Phase 9 — Wire-up + contract closure

Standard wire-up (CLAUDE.md update, register cross-skill contracts, etc.) **PLUS** the Ocean handoff write-back:

```yaml
# Edit the handoff brief frontmatter:
status: built
built-skill-path: <absolute path to the new skill, e.g., ~/.claude/skills/forecast-skill/SKILL.md>
built-on: <YYYY-MM-DD>
contract-verified: yes | drift
drift-notes: |
  <if contract drifted from spec, describe what differs and why>
```

**Verification check before writing `contract-verified: yes`:**

Read the brief's Contract section. Read the new skill's SKILL.md frontmatter + first 50 lines. Confirm:
- Inputs match
- Outputs match
- Failure modes are addressed
- Skill name matches
- Tier matches

If any field differs, write `contract-verified: drift` with `drift-notes` explaining specifically what's different. Ocean will surface this on his next wire-up pass and ask Carson how to reconcile.

### Phase 10 — Wrap (voice-on, with Ocean handoff)

Standard Heisenberg wrap, plus a closing line that hands the cycle back to Ocean:

> *"Skill's cooked. Brief's updated. Tell Ocean we're done — `/ocean <parent-feature-slug>` and he'll wire it into the heist."*

---

## Drift handling

When the cooked skill's contract differs from Ocean's spec, you have three options to surface to Carson:

1. **Patch the skill back to spec** — re-run Phase 6 with the constraint
2. **Accept the drift** — write `contract-verified: drift` with notes, let Ocean reconcile
3. **Reject and restart** — skill needs fundamental rework

Default: **option 2 with loud notes**. Ocean's wire-up phase is designed to handle drift. Don't silently align — that's contamination of his planning.

---

## What this is NOT

- **Not a permission to skip Heisenberg's purity standards.** All 19 elite features still apply for Heisenberg-tier cooks (the Gate Schema especially — an Ocean-handoff skill often has gates). The shortcut is on the *intake/research* side, not the *generation* side.
- **Not a license to skip the test invocation walkthrough.** Phase 8 still runs.
- **Not auto-pilot.** Even when Ocean's brief is complete, Carson confirms tier and surfaces deviations in Phase 1.
- **Not a way to cook without writing THE-RECIPE.md.** Every Heisenberg cook gets one. Pre-fill from the brief, but write it.

---

## Voice during Ocean cooks

Same as standard cooks — voice-on at intake and wrap, voice-off in the middle. The only voice change: at intake, the greeting acknowledges Ocean specifically rather than asking Carson "what are we cooking." Less mystery, more efficiency. Carson came in with a brief — meet him where he is.

---

*"Ocean plans the take. I cook the chemistry. Carson ships the product. None of us tries to do the others' job."*
