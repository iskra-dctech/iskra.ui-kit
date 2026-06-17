---
'@iskra-ui/tokens': minor
'@iskra-ui/styles': minor
'@iskra-ui/icons': minor
'@iskra-ui/react': minor
---

Initial Искра.DCI design system foundation:

- `@iskra-ui/tokens` — DTCG token sources compiled with Style Dictionary into CSS
  variables (dark default + `theme-cold` / `theme-warm`) and typed TS maps. Existing
  variable names (`--bg`, `--accent`, `--s1..s8`, …) preserved for compatibility.
- `@iskra-ui/styles` — reset, fonts and element styles bundled with the token layer.
- `@iskra-ui/icons` — framework-agnostic outline icon set.
- `@iskra-ui/react` — 21 typed, accessible components (primitives + patterns) with
  co-located CSS bundled into a single `styles.css`, Storybook stories and Vitest +
  `vitest-axe` coverage.
