# Knowledge Base Intake & Digestion Pipeline

How to take source material (books, papers, URLs, notes) and turn it into context-efficient reference files inside the skill being cooked. Used when Phase 3 Section D surfaced a knowledge base.

## Hard rules (from research)

1. **Two-level hierarchy max.** SKILL.md → one reference file. No deeper. Claude `head -100`'s files it's not sure about, so nesting loses content.
2. **TOC at the top of any file >100 lines.** Partial reads still get structure.
3. **Raw source goes in `reference/sources/` — NEVER auto-loaded.** Archive only.
4. **Deterministic lookups move to scripts.** Glossary queries, "which file covers X" routing, anything mechanical. Scripts run via bash; code doesn't enter context, only output does.
5. **Show Carson each digested chunk before sealing.** No silent digestion. Verification is the quality gate.

## Intake — get the sources

Ask Carson specifically:

> Point me at the sources. Could be:
>
> - PDF paths on your machine
> - URLs I can fetch
> - Text you paste into the conversation
> - Notes files in `~/notes/` or elsewhere
>
> Give me paths or content. For each source, also tell me: what's it for? What expertise does it contain?

Collect:
- Source list with paths/URLs
- Per-source purpose
- Any metadata (author, date, domain)

## Digestion protocol

### Step 1 — Scope the digest

For each source, ask Carson:

> What do you want this skill to learn from <source>?
>
> - Specific chapters / sections?
> - All of it, but only practical parts?
> - Just the decision frameworks?
> - Just the worked examples?

This prevents wasted work on irrelevant material.

### Step 2 — Chunk the source

Read the source in meaningful chunks:

- **Books:** chapter by chapter, or by section if chapters are long
- **Papers:** by section (abstract, methods, results, discussion), or by major argument
- **URLs:** the full page; if long, by H1 sections
- **Notes:** by topical grouping

**Token budget per chunk: ~3-5k tokens read at a time.** Larger chunks blow context; smaller chunks lose coherence.

### Step 3 — Extract per chunk

For each chunk, produce:

- **Principles:** core laws / rules / assertions. Dense. One-line each.
- **Frameworks:** named mental models with brief explanations (2-4 lines each)
- **Decision trees:** if/then patterns extracted from the text
- **Worked examples:** specific examples the author used, preserved with minimal paraphrasing
- **Glossary:** key terms + definitions
- **Cautions:** things the source warns against

Not every chunk produces content in every category. That's fine — leave empty categories empty.

### Step 4 — Batched review — VERIFICATION GATE

Digest all chunks (or, for a long source, a batch of them), then show Carson the extractions in **one batched review** rendering the Gate Schema (`~/.claude/skills/_shared/gate-schema.md`). Per-chunk gating — one approval per chapter — trains rubber-stamping; batching keeps the gate high-signal. Extraction is per-chunk independent (you pull from the source text, not from prior extractions), so digesting ahead of approval is safe — only the *approval* batches.

> **GATE: Knowledge digestion** — *[Source name], chunks 1-6*
>
> **summary:** Digested 6 chapters of [source]. Extractions below, grouped by chunk.
> **what_changed:** First digestion pass on this source.
> **evidence:** [per-chunk: Principles / Frameworks / Worked examples / Glossary / Cautions]
> **gaps:** Chapters 7-8 (appendices) skipped as not relevant — confirm. Ch.3's framework conflicts with Ch.5's; flagged for your call.
> **strongest_objection:** Ch.4's forecasting model may be too domain-specific to generalize into the skill.
> **limits_hit:** Ch.2 was long; extracted at ~5k-token granularity, may have compressed nuance.
> **recommendation:** Bake chunks 1,2,5,6 as-is; resolve the Ch.3/5 conflict before baking either.

Carson reviews the batch. Per chunk, he can **approve / revise / reject**. Only approved extractions get baked in Step 5.

### Step 5 — Consolidate into reference files

After all chunks are approved, consolidate into flat reference files (two-level rule):

```
reference/
├── principles.md       ← TOC at top if >100 lines
├── frameworks.md       ← TOC at top
├── decision-trees.md   ← if/then patterns
├── examples.md         ← worked examples
└── glossary.md         ← short alphabetized list
```

**No nested directories. No index.md routing layer.** SKILL.md points directly to these files.

If one category has very little content (e.g., only 3 frameworks), merge it into another file rather than creating a tiny file.

### Step 6 — Move deterministic lookups to scripts

After consolidation, look for content that's really a lookup:
- Glossary → could be a script: `node scripts/glossary.js "term"` prints definition
- "Which framework applies to X?" → could be a script: `node scripts/applies.js "X"` returns framework names

Move these. Scripts run, output returns, code never enters context. This is the cheapest knowledge tier.

### Step 7 — Archive raw sources

Copy raw source files to `reference/sources/`:
- PDFs, papers, docs → full files
- URLs → fetched HTML / readable markdown version
- Pasted text → saved as `.md` with Carson's metadata

These are NEVER auto-loaded. They exist for re-verification if a future question isn't answered by the digest. The `sources/README.md` explains:

```markdown
# Sources
Raw source material. NOT auto-loaded. Only read when the digested references are insufficient.

- original-book.pdf — full text
- paper-smith-2023.pdf — original paper
- notes-carson-2026-03.md — Carson's handwritten notes
```

## Knowledge recency stamp

If the knowledge base pulls from sources with potential time-sensitivity (news, evolving best practices, recent research), add to SKILL.md frontmatter:

```yaml
knowledge_last_refreshed: 2026-04-19
```

This is the ONE place a date is allowed in SKILL.md (it's frontmatter, not body — doesn't pollute cache in the same way).

## How much time this takes

Honest estimate: digesting a single book chapter is 10-15 minutes including verification. A full book is 3-6 hours. A paper is 20-30 minutes.

Carson should know this upfront. Don't sell a Heisenberg cook as "quick."

## When knowledge is too big for one digestion session

If the source is massive (full textbook, 200-page reference manual), break it up:

1. Digest the most important chapters first (Carson picks)
2. Ship the skill with partial knowledge
3. Note in `reference/principles.md` which chapters are digested vs. pending
4. Schedule follow-up digestion sessions as needed

Better to ship a skill with 30% of the knowledge well-digested than 100% rushed and lossy.
