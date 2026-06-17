# @iskra-ui/react

React 18+ component library for **Искра.DCI** in Hard-Shell Minimal style. `ik-*` classes preserved from the legacy bundle.

## Install

```bash
pnpm add @iskra-ui/react @iskra-ui/styles
```

## Usage

```tsx
import '@iskra-ui/styles/index.css'
import '@iskra-ui/react/styles.css'
import { Button, TextField, Badge, Icon } from '@iskra-ui/react'

export function Example() {
  return (
    <>
      <TextField label="Хост" iconBefore={<Icon name="search" />} clearable />
      <Button variant="outline" iconBefore={<Icon name="refresh" />}>
        Force Sync
      </Button>
      <Badge variant="warning" dot>
        Drift
      </Badge>
    </>
  )
}
```

## Docs

https://github.com/iskra-dctech/iskra.ui-kit/blob/master/docs/PACKAGES.md#iskra-uireact
