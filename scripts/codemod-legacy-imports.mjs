#!/usr/bin/env node
// Migration codemod: rewrites imports from the retired Искра.DCI "skill" artifact
// (self-injecting `_ds_bundle.js` / loose `components/*` files) onto the published
// scoped packages. CSS variable names are unchanged, so no token churn is needed.
//
// Usage:
//   node scripts/codemod-legacy-imports.mjs <dir> [--write]
//
// Without --write it runs as a dry-run and only reports the files it would change.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TARGET = process.argv[2];
const WRITE = process.argv.includes('--write');
const EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.vue']);

if (!TARGET) {
  console.error('usage: node scripts/codemod-legacy-imports.mjs <dir> [--write]');
  process.exit(1);
}

// Rewrite rules applied to the *module specifier* of each import.
const SPECIFIER_RULES = [
  // The old all-in-one bundle and loose component paths → the react package.
  [/^(.*\/)?_ds_bundle(\.js)?$/, '@iskra-dci/react'],
  [/^(\.{1,2}\/)+components\/[A-Za-z]+(\/[A-Za-z]+(\.jsx?)?)?$/, '@iskra-dci/react'],
  // Legacy token stylesheet → the styles bundle.
  [/^(.*\/)?colors_and_type\.css$/, '@iskra-dci/styles/index.css'],
];

const importRe = /(\bfrom\s+|\bimport\s+)(['"])([^'"]+)\2/g;

function rewrite(source) {
  let changed = false;
  const out = source.replace(importRe, (full, kw, q, spec) => {
    for (const [re, replacement] of SPECIFIER_RULES) {
      if (re.test(spec)) {
        changed = true;
        return `${kw}${q}${replacement}${q}`;
      }
    }
    return full;
  });
  return { out, changed };
}

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) files.push(...walk(full));
    else if (EXT.has(extname(name))) files.push(full);
  }
  return files;
}

let touched = 0;
for (const file of walk(TARGET)) {
  const src = readFileSync(file, 'utf8');
  const { out, changed } = rewrite(src);
  if (changed) {
    touched += 1;
    console.log(`${WRITE ? 'rewrote' : 'would rewrite'}: ${file}`);
    if (WRITE) writeFileSync(file, out);
  }
}

console.log(`\n${touched} file(s) ${WRITE ? 'updated' : 'to update'}.`);
