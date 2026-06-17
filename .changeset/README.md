# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).

Run `pnpm changeset` to record an intent-to-release for any package whose public
API, tokens, or CSS contract changed. SemVer rules for this design system:

- **patch** — bugfixes, no API/token-contract change (focus ring fix, aria fix).
- **minor** — new components, new variants, new non-breaking tokens.
- **major** — breaking prop/token/CSS-API changes (renamed prop, removed variant,
  changed token path or CSS variable name).

Prerelease trains use tags `next` / `beta` / `rc`.
