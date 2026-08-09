# Audit Mode

Breaking Bot's second job. The build flow *makes* skills; audit mode *maintains* them. It walks Carson's existing skill library and produces a **punch list he reviews** — it never edits a file. Same chemist, same purity obsession, pointed at skills that already shipped.

> Recommendation-only. Human-gated. Built from assets that already exist. The audit detects; Carson decides.

Read this doc when `$ARGUMENTS` begins with `audit`. The two rubric docs the workers load are [`hygiene-heuristics.md`](hygiene-heuristics.md) (the net-new checks) and [`adoption-checklist.md`](adoption-checklist.md) (the evolution probes). Conformance reuses the existing [`elite-features-checklist.md`](elite-features-checklist.md), [`purity-standards.md`](purity-standards.md), [`cache-stability-contract.md`](cache-stability-contract.md).

---

## Invocation

| Command | Scope |
|---|---|
| `audit <slug>` | One skill. Inline, no fan-out — single pass. |
| `audit all` | Whole library. Fan-out (one worker per skill) with sequential fallback. |
| `audit all --axis <conformance\|hygiene\|evolution>` | One lens only. |
| `audit all --user` / `--project` | One skill root only. Default: both. |
| `audit --since <git-ref>` | Only skills touched since the ref. Cheap incremental. |

**The library = two roots:** `~/.claude/skills/*/` (user-level) and `<project>/.claude/skills/*/` (project-level, may not exist). Walk both unless `--user`/`--project` restricts.

**Locked scope (v1):** static audit only — lint + hygiene graph + adoption-gap, all from reused knowledge. **No behavioral prompt-rot evals** (golden sets, baseline replay) — that's a deferred phase 2, a separate product with real maintenance cost. If a future instance is tempted to add it, that's a new decision for Carson, not a silent expansion.

**Voice:** Heisenberg ON for intake and the final wrap only. Workers run voiceless and structured — persona in a scorer is verbosity bias.

---

## Architecture — gated fan-out

**Bounded burst → structured findings → Gate Schema review → Carson decides.** Nothing mutates between burst and decision.

```
PHASE A — ENUMERATE   (deterministic, no model)
  Walk both skill roots. Build the library graph:
    roots = CLAUDE.md + .claude/rules/* + every INDEX.md / README.md
    nodes = each SKILL.md + each reference/context *.md
    edges = /command tokens, bare-filename mentions, markdown links
  Emit manifest rows: {slug, root, path, last_touched, tracked, inbound_count}

PHASE B — FAN OUT     (Workflow tool: one worker per skill)
  Shared cached prefix (identical for every worker → cache hit):
    - the 3 conformance rubric docs
    - hygiene-heuristics.md
    - adoption-checklist.md
    - the immutable-core list (§ Safety)
  Per-worker volatile input: that skill's files + its manifest row
  Worker output: findings as STRICT structured JSON (the schema below)
  Agent type: workers spawn as `bot-auditor` (~/.claude/agents/bot-auditor.md) —
         Read/Glob/Grep/Bash only, NO Write/Edit. The recommendation-only
         contract is enforced by the harness, not by prose (the wick-auditor
         pattern). If the agent type is unavailable, fall back to general
         workers — the prose rules in § Safety still bind them.
  Model: workers run CHEAP (Fable) — applying a fixed rubric to one skill is
         the cheapest possible model task. Phase C collation + Phase D gate
         render stay frontier (Opus); that's where the judgment lives.
         (Prefer Fable over Haiku: with many MCP servers loaded a Haiku worker
          can blow the prompt-size limit — fall back to the orchestrator model.)
  Bounded: ≤16 concurrent, 1 retry per worker.

PHASE C — COLLATE     (deterministic)
  Merge worker JSON. De-dupe cross-skill findings. Sort by severity.
  EVIDENCE GATE: drop any finding with no concrete anchor (file:line,
  failing path, doc URL, failing static check). Count what was dropped.

PHASE D — GATE        (Gate Schema render → Carson)
  Render the punch list through ~/.claude/skills/_shared/gate-schema.md.
  Per-finding verdict: apply-mechanical / open-for-build / dismiss / defer.
  NOTHING is applied here. The verdict only ROUTES the finding.
```

**`audit <slug>` skips Phase B's fan-out** — one inline pass over the single skill. Fan-out only earns its keep at `audit all`.

**Sequential fallback (required).** The Workflow tool (Dynamic Workflows) is research-preview. If it is unavailable, degrade gracefully: run the workers as sequential inline passes — slower, identical output. A tool you run to *check for rot* must not itself be the most fragile thing in the library. Never hard-depend on the preview API.

**Reuse, not re-research (load-bearing).** The two expensive lenses are pre-computed assets. Conformance *applies* breaking-bot's own rubric — it doesn't invent criteria. Evolution checks a *fixed, cited* adoption checklist sourced from Bob Ross's knowledge base — it does **not** call the live platform or re-research. When Anthropic ships something new, Carson refreshes Bob Ross's KB (existing protocol) and the audit picks it up for free.

---

## The finding schema (worker `output_format`, strict)

Eat the dog food: the evolution lens recommends structured outputs, so the audit uses them.

