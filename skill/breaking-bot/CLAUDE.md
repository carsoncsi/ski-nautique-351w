# Working on Breaking Bot

Meta-context for when you're editing Breaking Bot itself, not running it.

## What this skill is

Global meta-skill at `~/.claude/skills/breaking-bot/`. Builds other skills in three tiers. Successor to claudefather — claudefather builds project context, Breaking Bot builds skills.

## Design rules that must not be broken

1. **SKILL.md stays ≤3k tokens.** All detail goes in `reference/`, `interview/`, or `research-protocol/`. If SKILL.md grows, it's a smell — pull content out into a reference file and link to it.
2. **Voice rules are load-bearing.** Voice-on only at intake + wrap. Don't scatter Heisenberg dialect through interview questions or templates — Carson needs parsable answers in the middle.
3. **Templates are what ship.** Users never see `templates/heisenberg/SKILL.md.tmpl` until they cook. So the template is the real product — keep it polished and aligned with the research findings (19 features, cache stability, Learning Loop architecture).
4. **Research protocol is a contract.** The 6-phase flow exists because dogfooding the protocol on Breaking Bot itself validated it. Don't weaken it.
5. **Don't add features without evidence.** Every feature in Breaking Bot came from researched patterns or Carson's explicit design call. New features need the same bar.

## Known architectural decisions

- **Learning Loop is propose-only at v1.** Never silent promotion. This is the conservative default per research findings on agent self-modification.
- **CHARTER.md is immutable.** Learning Loop can modify lessons.md and gotchas.md but never CHARTER. Constitutional AI pattern.
- **Breaking Bot learns (added 2026-06-11).** It now has its own loop: `CHARTER.md` (immutable anchor) + `reference/lessons.md` + `scratch/reflections/` (append-only). Same propose-only gate it prescribes. Reflection at Phase 10, promotion check at Phase 1.
- **Promote mode is one-way upward, preserve-first (added 2026-06-11).** `promote <slug>` renovates a skill to a higher tier: generate only what's missing, never rewrite live content unseen, lessons/gotchas migrate verbatim. No demote mode. See `reference/promote-mode.md`.
- **Two-level knowledge hierarchy.** SKILL.md → one reference file. Never deeper. Claude `head -100`'s files it's unsure about.
- **Scripts tier is first-class.** Deterministic logic goes in `scripts/`, not markdown. Code never enters context; output does.

## When updating Breaking Bot

- Use `/decide` to log any architectural decisions (universal skill)
- Update `reference/elite-features-checklist.md` if the 19 features change
- Update the MEMORY.md entry for Breaking Bot if scope or status shifts
- Test with a real skill cook — don't just read the change, run it

## Cross-references

- `~/.claude/skills/claudefather/` — sister skill, similar architecture
- `~/.claude/skills/build-skill/` — legacy quick-path skill-builder (kept alive)
- `~/.claude/agents/bot-auditor.md` — read-only audit worker (no Write/Edit) that audit-mode Phase B spawns; harness-enforces the recommendation-only contract
- MEMORY.md → `project_breaking_bot.md` — current project status
