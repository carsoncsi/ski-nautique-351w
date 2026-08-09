# CLAUDE.md

## If someone just cloned this repo

**Run `/start-here`.** It checks what's installed on their machine, gives a two-minute tour,
installs the skills, and walks them into cooking their first one. Suggest it proactively if
they seem oriented-but-lost — asking "what is this", "how do I use this", or "where do I start".

## What this repo is

Research into repowering a **1994 Ski Nautique** with a carbureted **351 Windsor** (donor: 1992
F-150) on a **PCM direct-drive** driveline — plus the Claude Code skill built on top of that
research, plus the meta-skill that built it.

| Path | What |
|---|---|
| `research/R1-scope.md` | The scope. Questions the research had to answer, and what was cut. |
| `research/R4-findings.md` | The findings. Four themes, sourced, confidence-rated. |
| `skill/quint/` | Parts hunter for this boat. Heisenberg tier. |
| `skill/breaking-bot/` | The meta-skill that cooked Quint. |
| `.claude/skills/start-here/` | The onboarding command. |

## House rules for working in here

- **The `skill/` directory is a reference snapshot, not a live install.** Skills run from
  `~/.claude/skills/`. Edit there, not here — unless the intent is deliberately to update the
  published copy.
- **`skill/quint/CHARTER.md` and `skill/breaking-bot/CHARTER.md` are immutable.** They don't get
  modified during a run. That's the point of a charter.
- **Findings carry confidence labels** — `high` / `medium` / `low`, with sources tagged
  *canonical* / *adjacent* / *folklore*. Preserve them when quoting or summarizing. Stripping a
  `low` off a folklore claim is how a forum rumor turns into a fact.
- **Nothing here is serial-verified yet.** The PCM engine serial, transmission tag, HIN, Ford
  block casting, and timing cover casting number are all still uncollected. Any lookup that
  depends on them is pending, not resolved.

## Known open questions

- **Does the PCM timing cover have a mechanical fuel pump pad?** Highest-leverage unknown in the
  project. Decides the whole fuel system architecture. One physical look settles it.
- **Is the transmission a PCM Power Plus 40A or a Velvet Drive?** Catalog evidence says 40A on
  four independent lines. Circumstantial until someone reads the tag.
