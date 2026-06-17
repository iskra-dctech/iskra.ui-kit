# @iskra-dci/react

## 0.2.0

### Minor Changes

- 4cc6b90: Initial Искра.DCI design system foundation:

  - `@iskra-dci/tokens` — DTCG token sources compiled with Style Dictionary into CSS
    variables (dark default + `theme-cold` / `theme-warm`) and typed TS maps. Existing
    variable names (`--bg`, `--accent`, `--s1..s8`, …) preserved for compatibility.
  - `@iskra-dci/styles` — reset, fonts and element styles bundled with the token layer.
  - `@iskra-dci/icons` — framework-agnostic outline icon set.
  - `@iskra-dci/react` — 21 typed, accessible components (primitives + patterns) with
    co-located CSS bundled into a single `styles.css`, Storybook stories and Vitest +
    `vitest-axe` coverage.

### Patch Changes

- 4cc6b90: Vue-ready core extraction + Vue package:

  - `@iskra-dci/core` — framework-agnostic headless layer: `getNextTabValue` roving
    resolver, `createTabsIds`, `disclosureReducer`, `createFocusTrap`/`getFocusable`,
    `createId` and keyboard helpers. Fully unit-tested.
  - `@iskra-dci/vue` — Vue 3 components (Button, Badge, Spinner, Switch, Alert, Card +
    Header/Body/Footer, TextField, Tabs, Icon) with public-API parity to React, driven by
    the shared core and reusing the identical `ik-*` token-based styles.
  - `@iskra-dci/react` — `Tabs` now consumes `@iskra-dci/core` for its keyboard/id logic.

- Updated dependencies [4cc6b90]
- Updated dependencies [4cc6b90]
  - @iskra-dci/core@0.2.0
  - @iskra-dci/icons@0.2.0
