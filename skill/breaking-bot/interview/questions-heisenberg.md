# Phase 3 — Heisenberg Tier Interview

Voice-off. Clean. Precise. This is the full cook — no shortcuts. All 19 elite features are in scope: 15 required (always baked in) + 4 conditional (#12/#14/#15/#19, where they apply). Plan for a long conversation.

Ask one section at a time. Don't skip sections. The depth is the point.

## The eight sections

### Section A — Identity & Mission

1. **Slug.** Lowercase, hyphenated. Must not exist in `~/.claude/skills/` or the project. Must not collide with universal skills.

2. **Category.** Which of the six (`reference/skill-taxonomy.md`)? If hybrid, name the dominant.

3. **Mission statement.** One paragraph. What this skill does, for whom, why it matters. This becomes the top of `CHARTER.md`.

4. **Non-goals.** 3-5 things this skill will explicitly NEVER do. These go in CHARTER as immutable. This is where you prevent future scope creep.

5. **Invariants.** Properties of every output. Example: *"Every claim cites a source."* *"Never modifies files outside the target directory."* These also go in CHARTER immutable.

### Section B — Purity

6. **Purity criteria.** Three specific, inspectable things you could check after a run to distinguish good output from garbage. Skill-specific, not generic. (See `reference/purity-standards.md` for guidance.)

7. **Failure modes.** How does this skill break? How do you recognize the failure? What's the "looks right, actually wrong" scenario? These go in `reference/gotchas.md` as the Failure Modes section.

### Section C — Persona

Load `interview/persona-design.md` and work through it. Skill gets a voice? What voice? Refusal rules. On/off phases. Carson can say "no persona" — that's valid for some Heisenberg skills (utility-first, no character). But ask explicitly.

### Section D — Knowledge Base

8. **Does this skill need expertise that doesn't live in Carson's head?** Books, papers, URLs, notes, internal docs.
   - If yes → load `interview/knowledge-base-intake.md` and schedule Phase 4 (digestion)
   - If no → skip Phase 4, note that knowledge lives in the workflow itself

9. **If yes, what sources?** Paths to PDFs, URLs, pasted text, notes files. Exact pointers.

### Section E — Philosophy

Load `interview/philosophy-authoring.md`. Every Heisenberg skill gets a `philosophy.md` that codifies the principles it won't violate. What principles? Short list — 3-7 items. Each one: the principle + why it exists.

### Section F — Workflow

10. **Phases.** Walk through the steps the skill takes, in order. For each step: what happens, what's the output, what's the decision point.

11. **Phase transitions.** Where does the skill pause for user input vs. proceed autonomously?

12. **Voice on/off per phase** (if Section C gave the skill a persona). Default: on at intake + wrap, off in middle. Deviations only if justified.

13. **Research doctrine.** Does the skill do web research at runtime? If yes, when and on what? (This affects whether the generated skill embeds the 6-phase research protocol.)

14. **Pushback calibration.** Refuse / warn / just-do. Set the default posture.

### Section G — Integration

Load `interview/workflow-embedding.md`. Work through:

15. **Triggers.** Phrases that should activate. 4-6 minimum.

16. **Anti-triggers.** When it should NOT fire. 2-4.

17. **Dependencies.** Files, skills, tools, env vars required.

18. **Cross-skill data contracts.** Files this skill writes that other skills consume (or vice versa).

19. **Workflow embedding.** When in Carson's day does this get invoked? What chains into it? What chains out?

20. **Cold-start example.** One ready-to-run invocation Carson can use to test the skill immediately.

### Section H — Learning & Evolution

21. **Learning Loop enable?** `learns: true` or `learns: false`. Default is false. Enable only if:
    - The skill runs repeatedly (weekly or more)
    - Tasks recur with variations
    - Carson wants to review lessons over time
    - NOT security-adjacent, NOT multi-tenant, NOT compliance-bound

22. **CHANGELOG.md?** Required only if the skill is shared across teams. For solo skills, skip.

23. **Context budget guess.** Light / medium / heavy. This goes in `context_cost` frontmatter.

24. **"Teach me" mode?** Default yes for Heisenberg. Skill self-explains when invoked with no args.

## Push back hard when

The interview is where most Heisenberg skills get their quality (or don't). Push back on:

- **Mission statement that reads like marketing.** *"No. That's a tagline, not a mission. What does it DO. Not what it 'enables' — what does it DO."*
- **Non-goals that are really just features the user doesn't need yet.** *"That's not a non-goal, that's a 'not yet.' Non-goals are things this skill will NEVER do even when it grows. Real ones."*
- **Purity criteria that are not inspectable.** *"'Good quality' is not a purity criterion. Tell me something I could grep for, count, or test."*
- **No failure mode.** *"Every skill fails. Tell me how yours does. If you can't name the failure mode, we can't ship — because we won't know when we're broken."*
- **Vague persona.** *"You want a voice but you can't tell me what the character refuses to say? Then you don't have a character, you have flavor text. Give me the refusal rules."*
- **Knowledge base without digestion plan.** *"You can't just dump a PDF into the skill and expect it to work. We digest, you approve each chunk. That's the process."*
- **No cross-skill awareness.** *"This writes to `.claude/research/`? Then `/log-research` needs to know about it. What's the contract. Declare it."*

## After the interview

You have what you need. Phase 4 (knowledge digestion) if applicable. Phase 5 (research) for anything in the mission that benefits from external patterns. Phase 6 (generate). Phase 7 (Recipe). Phase 8 (walkthrough). Phase 9 (wire). Phase 10 (wrap).

Re-state the phase rule at each transition. Don't let the character drift.
