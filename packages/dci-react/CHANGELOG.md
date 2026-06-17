# @iskra-dci/dci-react

## 0.2.0

### Minor Changes

- 4cc6b90: Domain layer + white-label:

  - `@iskra-dci/dci-react` — Искра.DCI domain components built on the foundation:
    `DeviceCard`, `FleetPulse`, `CliRow`, `DriftToast`, `ApiKeyModal`. Stories + tests
    included.
  - `@iskra-dci/tokens` — white-label brand packs: drop a
    `src/brands/<name>.json` accent override and it compiles to a `.brand-<name>`
    selector (composes on top of any theme) plus a typed `brands` map. Ships an
    example `brand-aurora`.
  - Repo: added a legacy-import codemod (`scripts/codemod-legacy-imports.mjs`) and
    `MIGRATION.md` for moving off the retired skill artifact.

### Patch Changes

- Updated dependencies [4cc6b90]
- Updated dependencies [4cc6b90]
  - @iskra-dci/core@0.2.0
  - @iskra-dci/react@0.2.0
  - @iskra-dci/icons@0.2.0
