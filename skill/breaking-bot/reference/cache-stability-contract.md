# Cache Stability Contract

Rules for generated SKILL.md content to stay cacheable. Single-char diffs in cached content cause cache misses. A cache miss in production has caused documented 20x cost spikes. This isn't style — it's downside protection.

## The Anthropic prompt cache

- **5-minute TTL** default. Every cache hit resets the clock — free refresh on use.
- **Cache prefix order is fixed:** tools → system → messages. Each layer builds on the prior.
- **Lookback ~20 blocks** — longest matching prefix wins automatically.
- **Up to 4 explicit breakpoints**, 1 automatic.

**Single char diff at position N invalidates everything from N to end.** That's the threat model.

## Rules for every SKILL.md Breaking Bot generates

### Forbidden in the SKILL.md body

- ❌ **Timestamps.** No `updated: 2026-04-19`, no `generated: ...`, no date-in-body. These change on every regeneration and invalidate cache.
- ❌ **Per-invocation dynamic content.** Nothing templated at load time. No `{{user.name}}`, no `${SESSION_ID}` interpolated into static text.
- ❌ **Random ordering.** If a list is present, it stays in the same order across generations. Don't shuffle.
- ❌ **Counter values or run numbers.** These belong in `scratch/`, not SKILL.md.
- ❌ **Network-dependent strings.** No "last fetched at," no live-resolved URLs that could vary.

### Required structure for cache-friendliness

- ✅ **Static content first, variable content last.** Persona, workflow, and rules at the top (stable). Any user-facing variable content at the bottom.
- ✅ **Stable section ordering.** Same section headers in the same order, every generation.
- ✅ **Tool references before message content.** Breaking Bot's generated SKILL.md should reference any tools/scripts in early sections so they land in cached prefix.
- ✅ **Line-level stability.** A refresh shouldn't rewrite unchanged sections. Breaking Bot preserves untouched content when regenerating.

### Permitted dynamic content — but isolated

Dynamic content CAN exist, but only in files that are NOT SKILL.md:

- `CHANGELOG.md` — timestamps fine here
- `scratch/reflections/<run-id>.md` — timestamped by design
- `reference/lessons.md` — may include promotion date per lesson

These files are either loaded rarely or never cached as part of SKILL.md prefix.

## The cache audit

Phase 6 (Generate) ends with a cache audit. Breaking Bot checks the generated SKILL.md against these patterns:

```
FAIL if SKILL.md contains:
  - \d{4}-\d{2}-\d{2}       (date pattern)
  - timestamp|last.updated|generated.on   (case-insensitive)
  - \{\{.+\}\}               (Jinja-style template vars in body)
  - \$\{.+\}                 (shell-style vars in body)
  - "Run #\d+"               (counter patterns)
```

If any match, Breaking Bot refuses to ship and surfaces the violation to Carson.

## The deeper rule

**The SKILL.md body is an immutable contract between the skill and the cache.** Once written, it doesn't change until the skill is deliberately updated. Every dynamic concern lives elsewhere — in scripts (which execute, don't cache), in scratch (which is ephemeral), in the conversation itself.

If you find yourself wanting to put something dynamic in SKILL.md, the right move is:
1. Is it deterministic given inputs? → script
2. Is it per-run state? → scratch
3. Is it configuration? → frontmatter
4. Is it reference data? → `reference/*.md`
5. Is it genuinely unchanging across runs? → SKILL.md is fine

## Why this matters so much

Elite skills get invoked often. A skill that's cheap at first invocation and expensive on every subsequent one because the cache keeps missing is worse than a skill that's expensive once and free forever after.

The cache pays for itself on second invocation within 5 minutes. If Carson uses Breaking Bot to cook a skill, then immediately invokes that skill to test it — that second invocation should be near-free. If it's not, we lost money for no reason.

Cache stability is the difference between elite and wasteful.
