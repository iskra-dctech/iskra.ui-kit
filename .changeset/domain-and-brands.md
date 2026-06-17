---
'@iskra-dci/dci-react': minor
'@iskra-dci/tokens': minor
---

Domain layer + white-label:

- `@iskra-dci/dci-react` — Искра.DCI domain components built on the foundation:
  `DeviceCard`, `FleetPulse`, `CliRow`, `DriftToast`, `ApiKeyModal`. Stories + tests
  included.
- `@iskra-dci/tokens` — white-label brand packs: drop a
  `src/brands/<name>.json` accent override and it compiles to a `.brand-<name>`
  selector (composes on top of any theme) plus a typed `brands` map. Ships an
  example `brand-aurora`.
- Repo: added a legacy-import codemod (`scripts/codemod-legacy-imports.mjs`) and
  `MIGRATION.md` for moving off the retired skill artifact.
