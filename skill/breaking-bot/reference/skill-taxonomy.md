# Skill Taxonomy

Most skills fit one of six categories. Knowing the category helps you interview smarter, pick the right template patterns, and set the right purity standard.

## The six categories

### 1. Generator
**Produces artifacts** — code, docs, diagrams, plans, content. Input: a spec or request. Output: files created.

- Examples: `/build-skill`, a component generator, a boilerplate scaffolder
- Purity signal: does the output compile / render / parse? Is it idiomatic?
- Common failure: over-generation (creates files the user didn't ask for); placeholder sprawl
- Heisenberg tier flag: if the generator needs deep domain knowledge (e.g., a data-model generator trained on specific books)

### 2. Auditor
**Reviews existing state against a standard** — reports findings, doesn't fix. Input: target + criteria. Output: punch list.

- Examples: `/audit-context`, a security reviewer, a code quality checker
- Purity signal: false positive rate. Real issues surfaced. No hallucinated problems.
- Common failure: cataloging trivia as issues; missing real problems
- Heisenberg tier flag: if the audit requires a ruleset ingested from a specific book/spec/compliance doc

### 3. Interviewer
**Extracts information through conversation** — asks, listens, synthesizes. Input: a goal. Output: structured data or a document.

- Examples: `/claudefather`, `/build-skill`, `/build-agent`, Breaking Bot itself
- Purity signal: did the output capture what the user actually meant, not what they first said?
- Common failure: batch-asking (kills nuance); not pushing back; leading questions
- Heisenberg tier flag: if the interview itself needs expertise — e.g., the data-model skill needs to interview Carson about his goal with a statistician's perspective

### 4. Researcher
**Gathers and synthesizes information from outside sources** — web, docs, APIs, files. Input: a question. Output: findings with citations.

- Examples: a competitive-analysis skill, a literature-review skill
- Purity signal: sources cited, conflicts flagged, honest uncertainty
- Common failure: ungrounded synthesis (hallucinated citations); confirmation bias
- Heisenberg tier flag: almost always. Research that matters deserves the full protocol + verification gate.

### 5. Processor / Transformer
**Takes input, changes it, returns it** — a document, a dataset, a codebase. Input: something structured. Output: the same thing, transformed.

- Examples: a code refactorer, a document converter, a data cleaner
- Purity signal: invariants preserved; nothing silently dropped
- Common failure: lossy transforms; edge cases mishandled
- Heisenberg tier flag: if the transformation rules come from expertise that must be digested (e.g., "refactor according to this style guide book")

### 6. Orchestrator / Meta
**Builds, manages, or coordinates other skills or agents.** Input: a higher-level goal. Output: artifacts, invocations, state.

- Examples: Breaking Bot, claudefather, `/build-agent`
- Purity signal: the things it produces must themselves be high-quality. Recursion matters.
- Common failure: leaky abstractions; the produced artifacts inherit the orchestrator's bad decisions
- Heisenberg tier flag: meta-skills are almost always Heisenberg because the blast radius is large — a bad meta-skill produces many bad skills.

## Hybrid skills

Many skills span categories. A skill can be an interviewer-then-generator (Breaking Bot), or an auditor-then-processor (lint-and-fix). When hybrid:

- **Name the dominant category** — the one where purity matters most
- **Each category contributes its own purity signals**
- **Phases should separate the categories** — don't mix interview and generation into one blob

## How to use this in the interview

In Phase 3 (interview), ask Carson explicitly: *"What category does this skill fall into?"* Give him the six options. His answer drives:

- Which question bank section gets the most attention
- Which purity criteria apply
- Which anti-patterns to guard against
- Whether the skill needs a knowledge base (researchers, auditors, processors often do; generators and interviewers sometimes do; orchestrators always do)

## Category-specific anti-patterns

| Category | Biggest trap |
|---|---|
| Generator | Over-generation; silent placeholder content; inventing files not requested |
| Auditor | Cataloging trivia; missing real issues; no severity differentiation |
| Interviewer | Batch-asking; no pushback; leading questions; ignoring context clues |
| Researcher | Ungrounded synthesis; hallucinated citations; confirmation bias |
| Processor | Silent drops; edge cases; lossy transforms; breaking invariants |
| Orchestrator | Propagating its own bad decisions into produced artifacts; leaky meta-abstractions |

These go into the generated skill's `reference/gotchas.md` by default — category-specific traps, pre-loaded.
