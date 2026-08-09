# R4 — Findings Template

The structure every research-findings draft follows. Used in R4 (synthesis) and serves as the input to R5 (verification).

## Full template

```markdown
# Research Findings — [topic]

## Pinned Goal
[verbatim from R1 scope — no paraphrasing]

## TL;DR
- [finding 1] [citation-anchor]
- [finding 2]
- [finding 3]
- [finding 4]
- [finding 5]

## [Theme 1] — findings

### Q1 — [question verbatim from scope]
[Finding text. Clear, concise.]

**Sources:** [inline citations with URLs]

### Q2 — [question]
[finding]

...continue through all scoped questions...

## [Theme 2] — findings
...

## Conflicts Between Sources
- **[Source A says X, Source B says not-X]** — [brief description of conflict, proposed resolution or flagged as open]
- ...

## Honest Uncertainty
- [Area where evidence is thin] — [what evidence exists, what's missing, recommendation]
- ...

## What Surprised Me
Findings that challenge the current plan or common assumption:
- [surprising finding] — [why it's surprising, what it might change]
- ...

## Concrete Recommendations [for the plan]
Ranked by expected impact:
1. **[recommendation]** — [why, citing finding]
2. ...

## Sources
- [URL 1](url) — [one-line description of what it contributed]
- [URL 2](url) — ...
- ...
```

## Rules for every finding

- **Cite inline.** Every factual claim has a URL next to it.
- **Be specific.** "Some sources say X" is not a finding. "Anthropic's docs explicitly say X [link]" is.
- **Quote when the wording matters.** Especially for hard rules or technical constraints.
- **Flag folklore.** If evidence comes from a blog post or forum thread, say so.

## Rules for the conflicts section

- Never hide conflicts to make the draft look cleaner
- State each side with its source
- Propose a resolution if one is clear
- If the resolution is "defer to Carson," say that explicitly

## Rules for honest uncertainty

- This section is mandatory. Every draft has uncertainty somewhere.
- Empty uncertainty sections are red flags — either the research was shallow or you're hiding weaknesses.
- Be specific: what question is under-evidenced, what evidence exists, what's missing.

## Rules for "What Surprised Me"

- This is where the real value often lives
- Findings that CHANGE the plan belong here
- If nothing surprised you, either the plan was already perfect (rare) or you didn't dig deep enough

## Length guidelines

- Small scope (3-5 Qs): 800-1500 words
- Medium scope (6-10 Qs): 1500-2500 words
- Large scope (10+ Qs): 2500-4000 words, consider splitting into separate drafts

If a draft is longer than ~4000 words, it's too big for effective R5 review. Split it.

## Sub-agent prompt structure (for R2/R3)

When dispatching a sub-agent to search, the prompt follows this structure:

```
I'm researching [topic] for [goal]. Be thorough — this research will drive architecture decisions.

## Pinned goal
[verbatim]

## Your slice of questions
[numbered list, each with a stable question_id]

## Sources to prioritize
[ranked list with URLs where applicable]

## Output format
Return schema-validated JSON (the worker schema below) — one finding object per question.
Bias toward specificity. Every finding carries a citation. Flag folklore as folklore in `source_type`.
```

### Worker output schema (structured, not prose)

R2/R3 workers return **schema-validated JSON** — not free text. This makes the citation
rule and the folklore flag *structural* (the worker can't quietly skip them), makes collation
deterministic, and lets the orchestrator drop any finding with no anchor before it reaches R4.
Audit-mode already eats this dog food; research mode does too.

```json
{
  "findings": [{
    "question_id": "<stable id from the scope>",
    "finding": "<one specific, cited claim — not 'some sources say X'>",
    "sources": [{ "url": "<url>", "type": "canonical | adjacent | folklore" }],
    "confidence": "high | medium | low",
    "conflicts_noted": "<other findings/sources this contradicts, or empty>"
  }]
}
```

The orchestrator collates validated objects into the R4 markdown draft below. **The schema is
the worker→orchestrator wire format only** — the R4 draft *shown to Carson at R5* stays prose
(he reads it as a narrative, not JSON). A finding whose `sources` is empty is dropped at collation
(the same evidence gate audit-mode uses), and the drop count is noted.

Sub-agents return focused findings. Main context synthesizes multiple sub-agent outputs into the consolidated R4 draft.

## After the draft is written

Save as `research/R4-findings-[date].md`. This is the primary artifact of the research round — the thing shown to Carson at R5.

If the research is part of Breaking Bot's own build, save to `~/.claude/skills/breaking-bot/.research/R4-findings-[date].md` so future instances can refer back.

If the research is for a skill being cooked, save to the target skill's `reference/sources/research-[date].md` or similar.
