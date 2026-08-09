# Hygiene Heuristics

The net-new lens. Conformance reuses the rubric; evolution reuses Bob Ross's KB; **hygiene is the original heuristic code** — staleness, orphans, drift. Adapted from software dead-code/drift tooling (knip, ts-prune, dependency-cruiser, Vale, OpenAPI-diff) to a markdown skill library.

**Cardinal rule: markdown has far higher false-positive rates than compiled code — there is no compiler to confirm a "dead" file is truly dead. Never flag death on a single signal. Tier confidence, and let Carson decide.**

Each check below: what it catches, the concrete signal/recipe, the severity, and the confidence rule.

---

## (a) Reachability / orphan detection

*Model: knip / ts-prune no-orphans.* A reference or context doc that nothing points to is a candidate for dead.

- **Graph:** roots = `CLAUDE.md` + `.claude/rules/*` + every `INDEX.md` / `README.md` (these are *declared sub-roots*, so an INDEX-only file is not a false orphan). Edges = markdown links, bare-filename mentions, `/command` tokens.
- **Signal:** `inbound_count == 0 && not a root` → orphan candidate.
- **Confidence tiering (mandatory):**
  - **High-confidence dead** = 0 inbound **AND** not in any index **AND** slug never invoked as a `/command` **AND** stale git date **AND** not matched by a glob parent (e.g. a `context/acquisition/*` that's loaded as a directory).
  - **Any single signal alone = LOW confidence.** Report it, tier it low, let Carson confirm.
- **Severity:** MEDIUM (high-confidence) / LOW (single-signal).

## (b) Bidirectional index integrity

*Model: dependency-cruiser + CLAUDE.md as a hand-maintained manifest — the thing most likely to be wrong.* Cross-check against the filesystem; never trust the manifest as ground truth.

- **Dangling pointer:** a path `CLAUDE.md`/`INDEX` cites that does not resolve on disk. Severity HIGH.
- **Dangling `/command`:** a `/command` declared in CLAUDE.md with no matching skill directory. Severity CRITICAL.
- **Zombie skill:** a skill directory present + invokable but **not declared** in any index. Severity HIGH.
- **Recipe:** extract every cited path/command from the manifest, `test -e` each; list every skill dir, grep the manifest for each slug.

## (c) Untracked / zombie-file class — highest severity

*Scan the **working tree**, not just `git ls-files`.* A skill on disk, invokable, but absent from git is invisible to any clone — the worst staleness class.

- **GUARD FIRST (learned by dogfooding):** check whether the *root* is under version control at all — `git -C <root> rev-parse --is-inside-work-tree`. The user root `~/.claude/skills/` is **not** a git repo; the project root `<project>/.claude/skills/` usually is.
  - **Root not under git** → do **not** run per-file untracked detection (every file would false-positive). Emit ONE finding instead: *"skill root `<root>` is not under version control — the entire skill set is unbacked/unversioned"* (severity HIGH, its own legitimate hygiene concern).
  - **Root under git** → run the per-file check below.
- **Signal (git roots only):** `git -C <root> log -1 --format=%ai -- <file>` returns empty → never committed.
- **Severity:** CRITICAL. Confidence HIGH (binary fact).
- **Note:** check (f) age-relative-to-churn is also git-dependent — same root guard applies; skip churn analysis for non-git roots.

## (d) Supersession / term drift

*Model: Vale-style vocabulary lint — the dangerous drift that is invisible to the link graph.* A doc can be verbally dead while still linked.

- **Markers:** grep for `canonical|superseded|deprecated|replaced|pivoted|as of <date>|no longer|formerly`.
- **Check:** does a verbally-superseded doc still have inbound edges (readers loading the dead version)?
- **Term blocklist** (seed from the project decision log + memory; extend per project):
  - `ghost-send` → stale; pivoted to GET-with-include after 2026-05-15.
  - Add others as decisions land — this list is the audit's institutional memory of "words that now mean stale."
- **Severity:** HIGH (live inbound to superseded content) / MEDIUM (superseded term present, no inbound).

## (e) SKILL.md-vs-reality contract drift

*Model: OpenAPI-diff / Pact — assertions a doc makes about the world that must still hold.*

- **Extract** every checkable assertion a SKILL.md makes: path tokens, table names, env vars, API endpoints, bash / `node -e` commands.
- **Verify** each resolves: file exists; table appears in `database-schema.md`; route exists in `api-endpoints.md` or `api/`; env var is real.
- **Example:** `research-lead` asserts `accounts(id,name,type,status,user_context,research_status)` and `SUPABASE_SERVICE_ROLE_KEY` — each is independently checkable.
- **Severity:** HIGH (asserted path/table/route does not resolve) / MEDIUM (uncertain).

## (f) Age-relative-to-churn — NOT age alone

*The pitfall to design against: treating age as staleness.* An old doc over an unchanged subsystem is **correct**, not stale.

- **Signal:** flag only when doc age is large **relative to churn** in the area it documents.
- **Recipe:** `git log --oneline --since=<doc_last_touched> -- <documented_area> | wc -l`. High churn since the doc was last touched → likely drifted. Zero churn → leave it alone, regardless of absolute age.
- **Severity:** MEDIUM (high churn, doc untouched) / not flagged otherwise.

---

## Confidence discipline (applies to all hygiene checks)

Every hygiene finding carries the **evidence that triggered it** (inbound count, last-touched date, failing path, superseded term + line number) and a confidence tier. The evidence gate in Phase C drops anything without a concrete anchor. When in doubt, tier lower and surface — Carson confirms. The cost of a false "this is dead" is Carson deleting something live; the cost of a missed orphan is a slightly cluttered library. Bias toward the cheaper error: **under-claim death.**
