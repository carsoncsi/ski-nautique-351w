# 2026-08-09 — The eccentric "repro" in the reference tree was the wrong part

**Run:** verify PCM `RA080002A` mechanical fuel pump + eccentric against the 1992 F150 351W.

## What happened

Both [`the-boat.md`](../../reference/the-boat.md) and
[`351w-swap.md`](../../reference/351w-swap.md) listed Ford Performance **`M-6287-B302`** as the
"reproduction" of the two-piece Ford eccentric `D5AZ-6287-B` / `D0AZ-6287-A`, tagged
`[canonical]` because the citation pointed at Ford Performance's own catalog.

The citation was real. The **claim built on top of it was not.** `M-6287-B302` is a *one-piece*
eccentric requiring the pre-1973 long (1.375") cam dowel, and the same Ford Performance page
carries the explicit disqualifier: *"Not compatible with stepped faced timing sprocket
originally equipped with two piece fuel pump eccentric."*

A prior run had linked a genuine manufacturer page and then written a sentence the page does not
support — and the `[canonical]` tag laundered it into the ledger as settled.

## Why it matters

This is **F1 — the confident cross-reference** — occurring *inside the skill's own reference
tree*, which is the worst place for it, because Phase 2 explicitly says "check the ledger first;
if the number is already established, Tier 1 is done." A baked wrong number **skips the verifier
by design.** F4 (stale ledger) compounding on top of F1.

Cost if uncaught: $165 for a part that cannot be installed, plus a teardown to discover it.

## The pattern

**A URL next to a claim is not the same as a URL that supports the claim.** The Purity Standard
requires opening every URL in the *output*. It does not currently require re-opening a URL that
is already *baked into a reference file* and being carried forward as established fact.

## Candidate lesson (needs 2 more sightings before promotion)

> When Phase 2 shortcuts Tier 1 because the ledger already has the number, **re-open the
> ledger's own citation** for any part that is load-bearing, expensive, or hard to return.
> Trust the ledger's *existence* of a number; verify the number's *application* against the
> cited page. Baked `[canonical]` tags earn a re-read, not a pass.

## Also this run

- Correct Craft's factory owner's manual (p.78) gave a hull-canonical **5–7 PSI** for PCM
  mechanical pumps — better than any forum source. **The hull's own manual was not in
  `venues.md` as a Tier 1 source.** ManualsLib hosts it. Worth adding.
- A web-search *summary* asserted Sierra `18-7266` crosses to `RA080002A`; the vendor product
  pages showed a different flange ID and no such cross. **Search-result summaries are Tier 3 at
  best, even when they read like catalog data.**
- ebay.com served a bot challenge to the browser. Not bypassed. Tier 2 eBay was unavailable this
  run — logged as a limit, not silently dropped.
