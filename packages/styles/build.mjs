// @iskra-ui/styles build — assembles a single self-contained stylesheet:
//   tokens (from @iskra-ui/tokens) + fonts + reset + element classes.
// Also emits granular files so consumers can opt in to just the pieces they need.
import { mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');
const FONTS_SRC = join(ROOT, '..', '..', 'fonts');
const require = createRequire(import.meta.url);

const tokensCss = readFileSync(require.resolve('@iskra-ui/tokens/tokens.css'), 'utf8');

rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, 'fonts'), { recursive: true });

// Vendor the fonts into the package so it is self-contained when published.
for (const f of ['Inter-VariableFont_opsz_wght.ttf', 'JetBrainsMono_wght_.ttf']) {
  copyFileSync(join(FONTS_SRC, f), join(DIST, 'fonts', f));
}

const fonts = readFileSync(join(SRC, 'fonts.css'), 'utf8');
const reset = readFileSync(join(SRC, 'reset.css'), 'utf8');
const elements = readFileSync(join(SRC, 'elements.css'), 'utf8');

// Granular outputs.
writeFileSync(join(DIST, 'tokens.css'), tokensCss);
writeFileSync(join(DIST, 'fonts.css'), fonts);
writeFileSync(join(DIST, 'reset.css'), reset);
writeFileSync(join(DIST, 'elements.css'), elements);

// One-stop stylesheet (order matters: fonts → tokens → reset → elements).
const header = '/* Искра.DCI — @iskra-ui/styles bundle (GENERATED, do not edit). */\n\n';
const bundle = header + [fonts, tokensCss, reset, elements].join('\n\n') + '\n';
writeFileSync(join(DIST, 'index.css'), bundle);

console.log('@iskra-ui/styles: built index.css + granular files + vendored fonts.');
