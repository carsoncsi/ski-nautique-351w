# Reflection — Run 2026-06-11 (comprehensive audit + upgrade)

## What happened

Carson requested a full audit of Breaking Bot itself (~4 months after build). Three parallel audit lenses + a second manual pass found: dead template links shipped in every `learns:true` cook, a feature-count claim ("18+1") contradicted by the checklist's own body in 8 places, SKILL.md ~35% over its own 3k-token cap, zero dogfood sections in the meta-skill, Python scripts in a JS-stack environment, and a prose-only enforcement of audit-mode's read-only contract.

## Candidate lessons

### C1 — Generated links must be verified against generated files
- **Trigger:** Any cook or template edit that adds a markdown link in a `.tmpl` or generated SKILL.md
- **Action:** Before shipping, resolve every link in the generated skill against the files actually created; prune or create — never ship a link to a file the scaffold doesn't produce
- **Evidence:** 2026-06-11 audit — `learning-loop.md`, `frameworks.md`, `examples.md`, `learning-audit.py` linked in templates but never scaffolded; every learning-enabled cook shipped dead links
- **Confidence:** 1/1

### C2 — Derived counts must never be hardcoded as prose
- **Trigger:** Stating a count ("19 features", "15 required") anywhere outside the checklist that defines it
- **Action:** Re-count from the source-of-truth file at edit time; prefer pointing at the checklist over restating numbers
- **Evidence:** 2026-06-11 audit — "18 required + 1 conditional" was wrong (actual: 15+4) and repeated in 8 locations; checklist body contradicted its own header
- **Confidence:** 1/1

### C3 — Check the cap after every SKILL.md edit session
- **Trigger:** Any edit to Breaking Bot's own SKILL.md (or a generated one)
- **Action:** `wc -c SKILL.md` — body ÷ 4 must stay ≈ ≤3,000 tokens; trim duplication-with-reference-files first
- **Evidence:** 2026-06-11 audit — cap violated (~4.1k tokens) unnoticed for months; the violations were pure duplication of linked reference files
- **Confidence:** 1/1
