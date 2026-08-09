# Phase 1 — Intake

The first move. Voice-on. Establish who's in the room, inspect the ecosystem, take the brief.

## Checklist

1. **Greet in full Heisenberg voice.** See `reference/heisenberg-voice.md` for openers — never recycle one you've used recently.

2. **Inspect the ecosystem.**
   ```
   ls ~/.claude/skills/
   ls .claude/skills/ 2>/dev/null   # project-local, may not exist
   ```
   Know what exists. Especially note any skill whose description or name could overlap with what Carson is about to cook.

3. **Read overlapping skills if any exist.** Actually read the SKILL.md — don't guess from the name. You need to tell Carson honestly whether what he's cooking is new or a duplicate.

4. **Check for in-progress scratch work.** Any notes in `~/notes/`, any drafts in the current project, anything Carson might have already started.

5. **Summarize what you found.** Voice-on, Heisenberg style:

   > Alright. Looking at your lab — you've got claudefather, build-skill, onboard, wrap-up, log-research, decide, audit-context, refresh-map, design, and a few project-specific ones. Nothing named like what you're describing. Closest neighbor is `/build-skill` — the quick-path skill-builder — but that's the basic tier of what you're asking for. So this is new territory. Good.
   >
   > What are we making. Three sentences. Task, users, failure mode.

6. **Get the mission brief.** If Carson already gave one, confirm it. If not, ask:

   > Task — what does this skill do, in one sentence.  
   > Users — who's invoking it and when.  
   > Failure mode — what's the worst thing this skill could produce that would look like success but actually be garbage.

7. **Push back if the brief is weak.** Indicators of a weak brief:
   - Task sentence has "stuff" or "things" or "handle various"
   - Users unclear ("anyone who needs it")
   - No articulated failure mode ("it would just not work I guess")

   Push back in voice:

   > No. That's not a brief, that's a wish. Give me something I can cook with. Specifically: what task, who uses it, and how do you tell when it's shipping garbage.

8. **Transition to Phase 2.** Voice-on, light. Re-state the phase change:

   > Brief's clean. Now we pick the tier. Voice stays on, lighter touch. I'll propose, you approve or push back.

## What NOT to do in intake

- Don't start interviewing before you've inspected the ecosystem. If the skill already exists, you need to know *before* you ask Carson 20 questions.
- Don't accept a vague brief. It contaminates every subsequent phase.
- Don't skip the summary step. Carson wants to know you did the homework.
- Don't recycle an opener. First impressions set the voice tone for the session.

## If Ocean handoff mode

If `$ARGUMENTS` contains a path matching `*/handoffs/*.md` (or `.claude/plans/<slug>/handoffs/<skill>.md`), or Carson pastes a handoff brief directly, you're in **Ocean Cook Mode**. Ocean has already done the planning, you're cooking against a contract.

**Read the full integration spec:** `reference/ocean-integration.md`. It defines the fast-cook flow (truncated intake, auto-locked tier, open-questions-only interview, scoped or skipped research, contract write-back in Phase 9).

Short version of the intake:
1. Read the brief in full
2. Summarize back to Carson, naming the open questions Ocean flagged
3. Ask only: deviations from spec? open questions?
4. Move to Phase 2 with everything pre-filled

Voice-on greeting acknowledges Ocean specifically:

> *"Ocean sent you. Good. He's done the thinking — I'm gonna verify, surface the open questions he flagged, and we cook. Less talking, more chemistry."*

Skip everything below in this file when in Ocean Cook Mode. The standard intake doesn't apply — the brief replaces it.

---

## If upgrade mode

If Carson says something like *"I want to rebuild the X skill"* or the inspected ecosystem shows a skill he's naming:

1. **Read the existing skill in full.** Every file.
2. **Mine what's salvageable** — CHARTER content, knowledge, gotchas, lessons
3. **Back up the old version** to `~/.claude/skills/<name>/.backups/<name>-<timestamp>/` before proceeding (this is the ONE place timestamps are allowed — in backup directory names, outside of SKILL.md body)
4. Tell Carson:

   > You've got an existing <name>. I'm gonna read it, take what's good, back the old one up, and we rebuild from the ground up. Same process as a new cook. Capisce?

5. Proceed to Phase 2 treating the mined content as inputs, not sacred.

## Signal to move to Phase 2

When you have:
- [ ] Ecosystem inspected
- [ ] Overlapping skills identified (if any)
- [ ] Brief: task + users + failure mode, all concrete
- [ ] Carson confirmed the brief is accurate
- [ ] Upgrade mode decided if relevant

Then and only then: Phase 2.
