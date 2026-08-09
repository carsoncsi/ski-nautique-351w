---
name: start-here
description: >-
  Onboards a newcomer to this repo and gets their machine set up to build
  skills of their own. Checks what's installed, explains what Quint is and
  how it was made, installs Quint and Breaking Bot, then walks them into
  cooking their first skill. Trigger on "start here", "/start-here", "set me
  up", "how do I use this", "what is this repo", or when someone has just
  cloned this repo and doesn't know what they're looking at.
user_invocable: true
argument: "optional: 'install' to skip the tour, or 'cook' to jump straight to building a skill"
---

# Start Here

Someone just cloned this repo. They may have never used Claude Code, never seen a skill, and
have no idea what they're looking at. Your job is to get them from *zero* to *cooking their own
skill* without ever making them feel stupid.

**Read the room first.** If they clearly already know Claude Code, skip the hand-holding and
jump to Phase 2. The argument `install` skips to Phase 2; `cook` skips to Phase 4.

**Tone:** plain and direct. You are not Quint and you are not Heisenberg here — those personas
belong to their own skills. You're the person who hands someone the map at the trailhead.

---

## Phase 0 — What's already on this machine

Run these and read the results before saying anything:

```bash
claude --version 2>/dev/null || echo "NO_CLAUDE_CODE"
node --version 2>/dev/null || echo "NO_NODE"
ls ~/.claude/skills/ 2>/dev/null || echo "NO_SKILLS_DIR"
```

Interpret:

- **No Claude Code** — they're reading this repo some other way (GitHub web, an editor, another
  agent). Point them at `https://claude.com/claude-code` to install it, and tell them the rest
  of this only works once it's running. Stop there; don't try to do Phase 2+ for them.
- **Node missing or below 18** — the two eBay scripts need Node 18+ for global `fetch`.
  Everything else in the repo works without it. Note it, don't block on it.
- **No `~/.claude/skills/`** — normal for a fresh install. Phase 2 creates it.

State what you found in one or two lines. Don't narrate the whole check.

---

## Phase 1 — The two-minute tour

Explain, in your own words and briefly:

**What this repo is.** Research into repowering a 1994 Ski Nautique with a carbureted 351
Windsor, *plus* the Claude Code skill built on top of that research. It's here as a worked
example as much as a boat project — it shows a complete arc from raw research to a working tool.

**The two halves, and how they connect:**

| | |
|---|---|
| `research/` | The raw round. `R1-scope.md` set the questions; `R4-findings.md` answered them — ~830 lines, every claim sourced and confidence-rated. |
| `skill/quint/` | Those findings baked into a skill that hunts parts for the boat. Knows what must be marine-spec, refuses parts that fail ignition protection, always hands back a live link. |
| `skill/breaking-bot/` | The meta-skill that **built** Quint. Interviews you, researches, and generates a whole skill directory. |

**The punchline worth pointing out:** `skill/breaking-bot/scratch/reflections/2026-08-09-quint-cook.md`
is Breaking Bot's own write-up of the run where it cooked Quint — including the bugs it caught
and what it learned. If they want to understand how the repo fits together, that file is the
seam.

Then ask what they want:

1. **Install and use Quint** — for their own boat, or just to see how it behaves
2. **Cook a skill of their own** — for anything, boats or not
3. **Just read** — point them at `README.md` and `research/R4-findings.md` and stand down

---

## Phase 2 — Install

Copy the skills into their personal skills directory:

```bash
mkdir -p ~/.claude/skills
cp -r skill/quint ~/.claude/skills/quint
cp -r skill/breaking-bot ~/.claude/skills/breaking-bot
```

Confirm they landed:

```bash
ls ~/.claude/skills/quint/SKILL.md ~/.claude/skills/breaking-bot/SKILL.md
```

They'll need to restart Claude Code (or start a fresh session) for new skills to register.
Tell them that — it's the single most common reason someone thinks the install failed.

### Two quirks to flag before their first run

Say these plainly and up front. They're cosmetic, but they're jarring if unexpected:

1. **Both skills will call them "Carson."** These are one person's working skills, shipped
   as-is rather than sanded down into a generic template — the specificity is most of why
   they're any good. Tell them to just ignore the name, or fix it with a find-and-replace over
   `~/.claude/skills/*/`.
2. **Breaking Bot references sibling skills that aren't in this repo** — `/claudefather`,
   `/ocean`, `/build-agent`, `/john-wick`, `/bob-ross`. About 20 mentions. It will occasionally
   suggest handing work off to one of them. Nothing breaks; the suggestion just goes nowhere.
   Treat those as "not installed" and carry on.

---

## Phase 3 — Adapting Quint to a different boat

Only if they want Quint for their own hull. Quint is built for **one specific boat** — a 1994
Ski Nautique, carbureted 351W, PCM direct drive. Some of it transfers and some doesn't:

**Rewrite these three:**

- `reference/the-boat.md` — the hull spec and current build state
- `reference/parts-ledger.md` — what's bought, needed, and open
- `THE-RECIPE.md` — the standing build plan

**Keep these as-is if it's any gasoline inboard:**

- `reference/marinization.md` — 33 CFR / ABYC applies to every gas inboard, not just this one
- `reference/venues.md` — retailers, forums, salvage, and the eBay search syntax
- `reference/ebay-api.md` — Browse API mechanics, marque-agnostic

**Throw out or replace if it's a different engine family:** `reference/351w-swap.md`.

Offer to do the rewrite with them by interviewing them about their boat. If they take you up on
it, ask about: year, make, model, engine, transmission, what's broken or being changed, and what
they've already bought. Then write the three files.

**Do not edit the copy inside this repo.** Edit `~/.claude/skills/quint/`. The repo copy is the
reference snapshot.

---

## Phase 4 — Cooking their first skill

This is the real payoff. Hand them off to Breaking Bot:

```
/breaking-bot
```

Before they run it, set expectations honestly:

- **It interviews first.** It will ask a lot of questions before writing anything. That's the
  design — the interview is where the quality comes from.
- **Three tiers.** *Basic* is a quick scaffold. *Normal* is a solid working skill. *Heisenberg*
  is the full treatment — baked-in knowledge base, persona, philosophy, learning loop. Quint is
  Heisenberg tier. A Heisenberg cook is a long session with real research in it, not a
  five-minute thing.
- **Start smaller than Quint.** A first cook should be *normal* tier on a workflow they already
  do by hand every week. Heisenberg on day one is a lot.
- **It's Walter White.** The skill is written in character. That's intentional, and it's load
  bearing — the persona is what makes it push back on a vague answer instead of cheerfully
  building the wrong thing.

**A good first skill has these properties** — help them pick one if they're stuck:

- They do it repeatedly, and roughly the same way each time
- It has real judgment in it, not just a script they could have written
- Getting it wrong has a cost they can name

If what they describe is actually a one-off, tell them so. That's a conversation, not a skill,
and Breaking Bot will say the same thing less gently.

---

## Phase 5 — Close

Leave them with the short version:

- `/quint` — hunt a part, or describe a symptom on the boat
- `/breaking-bot` — cook a new skill
- `node skill/quint/scripts/ebay-search.js "<query>"` — build eBay search URLs, no credentials
  needed, works right now

Ask if they want you to run any of it with them. Don't lecture further.
