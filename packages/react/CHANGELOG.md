# @iskra-ui/react

## 0.2.0

### Minor Changes

- c5a8fad: Add `useMediaQuery` and `useBreakpoint` responsive hooks with SSR-safe defaults and shared breakpoint constants from tokens.
- e6ebb29: Add `ContextMenu` compound primitive with right-click and click triggers, WAI-ARIA Menu pattern, and Storybook coverage.
- afa23e3: Add mobile V1 primitives `Drawer`, `Sheet`, and `DataList` with component tests and Vue parity.
- 4935d93: Integrate `@iskra-ui/i18n` — components use `useIskraT` for localized strings; sidebar navigation is locale-aware.
- 58f189b: Enhance `Sidebar` with `flattenSidebarItems` / `resolvePrimaryNavItems`, improved mobile navigation, and accessibility.
- 967cecb: Enhance dashboard components and exports; add `recharts` / `react-grid-layout` integration support.
- bc9a0a9: Apply compact mobile CSS (touch-min targets, tighter spacing) to `AppHeader`, `Button`, `Table`, and `Toast`.
- 83fcb0c: Delegate anchor positioning to `@iskra-ui/core` instead of duplicating placement logic in React.

### Patch Changes

- d7728b6: Switch `useMediaQuery` to `useSyncExternalStore` for tear-free reads and align breakpoint constants with CSS custom property token names.
- Updated dependencies
  - @iskra-ui/core@0.2.0
  - @iskra-ui/i18n@0.2.0
  - @iskra-ui/icons@0.2.0
  - @iskra-ui/tokens@0.2.0

## 0.1.2

### Patch Changes

- 7e62780: Add Notifier shell components: AppHeader, SearchField, Popover; composable Sidebar with NOTIFIER_NAV preset; Table column sort/filter; Avatar status ring; domain icons for devices and messengers.
- Updated dependencies [7e62780]
  - @iskra-ui/icons@0.1.2
  - @iskra-ui/core@0.1.2

## 0.1.1

### Patch Changes

- Add npm package metadata (repository, homepage, bugs, keywords), per-package README, Apache-2.0 license, and fix changelog scope/version alignment for `@iskra-ui/*`.
- Updated dependencies
  - @iskra-ui/icons@0.1.1
  - @iskra-ui/core@0.1.1

## 0.1.0

### Minor Changes

- 4cc6b90: Initial Искра.DCI design system foundation:

  - `@iskra-ui/tokens` — DTCG token sources compiled with Style Dictionary into CSS
    variables (dark default + `theme-cold` / `theme-warm`) and typed TS maps. Existing
    variable names (`--bg`, `--accent`, `--s1..s8`, …) preserved for compatibility.
  - `@iskra-ui/styles` — reset, fonts and element styles bundled with the token layer.
  - `@iskra-ui/icons` — framework-agnostic outline icon set.
  - `@iskra-ui/react` — 21 typed, accessible components (primitives + patterns) with
    co-located CSS bundled into a single `styles.css`, Storybook stories and Vitest +
    `vitest-axe` coverage.

### Patch Changes

- 4cc6b90: Vue-ready core extraction + Vue package:

  - `@iskra-ui/core` — framework-agnostic headless layer: `getNextTabValue` roving
    resolver, `createTabsIds`, `disclosureReducer`, `createFocusTrap`/`getFocusable`,
    `createId` and keyboard helpers. Fully unit-tested.
  - `@iskra-ui/vue` — Vue 3 components (Button, Badge, Spinner, Switch, Alert, Card +
    Header/Body/Footer, TextField, Tabs, Icon) with public-API parity to React, driven by
    the shared core and reusing the identical `ik-*` token-based styles.
  - `@iskra-ui/react` — `Tabs` now consumes `@iskra-ui/core` for its keyboard/id logic.

- Updated dependencies [4cc6b90]
- Updated dependencies [4cc6b90]
  - @iskra-ui/core@0.1.0
  - @iskra-ui/icons@0.1.0
