# Purity Standards

What "elite" means for a skill Breaking Bot cooks. The 99.1% mark.

## The purity principle

Every skill has a purity standard — the specific, measurable criteria that distinguish *this skill doing its job* from *this skill producing noise that looks like its job*.

Purity is NOT:
- A vibe
- "Feels good"
- "Passes type-check" (that's compilation, not purity)
- A generic checklist

Purity IS:
- Skill-specific criteria derived from the mission
- Measurable or inspectable
- Something the skill can self-check against at the end of its run
- The answer to *"how do we know this wasn't garbage?"*

## Universal acceptance criteria (every elite skill)

These apply regardless of category. Breaking Bot enforces these during Phase 8 (test walkthrough):

1. **Trigger reliability.** The skill activates when it should, doesn't when it shouldn't. Test with 3 on-target invocations and 2 off-target — expect >=90% correct.
2. **Input pre-flight.** Given malformed input, the skill refuses or warns before doing expensive work.
3. **Output contract honored.** The declared output shape (markdown / files / JSON / conversation) is what actually gets produced.
4. **CHARTER invariants respected.** The skill does not violate its own non-goals.
5. **No silent failures.** When the skill can't do its job, it says so loudly. No generic fallback outputs.
6. **Source citations where claimed.** If the skill outputs grounded claims (research, advice), the citation is real and loadable.
7. **Cache stability.** The SKILL.md body is free of timestamps, dynamic content, and order-shuffling. See `cache-stability-contract.md`.
8. **Context budget respected.** SKILL.md + always-loaded refs ≤ declared `context_cost` range.

## Category-specific criteria (from skill-taxonomy.md)

Breaking Bot asks Carson during the interview which category the skill is, then applies category-specific purity:

### Generator
- Output compiles / renders / parses
- No placeholder content in non-placeholder locations
- No files created that weren't requested or implied
- Idiomatic for the target language/framework

### Auditor
- False positive rate < X% on a test set
- Real issues flagged (not just cosmetics)
- Severity differentiation present
- Actionable output (what to do about each finding)

### Interviewer
- Captures nuance, not just surface answers
- Pushes back on weak/vague user input
- Produces structured output that downstream consumers can parse
- One-question-at-a-time rhythm, not batch

### Researcher
- Every claim traced to a source
- Conflicts between sources explicitly called out
- Honest uncertainty declared where evidence is thin
- Verification gate before findings are baked in (if the skill generates artifacts)

### Processor
- Invariants preserved (what was true before is still true after, except for the intended transformation)
- Nothing silently dropped
- Edge cases handled or explicitly reported as unhandled
- Reversibility documented if the transformation is destructive

### Orchestrator
- Artifacts produced themselves pass purity
- No leaky meta-abstractions (the orchestrator's choices don't silently dictate artifact behavior in ways the user didn't choose)
- Clear ownership: orchestrator produces artifacts; artifacts are independent after creation

## Writing purity criteria during the interview

During Phase 3, ask Carson:

> *"How do you know — concretely — if this skill produced garbage vs. gold? Give me three things I could check after the skill runs that would tell me the difference."*

Three things. Specific. Inspectable. That becomes the skill's purity section. Example for a data-model-building skill:

1. Every variable in the output model has a documented source (book, paper, or explicit Carson decision)
2. Model assumptions are listed separately from model conclusions
3. Sensitivity to each input variable is declared (if we changed this, what changes?)

## How the Learning Loop relates to purity

The Learning Loop (`learning-loop-architecture.md`) is the mechanism for the skill getting better at hitting its purity standard over time. Every run, the skill reflects: *did we hit 1, 2, 3? Where did we fall short? What would fix it next time?*

That reflection writes to `scratch/reflections/<run-id>.md` with evidence. When a pattern stabilizes over 3+ runs, it gets surfaced for promotion to `lessons.md`.

Purity standard is the TARGET. Learning Loop is the MECHANISM to approach it.

## The test walkthrough (Phase 8)

Before Breaking Bot wraps, it proposes 2-3 realistic invocations and mentally walks each through against the purity criteria:

1. State the invocation (what Carson types)
2. Trace what the skill would do step by step
3. Check each step against purity criteria
4. Flag any step where the skill would either fail or not know it's failing

If any walkthrough fails, the skill gets revised before ship. This is cheap — it's a thought experiment, not a real run — but it catches a surprising number of holes.

## What "elite" really means

Elite isn't "has many features." Elite is:

- **Knows exactly what it does and doesn't do** (CHARTER.md)
- **Knows how it fails and tells you when it does** (gotchas + failure mode section)
- **Can tell the difference between its own good work and its bad work** (purity criteria)
- **Gets better with use** (Learning Loop)
- **Doesn't waste context** (cache stability, scripts tier, on-demand loading)
- **Pushes back when asked to do the wrong thing** (pushback calibration)

A skill with 18 features and no purity standard is a Swiss Army knife that doesn't know which blade is which. A skill with 3 features and a sharp purity standard is a scalpel.

Ship scalpels.
