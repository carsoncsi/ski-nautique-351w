# Elite Features Checklist

The 19 features every Heisenberg-mode skill MUST ship with (15 required + 4 conditional — the conditional ones are #12, #14, #15, #19). Required ones are not optional. Breaking Bot audits against this list in Phase 8.

Organized by category. Each entry: what it is, why it exists, how to bake it in.

---

## Quality Infrastructure

### 1. Failure mode section
**What:** A section in SKILL.md or `reference/gotchas.md` declaring how the skill breaks. How to recognize failure. What to do.
**Why:** Prevents silent bad output. The user can distinguish "skill succeeded" from "skill ran and produced garbage that looks like success."
**How:** During interview, ask Carson: *"how does this fail, and how would you know?"* Bake the answers into `reference/gotchas.md` as the Failure Modes section.

### 2. Gotchas section (formerly "anti-pattern library")
**What:** Real problems encountered using this skill. Anti-patterns to avoid. Traps that looked like the right move.
**Why:** Anthropic explicitly calls this "the most valuable content in any skill." Pre-loaded with category-specific traps from skill-taxonomy.md, grows via the Learning Loop.
**How:** Generate initial gotchas from the skill's category. Add Carson's contributed gotchas from interview. File at `reference/gotchas.md`.

### 3. Learning Loop
**What:** The skill reflects on its runs, proposes lessons, and (with approval) updates its own `lessons.md` over time. Full spec in `learning-loop-architecture.md`.
**Why:** Skills that don't learn stay at their starting competence. Skills that learn get sharper with use.
**How:** Generate the `scratch/reflections/` directory, `reference/lessons.md`, and the reflection protocol. Opt-in per skill (`learns: true` in frontmatter, default false).

### 4. Context budget declaration
**What:** `context_cost: low | medium | heavy` in frontmatter. Rough estimate of invocation tokens.
**Why:** Callers can make informed chaining decisions. Carson can see at a glance which skills are expensive.
**How:** Measure or estimate during generation. Add to frontmatter. Novel convention — we're inventing it.

---

## Input / Output Contracts

### 5. Input pre-flight validation
**What:** The skill checks its inputs before doing expensive work.
**Why:** Catch malformed input at the door, not after 3 minutes of processing.
**How:** First action in the SKILL.md workflow is "validate inputs." For Heisenberg skills, write this check in a script (`scripts/validate.js`, Node) so code doesn't pollute context.

### 6. Declared output contract
**What:** A clear statement of what the skill produces. Shape: markdown? files? JSON? conversation text?
**Why:** Other skills (and Carson) can chain into this one with confidence.
**How:** Top-of-SKILL.md "Output" section. One sentence. Example: *"Writes `research-findings.md` to current directory. Prints a one-paragraph summary to conversation."*

### 7. Dependency declaration
**What:** What this skill needs to exist before it runs. Files, other skills, env vars, tools.
**Why:** Fail at the door with a clear message instead of crashing mid-run.
**How:** `## Dependencies` section in SKILL.md. Breaking Bot checks these at generation time and includes a validation script.

### 8. Trigger phrase list
**What:** Explicit list of phrases the user might type that should activate this skill.
**Why:** Auto-invocation rate without explicit triggers is ~10%. With them, near-universal.
**How:** Front-load the description frontmatter with trigger phrases: *"Use when Carson says X, Y, Z, or /slug."* Include 4-6 realistic trigger phrases.

### 9. "When NOT to use" section
**What:** Explicit anti-triggers. *"Don't use this skill for X."*
**Why:** Reduces spurious triggering. Prevents the skill getting pulled into the wrong jobs.
**How:** Section in SKILL.md right after the description. 3-5 anti-use cases.

---

## Ecosystem Integration

### 10. Progressive disclosure structure
**What:** SKILL.md ≤3k tokens. Detail in `reference/` subdirectory, one level deep. Each reference file has a TOC at top if >100 lines.
**Why:** Most evidence-backed pattern in the Claude Code ecosystem. 40% token reduction, 15-20% accuracy gain.
**How:** Enforced by Breaking Bot's generation process. Any content over threshold gets split out automatically.

### 11. Workflow embedding map
**What:** A section in SKILL.md describing where this skill fits in Carson's day. What triggers it. What comes before / after.
**Why:** Skills without this become orphaned — Carson forgets they exist. Embedding maps make the skill part of a routine.
**How:** Section: `## Workflow Embedding`. Generated from the interview's workflow questions.

### 12. Cross-skill data contracts
**What:** Declared files the skill writes that other skills might read. E.g., `.claude/research/<topic>.md` — which `/log-research` consumes.
**Why:** Lets the ecosystem cohere. Skills talk to each other through declared contracts, not accidental side effects.
**How:** Section: `## Data Contracts`. Only if relevant (conditional — not every skill has cross-skill contracts).

### 13. Cold-start example
**What:** One ready-to-run invocation in the skill's README or SKILL.md. Carson can paste it and see the skill work in 30 seconds.
**Why:** The first real invocation is the hardest. A cold-start example removes friction.
**How:** `## Cold Start` section. Example: *"Try it: `/data-model build 'forecast Q3 sales'`"*

---

## Evolution & Trust

### 14. CHANGELOG.md (conditional)
**What:** A per-skill changelog. Why you changed it, when.
**Why:** Prevents "why did I change this" amnesia. Critical for skills shared across teams.
**How:** Conditional — only for skills Carson explicitly marks as multi-team or widely-used. Overkill for solo skills.

### 15. Knowledge recency stamp (conditional)
**What:** `knowledge_last_refreshed: YYYY-MM-DD` in the skill.
**Why:** Knowledge-heavy skills go stale. The stamp prompts periodic review.
**How:** Conditional — only for skills with baked-in knowledge bases that reference time-sensitive information.

### 16. Voice stability note
**What:** A voice-per-phase mapping in the skill: which phases voice is on, which phases it's off, what the voice refuses.
**Why:** Persona drift is architectural. Re-injection at phase boundaries is the fix.
**How:** Required for persona skills. `reference/persona.md` loaded only at on-voice phases. Breaking Bot itself is the reference implementation.

---

## Meta-Features

### 17. "Teach me" mode
**What:** Invoking the skill with no args triggers self-explanation. *"What can you do?"* → the skill explains itself in 30 seconds.
**Why:** Great for skills with deep knowledge bases. Lowers the discovery cost.
**How:** In the skill's workflow, first step is "if no args, run teach-me mode" which reads the CHARTER + a one-paragraph intro.

### 18. Test-invocation walkthrough
**What:** Breaking Bot (during Phase 8) proposes 2-3 realistic invocations and mentally walks each one. The skill ships with the walkthrough saved as `reference/walkthroughs.md`.
**Why:** Surfaces holes before first real use. Cheap thought experiment with real catches.
**How:** Phase 8 of the cook. Carson reviews. Revisions happen before ship.

---

## Human-in-the-Loop

### 19. Gate Schema (conditional)
**What:** Every human-approval gate renders the fixed decision block from `~/.claude/skills/_shared/gate-schema.md` — `summary / what_changed / evidence / gaps / strongest_objection / limits_hit / recommendation` — before asking the user to decide.
**Why:** Makes the gate the unit of quality instead of the instance. Forces gaps, limits, and the strongest counter-argument to the surface every time, regardless of which Claude instance is driving. The two evidence-based antidotes to automation bias (reasoning transparency + forced dissent) baked into a fixed shape, plus `limits_hit` so polished partial work can't be approved as complete.
**How:** Conditional — only for skills with human-approval gates (interview-driven, planning, or any skill where the user authorizes irreversible steps). A frictionless "just do it" skill with no gates doesn't need it. For gated skills: reference the shared doc, apply the schema at hard gates only (irreversible / high-blast-radius moments), and leave reversible mechanical steps ungated to avoid approval fatigue. `gaps` and `limits_hit` are non-negotiable fields.

---

## The Pushback Knob

Not on the numbered list above, but required. Every skill declares its pushback calibration:

- **Refuse** — malformed input gets rejected, no action taken
- **Warn then proceed** — flag issues, proceed with user acknowledgment
- **Just do it** — execute without friction

Set once during interview. Declared in frontmatter or top of SKILL.md. Matches the skill's risk profile (destructive skills lean "refuse"; low-risk lean "just do it").

---

## How Breaking Bot uses this list

During Phase 6 (Generate), Breaking Bot:
1. Walks the 19 features in order
2. For each required feature, bakes in the corresponding section/file
3. For each conditional feature (12, 14, 15, 19), asks Carson or infers from interview
4. For each file generated, confirms the content is specific to this skill, not generic

During Phase 8 (Test walkthrough), Breaking Bot:
1. Runs through each feature on the actual generated skill
2. Flags any feature that's present-but-hollow (e.g., a Failure Modes section with generic content)
3. Prompts Carson to revise or accept

The checklist is the quality floor. Above the floor, skills differ by how well their domain-specific knowledge + purity standards fit their mission.
