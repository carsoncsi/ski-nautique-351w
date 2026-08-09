# Scripts

Deterministic logic lives here. Code runs via bash — Claude gets the output, never the code itself. Cheapest knowledge tier.

**Default to Node** (`node scripts/<name>.js`) — it's present on every machine Carson works on (Vercel/JS stack, no separate Python dependency). Use another runtime only if the skill genuinely needs it, and declare it as a dependency.

## What belongs here

- **Validation** (`validate.js`) — input pre-flight checks
- **Lookups** (`glossary.js`, `lookup.js`) — prints definitions or routing info for a given term
- **Transformations** — format conversions, data cleaning
- **Purity checks** — does a produced output hit the acceptance criteria?
- **Learning Loop audits** (`learning-audit.js`) — check lesson health

## What does NOT belong here

- Judgment calls (those need the model — write them as instructions in SKILL.md)
- Persona / voice logic (context-dependent, belongs in reference/persona.md)
- Anything requiring natural-language reasoning about ambiguous input

## Convention

- Each script is invocable standalone: `node scripts/<name>.js <args>`
- Exit code 0 = success, non-zero = failure
- Output goes to stdout; errors go to stderr
- Keep scripts small and single-purpose — a script > 200 lines should probably be multiple scripts

## Why scripts save context

When Claude runs a script via bash, only the **output** enters the context, not the code. A 500-line script that prints 5 lines of output adds 5 lines of context — not 505.

For deterministic work, this is an order-of-magnitude savings vs. writing the same logic as prose instructions.
