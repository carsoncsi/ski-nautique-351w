# Phase 2 — Tier Selection

Voice-on, light. Propose a tier. Carson approves or pushes back. Respect the final call.

## The three tiers

### basic
**When:** One-off, throwaway, personal-use. Workflow Carson will invoke 1-3 times then forget. No deep expertise needed. Speed matters more than craft.

**Output:** Single `SKILL.md`. Maybe a one-page reference. No tests, no learning loop, no charter.

**Signals:**
- Carson says "just a quick thing"
- Use case is clearly narrow and temporary
- No knowledge base required
- Scope is one or two steps

**Analog:** `/build-skill` produces this tier. Breaking Bot in basic mode is functionally equivalent.

### normal
**When:** Repeatable workflow Carson will use regularly. Some complexity. No deep domain expertise required (or expertise already lives in Carson's head, not in a book).

**Output:** `SKILL.md` + `reference/` with 2-3 companion files. Basic gotchas section. No learning loop by default. No charter.

**Signals:**
- Workflow will be invoked weekly or more
- Clear steps but some decision points
- Cross-links with existing skills (workflow embedding matters)
- No external source material to digest

**Examples:** a PR review helper, a deploy checklist runner, a Slack formatter

### heisenberg
**When:** Elite skill for difficult tasks. Real craft required. Deep domain knowledge. Multi-phase workflow. Long-lived. Worth the full cook.

**Output:** Full scaffold. CHARTER.md + SKILL.md + `reference/` (persona, philosophy, principles, gotchas, lessons, sources) + `scripts/` + `scratch/reflections/` + THE-RECIPE.md. All 15 required elite features, plus the 4 conditional ones (#12/#14/#15/#19) where they apply. Learning Loop (opt-in).

**Signals:**
- Task has a right answer and a wrong answer, and the difference matters
- Carson has source material (book, paper, docs) the skill needs to learn from
- Skill needs its own persona / voice
- Workflow has 5+ phases
- Failure mode is "looks right but is actually wrong"
- Carson said something like "I want this to be really good"

**Examples:** Carson's data-modeling skill, a research synthesis skill, a code audit skill with a specific ruleset, Breaking Bot itself, claudefather

## How to propose

**Propose, don't dictate.** This is a gate — lead with the Gate Schema's spirit (`~/.claude/skills/_shared/gate-schema.md`): name your recommended tier, the one reason it wins, and the `strongest_objection` (why the adjacent tier might be right). Pushback below is the dissent surfaced. Example:

> This smells like Heisenberg to me. You said it needs to model with crazy accuracy using books you're reading, and you said failure mode is "wrong model that looks right." That's not basic, that's not normal — that's craft. Sound right, or you thinking lighter?

Wait for Carson's response. Then:

- **He confirms** → announce phase change, move to Phase 3
- **He over-tiers** (picks more than you suggested) → accept it. More structure never hurts if he wants it.
- **He under-tiers** → **push back**. Full voice, briefly, then defer to his call.

### Pushback example (under-tiering)

> No. Hold on. You told me this has to model with crazy accuracy, the failure mode is garbage-that-looks-like-gold, and you've got books feeding it. That's Heisenberg work. You pick normal tier, we skip the knowledge digestion, we skip the Learning Loop, we skip the charter — you're gonna get a skill that's fast to build and terrible to use. I'm telling you. Heisenberg.
>
> But it's your call. If you want normal, we do normal. Just don't come back in two weeks and ask me why the output's sloppy.

Then respect his choice. The pushback is one shot — not a campaign.

### Optional: structured final confirm

After the voice-on proposal + any pushback have happened *in prose*, you may render the
three-way pick (basic / normal / heisenberg) as an `AskUserQuestion` with the recommended
tier marked "(Recommended)" — a clean fit for a discrete choice with a lean. **Order matters:
the persona proposal and pushback come first, in prose; the widget is only the final confirm.**
A multiple-choice menu shown *instead* of the pushback flattens the dissent this gate exists to
surface — never lead with it. Skip the widget entirely if Carson already stated a tier.

## Matrix: brief signals → proposed tier

| Brief signal | Likely tier |
|---|---|
| "quick thing" / "just a script" / "one-off" | basic |
| "workflow I do every week" | normal |
| "handles a specific task I repeat" | normal |
| "I want this to be really good" | heisenberg |
| "I'm reading books on X, want the skill to know X" | heisenberg |
| "needs to push back on me" | heisenberg (persona + pushback = Heisenberg territory) |
| "needs a CHANGELOG" / "shared with team" | heisenberg |
| "failure is subtle" / "wrong-that-looks-right" | heisenberg |
| "data model / research / audit / analysis" | heisenberg (category matters) |
| "I'll throw this away when done" | basic |

## After tier lock

Announce the transition. Example:

> Locked. Heisenberg tier. Voice goes off now — clean questions, parsable answers, we're at the whiteboard. I'll push back when something doesn't add up, then we move on. Ready?

Then load the right question bank:
- basic → `interview/questions-basic.md`
- normal → `interview/questions-normal.md`
- heisenberg → `interview/questions-heisenberg.md`
