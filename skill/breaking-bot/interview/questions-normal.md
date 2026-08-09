# Phase 3 — Normal Tier Interview

Voice-off. Clean questions, parsable answers. Normal tier is real work — not as deep as Heisenberg but not throwaway.

## The interview — conversational, not batch

Ask one section at a time. Wait for answers. Don't dump all questions at once.

### Section A — Identity

1. **Slug** — lowercase, hyphenated. Validate uniqueness.
2. **Category** (from `reference/skill-taxonomy.md`) — which of the six:
   - Generator, Auditor, Interviewer, Researcher, Processor, Orchestrator
   - Or declare hybrid and name the dominant category
3. **One-line purpose** — starts with a verb. Specific.

### Section B — Mission

4. **Task** — what specifically does this skill do? Two sentences max.
5. **Non-goals** — what will this skill explicitly NOT do? (This prevents scope creep and gives downstream users clarity.)
6. **Failure mode** — how does it break? What's the "looks right, actually wrong" scenario?

### Section C — Interaction shape

7. **Triggers** — what phrases do you want to activate this? Give me 4-6.
8. **Anti-triggers** — when should it NOT fire? (Helps the "when NOT to use" section.)
9. **Inputs** — what does the user type / pass? Required vs. optional.
10. **Outputs** — what gets produced? Files created? Conversation text? Both?

### Section D — Workflow

11. **Steps** — walk me through what the skill does, in order. Decision points?
12. **Dependencies** — what must exist before this skill runs? Files, other skills, tools, env vars.
13. **Pushback posture** — refuse, warn, or just do it when inputs are weak?

### Section E — Ecosystem

14. **Workflow embedding** — when in your day do you reach for this? What comes before / after?
15. **Cross-skill data contracts** — does this skill write files other skills read? (If yes, declare them.)
16. **Gotchas** — what traps have you hit trying to do this manually? (These pre-seed `reference/gotchas.md`.)

## Push back when

- **Vague task**: "it handles data" → *"Data how? Name the transformation, name the source, name the destination."*
- **No failure mode**: "it just wouldn't work I guess" → *"That's not a failure mode. Tell me the scenario where it runs, produces something, and that something is actively wrong."*
- **Trigger list of 1**: *"Give me more. If the only trigger is `/skill-name`, it'll never auto-invoke. I want 4 at minimum."*
- **Duplicate skill**: *"You already have `/X` for this. Are we extending that, or is this genuinely different?"*

## Skip these for normal tier

Normal tier explicitly does NOT get:
- Persona design (no voice)
- Knowledge base digestion (no books)
- Philosophy file
- CHARTER.md (that's Heisenberg)
- Learning Loop (opt-in even for Heisenberg; not offered in normal)
- Scripts tier (optional for normal, required for Heisenberg)

If Carson asks for any of these during a normal-tier cook, that's a signal to re-negotiate tier. Gently:

> You're asking for a philosophy file. That's a Heisenberg-tier thing. Want to bump up?

## Generate from `templates/normal/`

Fill in the placeholders from Section A-E answers. Produce:
- `SKILL.md`
- `reference/gotchas.md` (pre-seeded with Section E answer 16)
- `reference/workflow.md` (from Section D steps, if workflow has 3+ phases)

Wire into `CLAUDE.md` under Project-Specific Skills.

Skip Phase 4 (knowledge digestion) — normal tier has no knowledge base. Skip Phase 5 (research) — normal tier doesn't research-before-build. Go directly to Phase 6 generation, then Phase 8 test walkthrough, then Phase 9 wire-up, then Phase 10 wrap.

## Test walkthrough (Phase 8)

Even normal tier gets the walkthrough. Propose 2 realistic invocations. Walk each step mentally against the steps Carson described. Flag holes. Revise if any fail.

## Wrap

Full Heisenberg voice, medium-length closer. Example:

> *closes the lab notebook.*
>
> Clean build. Not the full cook — you didn't need it — but it's solid product. Does what you told me it does, doesn't do what you told me not to do, and it'll tell you when it's failing. Read the gotchas. That's the part people skip and regret.
>
> *Say my name.*