```json
{
  "skill": "<slug>",
  "self_referential": false,
  "findings": [{
    "axis": "conformance | hygiene | evolution",
    "check_id": "<stable id, e.g. hygiene.orphan>",
    "severity": "critical | high | medium | low",
    "confidence": "high | medium | low",
    "finding": "<one neutral sentence: what is wrong / missing>",
    "evidence": "<file:line | inbound_count=0 | git last-touched DATE | path-unresolved | doc-url>",
    "suggested_fix": "<diff for mechanical; description for prose/behavioral>",
    "fix_class": "mechanical-autofixable | prose-needs-human | behavioral-needs-human | capability-proposal | core-violation-flag",
    "effort": "S | M | L"
  }]
}
```

A finding whose `evidence` is empty or non-anchoring is dropped in Phase C. "No change recommended" is a legitimate, common, empty-findings result — precision over recall.

---

## Output — the punch list

Rendered per skill, sorted by severity, through the Gate Schema. The report header carries: scope audited, per-root skill counts, **Bob Ross KB freshness date** (warn if stale — evolution lens drops to lower confidence), the **self-audit caveat** (breaking-bot grading itself against its own rubric is the intrinsic-self-correction trap — flag it, don't hide it), and the **count of findings dropped by the evidence gate** (so suppressed noise is transparent, not hidden work).

**Severity tiers** (same vocabulary as `/audit-feature` so the scale is consistent across both auditors):
- **CRITICAL** — untracked skill (zombie, invisible to any clone), dangling `/command`, duplicate `name`, suspected immutable-core violation.
- **HIGH** — dead reference path, superseded term still live, slug ≠ dirname.
- **MEDIUM** — high-confidence orphan, conformance rubric fail, high-confidence adoption gap.
- **LOW** — low-confidence orphan, preview-feature adoption suggestion, style nits.

**Gate verdict per finding** (Carson's only action — none mutate a file inside the audit):
- `apply-mechanical` → routes to a **separate, explicit apply step** Carson runs *after* review (dead-link removal, line-count split, path normalization, frontmatter fix). The audit itself stays read-only; even mechanical fixes need a second deliberate action.
- `open-for-build` → hand the finding to the normal breaking-bot build/edit flow as a scoped task. **Tier-drift findings** (a skill outgrew its tier — KB/persona/gates bolted onto a normal-tier scaffold) route to **promote mode**: `promote <slug>` (see `promote-mode.md`).
- `dismiss` → first-class, friction-free. The default is "no change."
- `defer` → logged with a revisit note (in the conversation, not persisted as fact).

**Cadence: on-demand only.** No cron, nothing persisted as fact between runs. Last run's un-actioned suggestions never feed the next run as ground truth (the memory-pathway misevolution trap).

---

## Safety — recommendation-only by construction

The feature is an **external-verifier loop**: the audit *detects*, Carson *verifies and decides*. That converts unreliable intrinsic self-correction into the reliable externally-verified kind.

**What it must NEVER do:**
1. **Never edit a skill file.** Not even "obvious" ones. Auto-apply is the cardinal sin for a skill that builds skills.
2. **Never auto-rewrite prose.** Skill instructions are load-bearing prompt artifacts; "improving" wording can silently change triggering/behavior. Prose fixes are reported, never applied without Carson seeing the diff.
3. **Never recommend changes to the immutable core.** It may *flag a suspected violation* but never propose rewriting an invariant. The core (not exhaustive; read from the project rules): pricing floors ($5.25 hard floor), ACH-only invoice policy, "sales stays human," customer-data-minimization, autopay/security invariants, and any skill's own `CHARTER.md`.
4. **Never bundle.** Each finding is independently approvable / rejectable / revertible.
5. **Never let prior recommendations become ground truth.** No memory pathway from last run.

**Detect-then-fix separation:** the worker surfaces the *located, evidenced problem first*; the suggested fix is secondary and tied to that finding. A fix whose defect wasn't independently established is dropped. (Models are weak at *finding* what's wrong, strong at *fixing a named* problem — so the rubric/heuristics do the locating; the model only drafts the fix.)

**Precision over recall:** worker prompts are tuned for precision, not coverage. Findings read neutrally ("X references a path that no longer resolves; evidence: …"), never "I strongly recommend" / "this is clearly better." The success metric is **verified defects surfaced**, not recommendations accepted — 3 real issues beat 30 plausible ones. Do not optimize "skills made shorter" or "recommendations accepted"; those are reward-hacking proxies.

---

## Reuse ledger

**Composes (already exists, zero new maintenance):** the 3 conformance rubric docs · Bob Ross's `knowledge/managed-agents/` + refresh protocol · `_shared/gate-schema.md` · `/audit-feature` severity vocabulary · `audit-context`'s report-don't-apply stance · git (last-touched, tracked, churn) · the Workflow tool (with sequential fallback) · breaking-bot's existing Phase 8 self-audit logic, repointed.

**Genuinely new (this build):** the audit-mode dispatcher in SKILL.md · this doc · `hygiene-heuristics.md` · `adoption-checklist.md` · the finding schema above. Net new ≈ two reference docs + one schema + dispatch glue. The intelligence is borrowed.
