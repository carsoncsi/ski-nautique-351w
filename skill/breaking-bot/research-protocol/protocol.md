# The 6-Phase Research Protocol

Used by Breaking Bot in Phase 5 of the cook. Also baked into generated Heisenberg skills that need runtime research capability.

Validated by dogfooding — Breaking Bot was itself built using this protocol. The plan revisions during R5 verification gates significantly improved the final design.

## The principle

Research is not Googling. Research is a structured process with verification gates. Bake research silently and you build on shaky ground. Verify at every step.

## The six phases

### R1 — Scope

**Input:** A question or area that needs research.
**Output:** An approved scope document.

**What happens:**
1. Define what the research MUST answer (specific questions)
2. Define what's out of scope (explicit exclusions)
3. Identify sources to prioritize (official docs, papers, high-signal blogs)
4. Describe the verification approach for R5

**Gate:** Carson approves the scope before any searching begins.

**Template:** `research-protocol/scoping-questions.md`

### R2 — Primary search

**Input:** Approved scope.
**Output:** Raw findings from web sources, sub-agent reports.

**What happens:**
1. Dispatch **context-isolated sub-agents** for search (prevents context pollution)
2. Parallel tracks when the research has distinct domains
3. Each sub-agent gets: the pinned goal, its slice of questions, sources to prioritize, output schema
4. Sub-agents return findings as **schema-validated JSON** (the R2/R3 worker schema in `findings-template.md`), not free prose

**Why context-isolated:** Search results are noisy. Loading them into the main context burns tokens you'll need later. Sub-agents digest and return summary, not raw.

**Model split (cost discipline).** R2/R3 workers do mechanical fetch-read-cite work — run them on a **cheap, fast model (Fable)**. Synthesis (R4), the R5 gate, and conflict resolution stay on the orchestrator's frontier model (Opus). R2 fan-out is one of the two highest model-spend phases in the whole cook; this is the cleanest cost win with negligible quality loss. *Prefer Fable over Haiku here* — with many MCP servers loaded, Haiku sub-agents can blow the prompt-size limit and fail; if a worker dies, fall back to the orchestrator model for that slice.

**Orchestration.** For a multi-track R2 burst (3+ question-groups), express the fan-out as a **Workflow** `parallel()` over the groups — shared cached prefix (pinned goal + sources + output schema), per-worker volatile input (its question slice). Mirror audit-mode's pattern. **Sequential fallback is mandatory:** Workflow run-state does NOT survive a session restart, and cooks span sessions across gates — so Workflow fits *within* a single R2 burst (between the R1 and R5 gates), **never wrapping a gate**. If the tool is unavailable, dispatch the same workers as plain sequential sub-agents — slower, identical output.

**Sub-agent prompt + output schema in:** `research-protocol/findings-template.md`

### R3 — Source mining

**Input:** Sub-agent findings + any user-provided source material (books, papers, URLs).
**Output:** Cross-referenced findings with source-material citations.

**What happens:**
1. If Carson provided sources, mine them against the web findings
2. Flag conflicts (web says X, Carson's book says Y)
3. Cross-validate — a finding backed by both web and Carson's source is stronger than either alone

**When to skip:** If no user-provided sources, R3 folds into R2.

### R4 — Synthesis draft

**Input:** Findings from R2 + R3.
**Output:** A `research-findings.md` draft with pinned goal, structured findings, sources, and explicit uncertainty.

**Format requirements:**
- Pinned goal at top (the original question, unchanged)
- Each finding: one section with inline citations
- Explicit "Conflicts Between Sources" section
- Explicit "Honest Uncertainty" section
- "What Surprised Me" section — findings that challenge any prior plan
- Full source list with URLs and one-line notes on each

**Template:** `research-protocol/findings-template.md`

### R5 — Verification gate

**Input:** R4 draft.
**Output:** Approved, revised, or rejected findings.

**What happens:**
1. Present the draft to Carson
2. Pin the original goal prominently
3. Ask specifically:
   - Does this answer the scoped questions?
   - Are there findings you want to challenge?
   - Are there sources you want to drop or add?
   - Are we still on target, or did we drift from the goal?

**Outcomes:**
- **Approved** → proceed to R6
- **Revise** → return to R4 with feedback (or R2 for specific gaps)
- **Reject** → return to R1 with a revised scope

**This gate is non-negotiable.** Never skip. Never silent-bake.

**Template:** `research-protocol/verification-gate.md`

### R6 — Bake in

**Input:** Approved findings.
**Output:** Findings distilled into skill files.

**What happens:**
1. Distill approved findings into the skill's `reference/` files
2. Every claim cites its source inline
3. Sources list appended to affected file(s)
4. If findings contradict existing skill content, surface to Carson rather than silently overwriting

## Anti-drift mechanisms

Research protocols fail because of drift. Techniques used:

1. **Goal pinning at every phase.** Every phase output file has the original goal at the top.
2. **Re-injection at phase boundaries.** Before starting a new phase, re-state the goal and the phase's purpose.
3. **Checkpoint files.** Every phase writes to `research/scratch/Rn-<date>.md` so you can roll back.
4. **Verification gates.** R5 is the big one but R1 also has a gate (scope approval).

## When to use sub-agents (and how to run them)

Use sub-agents in R2 when:
- Search scope is broad (more than 5 questions)
- Multiple distinct domains in scope
- Expected noise in results (search results with many distractors)

Skip sub-agents when:
- Scope is narrow (1-3 questions)
- Only 1-2 canonical sources needed
- Main context can absorb the results without pollution

When you do dispatch them:
- **Model:** Fable (cheap/fast) for the mining workers; orchestrator stays on the frontier model for synthesis. See R2 above.
- **Shape:** ≥3 groups → Workflow `parallel()` with a shared cached prefix; <3 → plain sub-agents. Either way, workers return the JSON schema in `findings-template.md`.
- **Fallback:** never hard-depend on the Workflow tool — sequential sub-agents produce identical output if it's unavailable, and Workflow must never wrap a human gate (state doesn't survive a session restart).

Sub-agents take longer (2-5 minutes per dispatch) but return cleaner output. For load-bearing research, the tradeoff is worth it.

## Baked-in research protocol in generated skills

When a generated skill needs runtime research capability, Breaking Bot embeds a shortened version of this protocol in the skill's workflow:

```markdown
## Runtime research (for skills that need it)

When this skill needs to research something at runtime:

1. **Scope:** state the question in one sentence; ask user to approve
2. **Search:** dispatch a sub-agent for isolated search (don't search in main context)
3. **Synthesize:** produce findings with sources
4. **Verify:** show findings to user, get approval
5. **Use:** apply the findings to the task

Never bake research silently. Every claim cites a source.
```

This is a miniature version of the full 6-phase — appropriate for skill-level runtime research, vs. Breaking Bot's own build-time research which uses the full protocol.

## Lessons from dogfooding

Building Breaking Bot with this protocol surfaced:

- The R5 verification gate is where real quality happens. Carson rejected, revised, and expanded multiple findings — the final plan is substantially different from the pre-research plan.
- Sub-agents in R2 saved context dramatically. Two parallel agents returned focused findings without their raw searches polluting the main context.
- The "What Surprised Me" section in the findings template is load-bearing — it's where the research actively challenges assumptions.
- Dogfooding the protocol while designing it was the right call. The protocol wouldn't be this solid without real use.
