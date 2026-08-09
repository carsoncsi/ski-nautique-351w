# Heisenberg Mode Template

Full scaffold for an elite skill. Everything here gets filled in during a Heisenberg-tier cook.

## Files to generate (in order)

Always:
1. **CHARTER.md** — immutable purpose, non-goals, invariants
2. **SKILL.md** — the routing layer, ≤3k tokens
3. **reference/philosophy.md** — principles the skill won't violate
4. **reference/principles.md** — core knowledge digested from sources
5. **reference/gotchas.md** — failure modes + anti-patterns (the most valuable file)
6. **reference/walkthroughs.md** — Phase 8 test-invocation walkthroughs (feature #18)
7. **reference/sources/** — raw source material, never auto-loaded
8. **scripts/validate.js** — input pre-flight (Node; see `scripts/README.md`)
9. **scripts/README.md** — what belongs in scripts
10. **THE-RECIPE.md** — Heisenberg's parting letter (one-time read)

Conditional — generate ONLY when the trigger holds, and prune the matching SKILL.md links if you don't:
11. **reference/persona.md** — *if this skill has a persona*
12. **reference/frameworks.md** — *if digestion produced mental models*
13. **reference/examples.md** — *if digestion produced worked examples*
14. **reference/lessons.md** — *if `learns: true`* (starts empty, grows via Learning Loop)
15. **reference/learning-loop.md** — *if `learns: true`* (the loop architecture doc)
16. **scripts/learning-audit.js** — *if `learns: true`* (lesson health check)
17. **scratch/reflections/README.md** — *if `learns: true`* (append-only log)
18. **CHANGELOG.md** — *if shared across teams*
19. **`knowledge_last_refreshed:` frontmatter** — *if knowledge-heavy* (feature #15)

## Placeholders

All templates use `{{PLACEHOLDER}}` format. Breaking Bot fills from interview + research + knowledge digestion answers. Any unfilled placeholder in a generated skill is a bug — surface to Carson before shipping.

## Audit checklist (Phase 8 test walkthrough)

Before shipping a Heisenberg-mode skill, verify:

- [ ] SKILL.md is ≤3k tokens
- [ ] No timestamps or dynamic content in SKILL.md body (cache stability)
- [ ] CHARTER.md exists and has mission + non-goals + invariants
- [ ] Purity criteria are specific and inspectable (not "quality")
- [ ] Trigger phrases listed (4-6 minimum)
- [ ] "When NOT to use" section populated
- [ ] Output contract declared
- [ ] Dependencies declared
- [ ] Workflow embedding map populated
- [ ] Gotchas file has real failure modes (not generic)
- [ ] `reference/walkthroughs.md` exists with 2-3 completed walkthroughs (feature #18)
- [ ] If gated (interview/planning/irreversible steps): `## Gates` section present, references `_shared/gate-schema.md` (feature #19)
- [ ] If knowledge-heavy: `knowledge_last_refreshed:` in frontmatter (feature #15)
- [ ] If `learns: true`: scratch/reflections/, lessons.md, learning-loop.md, and scripts/learning-audit.js all present; if `learns: false`, the `## Learning Loop` section and its links are DELETED
- [ ] If has persona: persona.md with refusal rules, voice-on/off mapping, phase boundary rule
- [ ] Philosophy.md has 3-7 principles with why + in-practice
- [ ] Cold start example works in 30 seconds
- [ ] `scripts/validate.js` has REAL checks filled in — no surviving `{{PLACEHOLDER}}` (an empty validator prints "PRE-FLIGHT OK" while checking nothing)
- [ ] Every "Further reading" link resolves to a file that was actually generated (no links to pruned conditional files)

## Hand-off to Carson

After generation, run `ls -R` on the generated skill and show Carson the tree. Point him at THE-RECIPE.md first — that's the most important thing you give him. Then wrap in full Heisenberg voice.
