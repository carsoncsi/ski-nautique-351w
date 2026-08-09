# Workflow Embedding

How the skill fits into Carson's day. Used in Phase 3 Section G. This is where skills stop being orphaned and start being part of a routine.

## The embedding question

A skill that isn't embedded is invisible. Carson forgets it exists. It rots. The embedding map answers: *when does this get invoked, and what's around it?*

## Questions to work through

### 1. Triggers
What phrases activate this skill? 4-6 minimum.

- Explicit: `/slug`
- Semantic: phrases Carson might naturally say ("audit my deploys," "review this PR," "cook a data model")
- Category: phrases that describe the type of work without naming the skill

Feed these into the SKILL.md frontmatter description. Use the pattern:

> Use when Carson says "X", "/slug", "Y", or describes a workflow for Z.

### 2. Anti-triggers
When should this NOT fire? 2-4 cases. These go in the "When NOT to use" section.

Example (for a research skill): *"Don't use this skill for quick lookups — use WebSearch. This skill is for multi-source synthesis."*

### 3. Chain-in (what comes before)
What's Carson usually doing right before he reaches for this skill?

- Finishing another skill's output?
- Starting a new project?
- Hitting a specific error or decision?
- End-of-day / start-of-day?

This informs the skill's expected context.

### 4. Chain-out (what comes after)
What does Carson usually do after this skill completes?

- Run another skill?
- Manually review output?
- Commit and push?
- Move to a different task?

If there's a canonical next step, mention it in the skill's wrap message: *"Output in `research-findings.md`. Usually next step is `/decide` to lock in the architectural call."*

### 5. Time of day / session phase
Is this a start-of-session skill? End-of-session? Middle-of-work? Situational?

Maps loosely to:
- Start: `/onboard`
- End: `/wrap-up`
- Mid-work: most feature skills
- Situational: auditors, researchers, debuggers

### 6. Frequency
How often does Carson expect to invoke this?

- Daily
- Weekly
- Per-project (a few times, then done)
- On-incident (rare, but important when needed)

This affects:
- Whether Learning Loop is worth it (low frequency → probably not)
- Whether cache stability matters urgently (high frequency → yes)
- Whether CHANGELOG is worth maintaining (rare → no)

## Data contracts (cross-skill integration)

### Does this skill read files other skills wrote?

Common patterns:
- Reads `.claude/context/*.md` (written by claudefather or manually)
- Reads `.claude/research/*.md` (written by `/log-research`)
- Reads `.claude/context/decisions.md` (written by `/decide`)
- Reads `HANDOFF.md` (written by `/wrap-up`)

Declare explicitly. If this skill breaks when a dependency file is missing, that's a dependency declaration issue.

### Does this skill write files other skills read?

Common patterns:
- Writes `.claude/research/<topic>.md` — consumable by `/log-research`
- Writes `.claude/context/*.md` — consumable by `/audit-context`
- Writes `research-findings.md` at repo root — consumed by Carson, maybe by follow-up skills

Declare these as **data contracts** in SKILL.md:

```markdown
## Data Contracts

This skill WRITES:
- `research-findings.md` — structured findings doc (format documented in reference/output-format.md)

This skill READS:
- `.claude/context/business.md` — business constraints
- `.claude/research/<topic>.md` — prior research on the topic
```

## Workflow embedding map in SKILL.md

Every Heisenberg skill gets this section:

```markdown
## Workflow Embedding

**Invoke when:** [list of situations]
**Don't invoke when:** [2-4 anti-cases]

**Before this skill:** [common preceding actions]
**After this skill:** [common follow-ups]

**Frequency:** [daily/weekly/per-project/on-incident]

**Chains with:**
- `/skill-A` → feeds output here
- Output consumed by `/skill-B`
```

This is prose Carson can read in 30 seconds and remember the skill's place in the ecosystem.

## Registration in CLAUDE.md

After the skill is built, Breaking Bot updates the project's (or user's) `CLAUDE.md`:

```markdown
### Project-Specific Skills (or Universal Skills)
- `/slug` — [one-line purpose] [trigger hint]
```

For global skills, update `~/.claude/CLAUDE.md` or memory index. For project skills, update `./CLAUDE.md`.

## Push back when embedding is undercooked

- **No triggers.** *"If the only way to invoke this is `/slug` explicitly, it'll activate 10% of the time. Give me 4 natural phrases you might say."*
- **No failure pattern.** *"When does this not fire? If you can't name it, we're going to have this pulled into wrong jobs."*
- **No chain-in/chain-out awareness.** *"Where does this live in your day? If you can't tell me what comes before and after, it'll get orphaned."*
- **Unclear data contracts.** *"You said this reads `.claude/research/`. Who writes there? If nothing writes there yet, that's a build-order problem."*

## Embedding as a durability feature

Skills with strong embedding survive context changes, session boundaries, and Carson's memory lapses. Skills without it die quietly.

Embedding is cheap to do at build time and expensive to add retroactively (you have to remind Carson the skill exists). Do it now.
