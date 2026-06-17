# @iskra-ui/dci-react

## 0.1.1

### Patch Changes

- Add npm package metadata (repository, homepage, bugs, keywords), per-package README, Apache-2.0 license, and fix changelog scope/version alignment for `@iskra-ui/*`.
- Updated dependencies
  - @iskra-ui/icons@0.1.1
  - @iskra-ui/core@0.1.1
  - @iskra-ui/react@0.1.1

## 0.1.0

### Minor Changes

- 4cc6b90: Domain layer + white-label:

  - `@iskra-ui/dci-react` — Искра.DCI domain components built on the foundation:
    `DeviceCard`, `FleetPulse`, `CliRow`, `DriftToast`, `ApiKeyModal`. Stories + tests
    included.
  - `@iskra-ui/tokens` — white-label brand packs: drop a
    `src/brands/<name>.json` accent override and it compiles to a `.brand-<name>`
    selector (composes on top of any theme) plus a typed `brands` map. Ships an
    example `brand-aurora`.
  - Repo: added a legacy-import codemod (`scripts/codemod-legacy-imports.mjs`) and
    `MIGRATION.md` for moving off the retired skill artifact.

### Patch Changes

- Updated dependencies [4cc6b90]
- Updated dependencies [4cc6b90]
  - @iskra-ui/core@0.1.0
  - @iskra-ui/react@0.1.0
  - @iskra-ui/icons@0.1.0
