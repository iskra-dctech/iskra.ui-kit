# @iskra-ui/core

## 0.1.2

### Patch Changes

- 7e62780: Add Notifier shell components: AppHeader, SearchField, Popover; composable Sidebar with NOTIFIER_NAV preset; Table column sort/filter; Avatar status ring; domain icons for devices and messengers.

## 0.1.1

### Patch Changes

- Add npm package metadata (repository, homepage, bugs, keywords), per-package README, Apache-2.0 license, and fix changelog scope/version alignment for `@iskra-ui/*`.

## 0.1.0

### Minor Changes

- 4cc6b90: Vue-ready core extraction + Vue package:

  - `@iskra-ui/core` — framework-agnostic headless layer: `getNextTabValue` roving
    resolver, `createTabsIds`, `disclosureReducer`, `createFocusTrap`/`getFocusable`,
    `createId` and keyboard helpers. Fully unit-tested.
  - `@iskra-ui/vue` — Vue 3 components (Button, Badge, Spinner, Switch, Alert, Card +
    Header/Body/Footer, TextField, Tabs, Icon) with public-API parity to React, driven by
    the shared core and reusing the identical `ik-*` token-based styles.
  - `@iskra-ui/react` — `Tabs` now consumes `@iskra-ui/core` for its keyboard/id logic.
