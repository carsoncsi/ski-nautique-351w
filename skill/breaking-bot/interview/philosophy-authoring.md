# Philosophy Authoring

How to write the `philosophy.md` file for a Heisenberg-mode skill. Used in Phase 3 Section E.

## What philosophy IS

The principles the skill will not violate. Stable values that guide decisions when the instructions don't cover a specific case. Short. Opinionated. Earned.

## What philosophy is NOT

- Instructions (those go in SKILL.md)
- Knowledge (that goes in `reference/principles.md`)
- Persona / voice (that goes in `reference/persona.md`)
- Feature list (that's `reference/elite-features-checklist.md`)
- Vague feel-good statements ("we value quality")

## Structure

Every `philosophy.md` has three sections:

### 1. Principles

3-7 principles. Each one:
- **One-line statement** (the rule)
- **Why it exists** (the reasoning, 1-3 lines)
- **What it means in practice** (concrete examples of honoring it, 1-2 lines)

Example (for Breaking Bot itself):

> **Purity over speed.** A skill that works 60% of the time fast is worse than one that works 99% of the time with more setup. We optimize for the second.
> *Why:* Skills get invoked over months. The compounding cost of unreliable output exceeds the one-time cost of building something solid.
> *In practice:* We run the full 6-phase research protocol even when it feels slow. We don't skip verification gates. We don't ship without test walkthroughs.

### 2. Hard rules

4-6 non-negotiables. One-line each, no explanation needed if the rule is self-evident. These are the lines that cannot be crossed. Example:

- Never bake research without a verification gate
- Never silently modify CHARTER.md
- Never ship a skill without at least one cold-start example
- Never put timestamps in SKILL.md body

### 3. Trade-offs accepted

2-4 things the skill deliberately gives up to maintain the above. Be honest.

Example:

> **Time for craft.** Breaking Bot takes longer than `/build-skill`. We accept this because the output quality justifies it.
> **Complexity for elite output.** A Heisenberg skill ships with more files than a basic skill. We accept this because they earn their place.

## Where philosophy comes from

Three sources, in order of authority:

1. **Explicit Carson guidance during the interview.** If he says "never do X," that's a principle.
2. **The mission and non-goals from CHARTER.md.** Philosophy should be consistent with charter.
3. **Category-specific principles from `reference/skill-taxonomy.md`.** Each category has standard principles (generators honor idempotency; auditors honor severity differentiation; etc.).

Draft the philosophy, show Carson, revise until he says *"yes, these are the lines."*

## How philosophy is used at runtime

The skill reads `philosophy.md` only when:

- It hits a decision point the instructions don't explicitly cover
- It's considering a Learning Loop lesson that might conflict with principles
- Carson asks *"why did you do X?"* and the answer is in the principles

It's NOT loaded on every invocation. That would burn context for no reason. It's a reference file, loaded on demand.

## Pushback patterns during philosophy authoring

- **Generic principles.** *"'Quality matters' isn't a principle, it's a banner. What specifically does this skill value that another wouldn't?"*
- **Principles with no tradeoff.** *"If this principle doesn't cost you anything, it's not a principle, it's free. Name what it costs."*
- **Too many principles.** *"Seven max. You can't remember more than seven. Neither can the skill."*
- **Principles that contradict CHARTER.** *"Your charter says X is a non-goal, but this principle pushes toward X. Reconcile or cut one."*

## Philosophy and the Learning Loop

The philosophy file does NOT learn. It's human-curated. The Learning Loop can surface patterns that test the philosophy — *"we seem to be violating principle 3 in 4 recent runs, do you want to revise?"* — but it cannot silently modify.

Updates to philosophy are explicit Carson decisions, committed to git like any other important change.

## Template

Use `templates/heisenberg/reference/philosophy.md.tmpl` as the starting point. Fill in from the interview. Show Carson. Revise.
