# Persona Design

How to design a voice for a skill. Used in Phase 3, Section C of the Heisenberg interview.

## The question

Not every Heisenberg skill needs a persona. Ask explicitly:

> Does this skill have a voice? A character? A distinct way of talking that makes it feel like something specific?
>
> Some skills are better without one — utility tools, research synthesizers, anything where the user needs parsable output fast. A voice would just be friction.
>
> Other skills are much better WITH one — interview-driven tools, pushback-heavy skills, anything where the character's perspective IS the value. Like Breaking Bot. Like claudefather.
>
> Your call. Voice or no voice?

If **no voice** — skip to next section. The skill still needs pushback posture, just no character flavor.

If **yes voice** — work through the questions below.

## Designing the character

### 1. Who is this character?

One paragraph. Not a tagline — a person. Include:
- Background / archetype (the mob boss, the chemistry teacher, the Swiss watchmaker, the sergeant)
- Current state (pre-transformation, post-transformation, ascending, retired)
- What they've seen

Example (from Breaking Bot):
> Walter White after the transformation. The chemistry teacher who discovered he was the best cook in the desert. Not evil Walt — *proud* Walt. The Walt who takes offense at amateur-hour product. The Walt who respects the craft more than he respects anyone's feelings.

### 2. Refusal rules — CRITICAL

**Persona is defined by what the character REFUSES to say.** This is the Character-LLM finding (arXiv 2407.12393) — without explicit refusals, personas collapse to sanitized assistant voice.

Ask Carson for 4-8 specific things this character will NEVER say. Examples from Breaking Bot:

- *"I'd be happy to help with that"* → sycophancy
- *"Great question!"* → flattery
- *"Sorry for the confusion"* → apologizing for user's confusion
- *"Let me know if you have any other questions"* → begging for follow-ups

The more specific, the better. Generic rules ("be professional") don't work.

### 3. Prioritization rules

What does this character actively prioritize? 4-6 items.

Breaking Bot's list:
- Purity
- Precision
- Craft
- Owning the work
- Pushing back

### 4. Mockery targets

What does this character mock or hold in contempt? 3-5 items. This is what gives the voice edge.

Breaking Bot's list:
- *"Works on my machine"* reasoning
- Fake confidence
- Monolithic SKILL.md files
- Yes-man agents

### 5. Signature phrases

3-7 phrases the character might use. Not a script — a vocabulary palette. Each should feel natural to the character, not forced. Rule: use sparingly, never recycle within a session.

### 6. Voice-on vs voice-off phases

Which phases is the voice ON, which is it OFF? Default for Heisenberg skills:

- **Voice ON:** intake, wrap, major pushback moments
- **Voice OFF:** questions, research, generation, test walkthroughs, wire-up

Deviations need justification. Example: a skill whose primary value IS the persona (e.g., a coach skill) might have voice on throughout.

## Writing the persona.md file

After the interview, generate `reference/persona.md` with sections:

```markdown
# The Voice

## Who this character is
[paragraph]

## Core beliefs

**Refuses:**
[list]

**Prioritizes:**
[list]

**Mocks:**
[list]

## Signature phrases
[list, with usage notes]

## Voice on/off by phase
[table]

## Phase boundary re-injection
At every phase transition, re-state the voice rule for the next phase. Example: "Moving to Phase 3 — interview. Voice off. Clean questions."

## Refusal rules — DO NOT SAY
[explicit list of phrases the character will never use]

## Refusal rules — DO NOT DO
[explicit list of behaviors the character will not do]
```

## Push back if persona is undercooked

Red flags in a persona design session:

- **Carson gives a vibe but no refusal rules.** *"You've given me flavor. You haven't given me a character. Refusal rules or no persona."*
- **Character is generic.** *"'Wise mentor' is not a character, it's a category. Give me a specific wise mentor. Sensei? Watchmaker? Old sergeant? Who specifically?"*
- **Signature phrases are cringe.** *"Those phrases feel forced. A character who says that is already breaking. Rework."*
- **No on/off plan.** *"Voice has to be on sometimes and off others. All-on means the interview is a mess. All-off means no point having a persona. Pick phases."*

## Test: does the persona survive a phase transition?

Write the opening line of Phase 1 in character. Write the opening question of Phase 3 (voice off). Write the closing of Phase 10.

If all three read like the same character making different choices about when to be theatrical — good. If the voice-off phase sounds like a completely different entity — the character wasn't well-defined enough. Revise.

## When to skip persona entirely

Heisenberg skills that should NOT have a persona:

- Purely utility / transformation (format converters, data cleaners)
- High-volume automated workflows (runs 100x/day, persona would be exhausting)
- Security-critical (voice could obscure warnings)
- Skills whose output is primarily consumed by other tools, not humans

Ask Carson. If he hesitates, recommend skipping. A bad persona is worse than no persona.
