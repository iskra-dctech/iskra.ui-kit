# @iskra-dci/core

## 0.2.0

### Minor Changes

- 4cc6b90: Vue-ready core extraction + Vue package:

  - `@iskra-dci/core` — framework-agnostic headless layer: `getNextTabValue` roving
    resolver, `createTabsIds`, `disclosureReducer`, `createFocusTrap`/`getFocusable`,
    `createId` and keyboard helpers. Fully unit-tested.
  - `@iskra-dci/vue` — Vue 3 components (Button, Badge, Spinner, Switch, Alert, Card +
    Header/Body/Footer, TextField, Tabs, Icon) with public-API parity to React, driven by
    the shared core and reusing the identical `ik-*` token-based styles.
  - `@iskra-dci/react` — `Tabs` now consumes `@iskra-dci/core` for its keyboard/id logic.
