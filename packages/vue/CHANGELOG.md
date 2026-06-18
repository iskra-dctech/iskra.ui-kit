# @iskra-ui/vue

## 0.2.0

### Minor Changes

- 7e62780: Add Notifier shell components: AppHeader, SearchField, Popover; composable Sidebar with NOTIFIER_NAV preset; Table column sort/filter; Avatar status ring; domain icons for devices and messengers.

### Patch Changes

- Updated dependencies [7e62780]
  - @iskra-ui/icons@0.2.0
  - @iskra-ui/core@0.2.0

## 0.1.1

### Patch Changes

- Add npm package metadata (repository, homepage, bugs, keywords), per-package README, Apache-2.0 license, and fix changelog scope/version alignment for `@iskra-ui/*`.
- Updated dependencies
  - @iskra-ui/icons@0.1.1
  - @iskra-ui/core@0.1.1

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

### Patch Changes

- Updated dependencies [4cc6b90]
- Updated dependencies [4cc6b90]
  - @iskra-ui/core@0.1.0
  - @iskra-ui/icons@0.1.0
