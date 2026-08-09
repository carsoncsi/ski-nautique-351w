#!/usr/bin/env node
/**
 * Input pre-flight validation for quint.
 *
 * Runs before any expensive hunting begins. Fails fast with clear messages.
 * Code never enters Claude's context — only the output (pass/fail + message) does.
 *
 * Usage:   node scripts/validate.js "<part or symptom>"
 *          node scripts/validate.js ledger
 *          node scripts/validate.js               (teach-me mode — always valid)
 *
 * Exit:    0 = passed (warnings may still print) | 1 = validation failed | 2 = unexpected error
 */

const fs = require('fs');
const path = require('path');

const SKILL_ROOT = path.resolve(__dirname, '..');
const REF = (f) => path.join(SKILL_ROOT, 'reference', f);

/** Files the skill genuinely cannot operate without. */
const REQUIRED_FILES = [
  ['the-boat.md', 'the specification ledger — without it every run starts cold'],
  ['marinization.md', 'the safety knowledge base — without it no ignition-protection verdict is possible'],
  ['venues.md', 'the source map — without it there is nowhere to hunt'],
  ['parts-ledger.md', 'the compounding record — without it the run cannot deposit findings'],
];

/** Sub-commands that take no free-text argument. */
const SUBCOMMANDS = new Set(['ledger', 'log', 'teach', 'help']);

function checkDependencies() {
  const errors = [];
  for (const [file, why] of REQUIRED_FILES) {
    if (!fs.existsSync(REF(file))) {
      errors.push(`Missing required file: reference/${file} — ${why}`);
    }
  }
  if (!fs.existsSync(path.join(SKILL_ROOT, 'CHARTER.md'))) {
    errors.push('Missing CHARTER.md — the immutable charter must be present before any run');
  }
  return errors;
}

function checkWarnings() {
  const warnings = [];

  // eBay API is optional — manual browsing is the documented fallback.
  const hasEbayId = !!process.env.EBAY_CLIENT_ID;
  const hasEbaySecret = !!process.env.EBAY_CLIENT_SECRET;
  if (!hasEbayId || !hasEbaySecret) {
    warnings.push(
      'eBay API credentials not set (EBAY_CLIENT_ID / EBAY_CLIENT_SECRET). ' +
      'Structured eBay search is unavailable; falling back to live browsing. ' +
      'See reference/ebay-api.md for setup.'
    );
  }

  // A ledger with unresolved known-unknowns is expected early on, but worth surfacing
  // because it bounds how precise any fitment answer can be.
  try {
    const boat = fs.readFileSync(REF('the-boat.md'), 'utf8');
    const unknowns = (boat.match(/\*\*UNKNOWN\*\*/g) || []).length;
    if (unknowns > 0) {
      warnings.push(
        `Spec ledger has ${unknowns} unresolved known-unknown(s). ` +
        'Serial-gated lookups will be flagged pending rather than resolved. ' +
        'See reference/the-boat.md → "Known unknowns".'
      );
    }
  } catch (_) {
    // Absence is already caught as a hard error above.
  }

  return warnings;
}

function checkInputs(args) {
  const errors = [];
  if (args.length === 0) return errors; // teach-me mode

  const first = args[0].toLowerCase();
  if (SUBCOMMANDS.has(first)) return errors;

  const query = args.join(' ').trim();
  if (query.length < 3) {
    errors.push(`Query too short to hunt on: "${query}". Name a part or describe a symptom.`);
  }
  // A bare manufacturer name is not a job.
  if (/^(pcm|ford|mercruiser|sierra|holley|edelbrock|mallory)$/i.test(query)) {
    errors.push(
      `"${query}" is a manufacturer, not a part. Name the component or the symptom.`
    );
  }
  return errors;
}

function main(args) {
  const errors = [...checkDependencies(), ...checkInputs(args)];
  const warnings = errors.length ? [] : checkWarnings();

  if (errors.length) {
    console.log('PRE-FLIGHT FAILED:');
    for (const e of errors) console.log(`  - ${e}`);
    return 1;
  }

  console.log('PRE-FLIGHT OK');
  for (const w of warnings) console.log(`  ! ${w}`);
  return 0;
}

try {
  process.exit(main(process.argv.slice(2)));
} catch (e) {
  console.error(`UNEXPECTED ERROR: ${e.message}`);
  process.exit(2);
}
