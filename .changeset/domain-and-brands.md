---
'@iskra-ui/dci-react': minor
'@iskra-ui/tokens': minor
---

Domain layer + white-label:

- `@iskra-ui/dci-react` — Искра.DCI domain components built on the foundation:
  `DeviceCard`, `FleetPulse`, `CliRow`, `DriftToast`, `ApiKeyModal`. Stories + tests
  included.
- `@iskra-ui/tokens` — white-label brand packs: drop a
  `src/brands/<name>.json` accent override and it compiles to a `.brand-<name>`
  selector (composes on top of any theme) plus a typed `brands` map. Ships an
  example `brand-aurora`.
- Repo: added a legacy-import codemod (`scripts/codemod-legacy-imports.mjs`) and
  `MIGRATION.md` for moving off the retired skill artifact.
