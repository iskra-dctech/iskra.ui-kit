---
'@iskra-dci/tokens': minor
'@iskra-dci/styles': minor
'@iskra-dci/icons': minor
'@iskra-dci/react': minor
---

Initial Искра.DCI design system foundation:

- `@iskra-dci/tokens` — DTCG token sources compiled with Style Dictionary into CSS
  variables (dark default + `theme-cold` / `theme-warm`) and typed TS maps. Existing
  variable names (`--bg`, `--accent`, `--s1..s8`, …) preserved for compatibility.
- `@iskra-dci/styles` — reset, fonts and element styles bundled with the token layer.
- `@iskra-dci/icons` — framework-agnostic outline icon set.
- `@iskra-dci/react` — 21 typed, accessible components (primitives + patterns) with
  co-located CSS bundled into a single `styles.css`, Storybook stories and Vitest +
  `vitest-axe` coverage.
