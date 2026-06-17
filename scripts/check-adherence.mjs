#!/usr/bin/env node
// Token-adherence check for the Искра.DCI design system.
// Mirrors the intent of _adherence.oxlintrc.json: component CSS must consume
// design tokens (CSS custom properties), not raw hex colours. Raw hex is only
// allowed as a var() fallback (e.g. `var(--accent,#00FFC2)`), inside the tokens
// package, or on a line tagged with `@ds-adherence-ignore`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SCAN_DIRS = ['packages/react/src', 'packages/dci-react/src', 'packages/vue/src'];
const HEX = /#[0-9a-fA-F]{3,8}\b/;

/** A hex is OK if it appears as the fallback argument of a var(). */
function hexIsVarFallback(line, index) {
  const before = line.slice(0, index);
  const open = before.lastIndexOf('var(');
  if (open === -1) return false;
  const between = before.slice(open);
  return between.includes(',') && !between.includes(')');
}

function walk(dir, out) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(css|tsx?|vue)$/.test(name)) out.push(full);
  }
  return out;
}

const violations = [];
for (const d of SCAN_DIRS) {
  for (const file of walk(join(ROOT, d), [])) {
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (line.includes('@ds-adherence-ignore')) return;
      const m = HEX.exec(line);
      if (m && !hexIsVarFallback(line, m.index)) {
        violations.push(`${relative(ROOT, file)}:${i + 1}  ${line.trim()}`);
      }
    });
  }
}

if (violations.length) {
  console.error('Token-adherence violations (raw hex outside var() fallback):\n');
  console.error(violations.join('\n'));
  console.error(`\n${violations.length} violation(s). Use design tokens instead of raw hex.`);
  process.exit(1);
}
console.log('Token adherence OK — no raw hex outside var() fallbacks.');
