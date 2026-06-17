---
'@iskra-ui/core': minor
'@iskra-ui/vue': minor
'@iskra-ui/react': patch
---

Vue-ready core extraction + Vue package:

- `@iskra-ui/core` — framework-agnostic headless layer: `getNextTabValue` roving
  resolver, `createTabsIds`, `disclosureReducer`, `createFocusTrap`/`getFocusable`,
  `createId` and keyboard helpers. Fully unit-tested.
- `@iskra-ui/vue` — Vue 3 components (Button, Badge, Spinner, Switch, Alert, Card +
  Header/Body/Footer, TextField, Tabs, Icon) with public-API parity to React, driven by
  the shared core and reusing the identical `ik-*` token-based styles.
- `@iskra-ui/react` — `Tabs` now consumes `@iskra-ui/core` for its keyboard/id logic.
