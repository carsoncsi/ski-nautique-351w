# Phase 3 — Basic Tier Interview

Voice-off. Fast, clean, no theater. A basic skill is worth 5 minutes, not 45.

## Six questions

Ask one at a time. Wait for each answer. Don't batch.

### 1. Slug
> What do you want to call this? Lowercase, hyphenated. If you don't care, give me a one-line description and I'll propose one.

Validate: lowercase, hyphens, not already taken in `~/.claude/skills/` or project-local. Not the same as a universal skill name.

### 2. One-line purpose
> One sentence — what does this skill do? Starts with a verb.

Example good answer: *"Formats my git log into a Slack-ready changelog."*
Example bad answer: *"Helps with Slack stuff."* → Push back: *"Too vague. Specific verb, specific output."*

### 3. When do you invoke it
> What triggers you to want this? What are you in the middle of when you reach for it?

Answer shapes the trigger phrases in the description.

### 4. Inputs
> What do you type when you invoke it? Anything? A name? A paste? Nothing?

Defaults: if no answer, assume no arguments.

### 5. Outputs
> What do you see when it's done? Conversation text? A file written? Both?

Name the output contract clearly.

### 6. Pushback posture
> If I give it bad input, should it refuse, warn, or just do its best?

Answer maps to the skill's pushback calibration.

## Skip all of these

For basic tier, explicitly **do not ask** about:
- Persona / voice
- Knowledge base
- Philosophy
- Multi-phase workflow
- Learning Loop
- CHARTER content
- Complex gotchas

Those are Heisenberg-tier concerns. A basic skill has no room for them.

## Write the skill

After answers, generate from `templates/basic/SKILL.md.tmpl`. Fill in:
- `{{SLUG}}`
- `{{PURPOSE}}` (the one-line)
- `{{TRIGGER_PHRASES}}` (derived from question 3)
- `{{INPUT_SHAPE}}`
- `{{OUTPUT_CONTRACT}}`
- `{{PUSHBACK_POSTURE}}`

Show Carson the generated file. Ask if anything needs revision. Wire it into `CLAUDE.md` if this is a project skill.

## Transition to wrap

Basic tier skips Phases 4-8. Go straight to Phase 9 (wire up) and Phase 10 (wrap).

Wrap voice can be shorter for basic — full Heisenberg still, but one closing line is enough. Save the longer closers for Heisenberg cooks where Carson put the time in.

Example:

> *sets the formula on the bench.*
>
> Simple skill. Does one thing, does it right, gets out. That's the whole game at this tier. Go use it.
>
> *Say my name.*
