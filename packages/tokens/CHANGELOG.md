# @iskra-dci/tokens

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

- 4cc6b90: Initial Искра.DCI design system foundation:

  - `@iskra-dci/tokens` — DTCG token sources compiled with Style Dictionary into CSS
    variables (dark default + `theme-cold` / `theme-warm`) and typed TS maps. Existing
    variable names (`--bg`, `--accent`, `--s1..s8`, …) preserved for compatibility.
  - `@iskra-dci/styles` — reset, fonts and element styles bundled with the token layer.
  - `@iskra-dci/icons` — framework-agnostic outline icon set.
  - `@iskra-dci/react` — 21 typed, accessible components (primitives + patterns) with
    co-located CSS bundled into a single `styles.css`, Storybook stories and Vitest +
    `vitest-axe` coverage.
