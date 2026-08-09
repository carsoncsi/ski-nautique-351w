# Reflection — Run 2026-08-09 (cook: quint, Heisenberg tier)

## What happened

Full Heisenberg cook for a marine parts-sourcing skill. Phase 4 skipped (no source material to
digest — Carson had no manuals). Phase 5 ran four parallel R2 workers over 17 questions across
four themes. Two plan-level reversals came back from research, one of which was a refutation of
a hypothesis I had supplied in the worker prompt. Phase 8 walkthroughs found four real holes,
all fixed before ship. One generated script shipped with a silent-failure bug that testing
caught.

## Candidate lessons

### C1 — Test generated scripts with a domain-realistic query, not a placeholder
- **Trigger:** Any cook that generates a script taking user input (search builders, validators,
  formatters)
- **Action:** Run the script against a query drawn from the skill's actual domain vocabulary
  before shipping. A generic smoke test ("test", "foo") exercises the code path but not the
  data collision.
- **Evidence:** 2026-08-09 — `ebay-search.js` shipped a universal exclusion list containing
  `cover`, `manual`, `model`. The realistic test query "351 windsor timing **cover**" emitted
  `-cover`, which would have silently cancelled every search for a timing cover — returning
  zero results that read as "no inventory exists." A placeholder query would never have hit it.
  Found only because the test used real domain terms.
- **Confidence:** 1/1

### C2 — Instruct R2 workers to refute the orchestrator's stated hypothesis, by name
- **Trigger:** Any R1 scope where the orchestrator supplies a working hypothesis to a worker
- **Action:** State the hypothesis in the worker prompt AND explicitly instruct the worker to
  verify or refute it. Do not present it as background context — background context gets
  confirmed, not tested.
- **Evidence:** 2026-08-09 — the 351W worker was told "Velvet Drive / Borg Warner is the working
  hypothesis — verify or refute." It returned a refutation on four independent lines of catalog
  evidence, including a manufacturer catalog listing two different mufflers keyed to the two
  transmission ratios. Had the hypothesis been stated as plain context, confirmation bias makes
  a confirming answer far more likely. The refutation changed which parts family every future
  run searches.
- **Confidence:** 1/1

### C3 — Cross-theme synthesis is the orchestrator's job and it must be done explicitly
- **Trigger:** Any R2 fan-out with 2+ workers on related themes
- **Action:** After collation and before R4, explicitly ask: *what does theme A's finding imply
  when combined with theme B's finding?* No worker can see across the partition; if the
  orchestrator does not do this deliberately, the highest-value finding of the round may not
  exist in any worker's output.
- **Evidence:** 2026-08-09 — the marinization worker established that a mechanical fuel pump is
  the cheapest compliant path and that PCM still sells one. The engine worker separately found
  that on 1988+ Ford small blocks the fuel pump provision may live on the *timing cover*. Carson
  was already planning to transfer PCM's timing cover. The combination — that the transfer may
  restore mechanical fuel pump capability and collapse an entire compliance subsystem — appeared
  in neither worker's JSON. It became the top recommendation of the whole round.
- **Confidence:** 1/1

### C4 — Walk a persona-vs-user-autonomy conflict during Phase 8, not at runtime
- **Trigger:** Any Heisenberg cook where pushback calibration is set to REFUSE
- **Action:** Add a Phase 8 walkthrough in which the user explicitly overrides the refusal.
  Resolve it in the persona file before ship.
- **Evidence:** 2026-08-09 — quint's charter sets REFUSE on safety. Walkthrough W4 ("give me
  the cheap one anyway, it's my boat") exposed that the charter alone produced no answer, and
  the likely runtime behavior was an argument loop. Resolution written into persona.md: refuse
  once completely, then respect the decision, keep the verdict factually accurate, and log it
  as accepted risk. A REFUSE-posture skill without this walk will eventually nag its user.
- **Confidence:** 1/1
