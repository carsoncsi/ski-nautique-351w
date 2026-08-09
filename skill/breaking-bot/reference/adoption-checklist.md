# Adoption Checklist

The evolution lens. For each skill, the worker asks: **"does this skill predate capability X, and would adopting X make it materially better?"** It matches against this *fixed, cited* table — it does **not** call the live platform or re-research.

**Citation discipline (non-negotiable — hallucinated capability recs are the highest-risk output class).** Every probe names its source:
- `[BR]` = baked in Bob Ross's knowledge base (`~/.claude/skills/bob-ross/knowledge/<topic>/`). Cite the file.
- `[DOC]` = Anthropic documentation, **but the matching Bob Ross KB topic is not yet baked** (`claude-api`, `claude-code` are empty as of KB v1). These probes are **confidence-capped at MEDIUM** and the finding must say "KB-unbaked — verify against live docs before acting." When Bob Ross bakes those topics, upgrade the citation and lift the cap.

If a probe's capability cannot be confirmed from either source, the lens says **"cannot verify — KB unbaked"** and emits nothing. Never guess a capability into existence.

---

## The probes

| Probe | "Predates X" audit check | Source | Confidence |
|---|---|---|---|
| **Effort-tiered sub-agents** | Skill spawns heterogeneous sub-agents but sets no effort control (low for classify/extract, high for deep reasoning gates). | `[DOC]` effort controls (Opus 4.8 era) | MEDIUM (capped) |
| **Structured Outputs** | Sub-agent prompt says "respond in JSON" / "use this format" in prose and parses defensively → predates strict `output_format` schema. | `[DOC]` structured outputs | MEDIUM (capped) |
| **Code-driven fan-out** | Skill *narrates* "spawn N agents then merge" sequentially in prose → predates the Workflow tool (Dynamic Workflows). | `[DOC]` Workflow tool — **research preview** | LOW — **recommend, never require** |
| **Mid-task system entries** | Skill fakes a user turn to re-steer mid-run → predates system entries in the Messages array. | `[DOC]` Messages API | MEDIUM (capped) |
| **Cache-ordered layout** | Skill interleaves volatile and stable text with no stable-prefix discipline → predates prompt-cache hygiene. | `breaking-bot/reference/cache-stability-contract.md` (local, authoritative) | HIGH |
| **Deferred tools / context economy** | Sub-agent front-loads many tool definitions, or round-trips every tool result through the model. | `[DOC]` tool search / programmatic tool calling | MEDIUM (capped) |
| **Managed Agents** | Skill is about to hand-build a sandbox / long-running stateful loop / persistent-session executor. | `[BR]` `bob-ross/knowledge/managed-agents/overview.md`, `sessions-memory.md` | HIGH (baked) — but gated, see below |

---

## Pitfalls baked into the lens (so it doesn't introduce bugs)

- **Never** tell a skill to move its *base* system prompt into the messages array — the initial system prompt stays the top-level `system` param. Only *mid-conversation* steering is the new capability.
- **Never** recommend max effort everywhere — the win is *tiering* effort to task weight, not maxing it. A blanket "use high effort" is an anti-pattern.
- **Never** fail an audit for not using a **preview** feature (the Workflow tool / Dynamic Workflows). Flag as a LOW-severity *recommendation*, framed "could adopt," never "must."
- **Managed Agents only at the runtime threshold** — recommend only when a skill is about to hand-build the exact thing Managed Agents provide (sandboxed long-running stateful execution). **Never** as a blanket "migrate to Managed Agents." It adds SKU cost + beta exposure; surface those in the finding.
- **Cheap/free levers get the "easy win" framing** where genuinely true (effort tiering, cache ordering are low-risk, reversible). Capability migrations (Managed Agents, Workflow tool) do not — surface their cost and reversibility honestly.

---

## Freshness

This table is refreshed **with Bob Ross's KB, not independently.** When `/bob-ross refresh` updates a topic, revisit the matching rows here: lift `[DOC]` to `[BR]`, update the confidence cap, add probes for newly-baked capabilities. The audit's report header always prints Bob Ross's KB freshness date; if it is past the refresh window, the evolution lens drops to lower confidence across the board rather than trusting stale capability facts.
