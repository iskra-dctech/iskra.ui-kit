# @iskra-ui/tokens

## 0.1.1

### Patch Changes

- Add npm package metadata (repository, homepage, bugs, keywords), per-package README, Apache-2.0 license, and fix changelog scope/version alignment for `@iskra-ui/*`.

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

- 4cc6b90: Initial Искра.DCI design system foundation:

  - `@iskra-ui/tokens` — DTCG token sources compiled with Style Dictionary into CSS
    variables (dark default + `theme-cold` / `theme-warm`) and typed TS maps. Existing
    variable names (`--bg`, `--accent`, `--s1..s8`, …) preserved for compatibility.
  - `@iskra-ui/styles` — reset, fonts and element styles bundled with the token layer.
  - `@iskra-ui/icons` — framework-agnostic outline icon set.
  - `@iskra-ui/react` — 21 typed, accessible components (primitives + patterns) with
    co-located CSS bundled into a single `styles.css`, Storybook stories and Vitest +
    `vitest-axe` coverage.
