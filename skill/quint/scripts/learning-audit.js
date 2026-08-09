#!/usr/bin/env node
/**
 * Learning Loop health check for quint.
 *
 * Answers: is the Loop actually working, or is it accumulating drafts nobody promotes?
 *
 * Usage:   node scripts/learning-audit.js
 * Exit:    0 = healthy | 1 = attention needed | 2 = unexpected error
 */

const fs = require('fs');
const path = require('path');

const SKILL_ROOT = path.resolve(__dirname, '..');
const REFLECTIONS = path.join(SKILL_ROOT, 'scratch', 'reflections');
const LESSONS = path.join(SKILL_ROOT, 'reference', 'lessons.md');
const CHARTER = path.join(SKILL_ROOT, 'CHARTER.md');

const PROMOTION_THRESHOLD = 3;

function readReflections() {
  if (!fs.existsSync(REFLECTIONS)) return [];
  return fs
    .readdirSync(REFLECTIONS)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => ({
      file: f,
      body: fs.readFileSync(path.join(REFLECTIONS, f), 'utf8'),
    }));
}

/** Candidate headings look like:  ### C1 — some name */
function extractCandidates(body) {
  const out = [];
  const re = /^###\s+C\d+\s+—\s+(.+)$/gm;
  let m;
  while ((m = re.exec(body)) !== null) out.push(m[1].trim().toLowerCase());
  return out;
}

function countPromoted() {
  if (!fs.existsSync(LESSONS)) return 0;
  const body = fs.readFileSync(LESSONS, 'utf8');
  return (body.match(/^###\s+L\d+\s+—/gm) || []).length;
}

function main() {
  const notes = [];
  const problems = [];

  if (!fs.existsSync(CHARTER)) {
    problems.push('CHARTER.md is missing. The Loop has no immutable anchor.');
  }

  const reflections = readReflections();
  const promoted = countPromoted();

  // Tally candidate themes across reflections.
  const tally = new Map();
  for (const r of reflections) {
    for (const c of extractCandidates(r.body)) {
      tally.set(c, (tally.get(c) || 0) + 1);
    }
  }

  const ripe = [...tally.entries()].filter(([, n]) => n >= PROMOTION_THRESHOLD);

  console.log('LEARNING LOOP — quint');
  console.log(`  reflections on file : ${reflections.length}`);
  console.log(`  distinct candidates : ${tally.size}`);
  console.log(`  promoted lessons    : ${promoted}`);

  if (ripe.length) {
    console.log(`\n  READY FOR PROMOTION (${PROMOTION_THRESHOLD}+ occurrences):`);
    for (const [name, n] of ripe) console.log(`    - ${name} (${n} runs)`);
    notes.push('Surface the ripe candidates at the start of the next run.');
  }

  // Health signals.
  if (reflections.length >= 10 && promoted === 0) {
    problems.push(
      'Ten or more reflections and zero promotions. Either the gate is never being ' +
      'surfaced, or reflection quality is too low to promote. Check both.'
    );
  }
  if (reflections.length === 0) {
    notes.push('No reflections yet. Expected on a new skill — not a problem.');
  }
  if (tally.size > 0 && ripe.length === 0) {
    notes.push(
      `Candidates exist but none has hit ${PROMOTION_THRESHOLD} occurrences yet. ` +
      'Working as designed.'
    );
  }

  if (notes.length) {
    console.log('\n  NOTES:');
    for (const n of notes) console.log(`    - ${n}`);
  }
  if (problems.length) {
    console.log('\n  ATTENTION:');
    for (const p of problems) console.log(`    - ${p}`);
    return 1;
  }
  console.log('\n  Status: healthy.');
  return 0;
}

try {
  process.exit(main());
} catch (e) {
  console.error(`UNEXPECTED ERROR: ${e.message}`);
  process.exit(2);
}
