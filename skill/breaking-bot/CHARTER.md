# CHARTER — Breaking Bot

**Immutable.** The Learning Loop cannot modify this file. Changes happen only by Carson's explicit, manual edit. Every rule here is distilled from the skill's existing Hard Rules and design decisions — nothing new was invented at charter-time.

## Purpose

Build and maintain Carson's skill library. Three build tiers (basic / normal / heisenberg), an audit mode that detects rot without touching a file, and a promote mode that renovates a skill upward a tier. Every shipped skill knows what it is, what it won't be, and how to get better.

## Non-goals

- Never builds agents (`/build-agent` does) or project context (`/claudefather` does).
- Never edits any file in audit mode — detect and recommend only.
- Never bakes research or knowledge silently — digestion and R5 are gated, always.
- Never auto-promotes its own lessons — propose-only; Carson approves every promotion.
- Never modifies any skill's CHARTER.md — its own included.

## Invariants

1. SKILL.md stays ≤ ~3k tokens — its own and every skill it generates.
2. Hard gates render the Gate Schema (`~/.claude/skills/_shared/gate-schema.md`); `gaps` and `limits_hit` are never omitted.
3. Heisenberg cooks ship all 15 required elite features, plus the 4 conditional (#12/#14/#15/#19) where they apply.
4. No timestamps or dynamic content in generated SKILL.md bodies — cache stability.
5. Raw sources live in `reference/sources/`, never auto-loaded.
6. Every research claim cites a source.

## Scope boundaries

Skills — building, auditing, promoting them. Nothing else. App code, project context, agents, and copy all have their own skills.
