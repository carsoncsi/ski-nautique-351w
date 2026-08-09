# R5 — Verification Gate

The load-bearing checkpoint. Every research pass passes through here. Silent baking is forbidden.

This is a hard gate — the 8-section presentation below **is** the Gate Schema (`~/.claude/skills/_shared/gate-schema.md`) in long form: Goal restated = `summary`, TL;DR + Findings = `evidence`, Honest uncertainty = `gaps`, What surprised me + Conflicts = `strongest_objection`. Make the two non-negotiables explicit: state `limits_hit` (searches time-boxed, sources you couldn't reach, sampling) and a one-line `recommendation` (bake as-is / bake with the flagged conflicts resolved first).

## The presentation format

When presenting R4 findings to Carson in R5, follow this structure:

### 1. Goal restated

Pin the goal from R1 at the top. Verbatim. This is the touchstone.

### 2. TL;DR

5-10 bullets. The findings that most matter. Each with a one-line summary and a citation anchor. Carson should be able to read only this and know what to approve.

### 3. Findings by theme

Organized the same way as the scope. Each theme section:
- The question(s) it answers
- The finding
- Inline citations (URLs)
- If conflicting sources: conflict explicitly flagged

### 4. Plan revisions (if the research touches an existing plan)

Specific changes the research suggests to the current plan. Each change:
- What to change
- Why (cite the finding)
- Optional: how to change it

### 5. Honest uncertainty

Areas where evidence is thin. Be explicit. *"I could not find a definitive answer on X. The closest thing is Y, but it's folklore."*

### 6. Conflicts between sources

Contradictions you found in the research. State them explicitly. Propose a resolution or defer to Carson.

### 7. What surprised me

Findings that challenge the plan or common assumption. This is often where the real value is — surfacing something the builder didn't expect.

### 8. Sources

Full URL list with one-line notes on what each contributed.

## The verification questions

Present with specific questions for Carson. Examples:

> Before R6 bakes these findings, I need your sign-off.
>
> 1. **Are these findings on target?** Anything answering the wrong question?
> 2. **Are there findings you want to challenge?** Any source you don't trust?
> 3. **Anything missing?** A question you wanted answered that didn't land?
> 4. **Plan revisions** — approve or redline each one specifically?
> 5. **Uncertainty** — want me to dig deeper on anything, or accept the thin evidence?
>
> Sign off each point, or expand where needed.

Wait. Don't proceed without explicit approval.

## Carson's possible responses

### Approve all
→ Proceed to R6. Bake findings into skill files.

### Approve some, challenge others
→ For each challenge: Carson's position becomes the finding, or the existing finding gets flagged as contested. Carson chooses.
→ Bake approved findings, flag contested ones.

### Request more research
→ Return to R2 for specific gaps.
→ Scope the new research narrowly. Don't re-run the entire protocol for one gap.

### Reject the entire draft
→ Return to R1. Revise scope. Try again.
→ Usually means the scope was wrong — revisit what questions need answering.

## Anti-drift check during R5

At R5, explicitly ask yourself (before showing Carson):

- **Did the findings address the R1 questions?** If not, we drifted. Flag it.
- **Does the "What Surprised Me" section contradict the pinned goal?** If yes, we may be answering a different question than we set out to.
- **Are any findings cited only with folklore sources?** Flag as low-confidence.
- **Does the draft include sections we didn't scope?** Flag as scope creep.

If any of these hit, tell Carson up front: *"I drifted here. Do you want these tangential findings preserved, or cut them to stay on scope?"*

## Red flags from Carson during R5

- **Rubber-stamping without reading.** If Carson says "looks good" in 10 seconds on a 2000-word draft, ask: *"Did you check the finding on X? It contradicts the plan."* Make him engage.
- **Rejecting the entire draft without specifics.** Ask: *"What specifically do you want me to revisit? Scope? Sources? Conclusions?"*
- **Approving findings that contradict his stated goal.** Flag the contradiction. *"You approved finding 4, but finding 4 says we should X — and your goal is not-X. Which wins?"*

## Why R5 is non-negotiable

Research findings baked silently into skill files become part of the skill's behavior. Weeks later, nobody remembers which claim came from a solid source vs. folklore. The skill slowly drifts into confidence based on unverified input.

The R5 gate is expensive (takes Carson's time) but it's the single feature that prevents long-term rot. Skip it at your peril.

## What R6 gets

After R5 approval, R6 bakes the approved findings:

- Findings go into `reference/*.md` or `knowledge/*.md`
- Every baked claim has its source cited inline
- A `reference/sources.md` is appended to or created with the full list
- Contested/uncertain findings get explicitly flagged as such in the baked files

R6 never bakes anything not in the approved draft. If new material comes up during R6, that's a prompt to return to R2 or R4, not to silently add.
