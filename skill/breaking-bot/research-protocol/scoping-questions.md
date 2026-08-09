# R1 — Scoping Template

Used in Phase 5 R1 of the cook. Output is an approved scope that Carson signs off on before any searching begins.

## Scope document structure

Every scope has these sections:

### Pinned Goal

One paragraph. The mission the research serves. Copy verbatim from Phase 1 brief. **Do not paraphrase** — drift starts here.

### Questions the Research MUST Answer

Numbered list, 5-15 questions. Each question should be:
- Specific enough to answer with evidence
- Not answerable from existing context (if it is, drop it)
- Connected to the pinned goal

Bad question: *"What are best practices for X?"* — too vague
Good question: *"What's the documented token budget for Claude Code SKILL.md bodies, and what happens when it's exceeded?"* — specific, evidence-oriented

Group questions thematically if there are many (e.g., "Skill design fundamentals" / "Persona patterns" / "Anti-patterns").

### Out of Scope

Explicit exclusions. 3-6 items. Prevents scope creep during search.

Examples:
- Non-Claude agent systems (OpenAI, Gemini) unless they inform Claude-specific patterns
- UI/frontend patterns (we're researching skill design, not interfaces)
- Specific book/paper content (only relevant when a real invocation happens)

### Sources to Prioritize

Ranked list. Canonical sources first, adjacent sources second, folklore last. Examples:
1. Anthropic official docs (canonical)
2. Anthropic engineering blog posts
3. Anthropic-maintained example repos
4. High-signal community blogs (Simon Willison, Hamel Husain, Eugene Yan)
5. Academic papers if directly relevant
6. Community forum threads (use with caution, flag as folklore)

### Verification Approach

How R5 will check the findings. Short. Example:

> Findings draft will pin the goal at top. Every finding will cite its source with a URL. Conflicts between sources called out explicitly. Honest uncertainty sections where evidence is thin. Draft shown to Carson for sign-off before any baking.

## The approval question

After drafting, present to Carson:

> Here's the scope. Three things to confirm:
>
> 1. **Questions** — do these cover what you need? Anything missing? Anything to cut?
> 2. **Out-of-scope** — anything here you actually DO want included?
> 3. **Sources** — any sources you want to prioritize that I missed?
>
> Approve, redline, or expand. Once we lock scope, we search.

Wait for Carson's response. Revise if needed. **Do not proceed to R2 until scope is explicitly approved.**

## Scope sizing

- **Small scope:** 3-5 questions, 1-2 domains. Single sub-agent or main-context search. Under 30 minutes of research time.
- **Medium scope:** 6-10 questions, 2-3 domains. Parallel sub-agents. 1-2 hours.
- **Large scope:** 10+ questions, multiple domains. Multi-track parallel sub-agents. Multiple R5 gates possible. 2+ hours.

If scope grows past 15 questions, split into multiple rounds. Run R1-R5 twice, not one massive round that becomes unreviewable.

## Red flags during scope review

Push back if Carson:

- **Wants answers without questions.** *"I just want to research the area." → "No. Specific questions or we don't search. Otherwise R5 has nothing to check against."*
- **Scope is too broad.** *"That's 30 questions across 7 domains. We split this into rounds or we lose R5."*
- **Questions are already answerable.** *"This is in the docs I already read. We don't need a search for this — read the doc."*
- **No out-of-scope.** *"Everything is in scope? Then nothing is prioritized. Pick what we're NOT researching."*

## Template fill-in

```markdown
# R1 — Research Scope

## Pinned Goal
[verbatim from brief]

## Questions the research MUST answer

**[Theme 1]**
1. [specific question]
2. [specific question]

**[Theme 2]**
3. [specific question]
...

## Out of scope
- [exclusion 1]
- [exclusion 2]
- [exclusion 3]

## Sources to prioritize
1. [canonical source]
2. [adjacent source]
...

## Verification approach
[short paragraph on how R5 will check this]

---

**Approve this scope, or redline?**
```

Once approved, save the scope as `research/R1-scope.md` for reference during later phases.
