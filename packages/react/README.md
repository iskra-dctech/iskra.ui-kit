# @iskra-ui/react

React 18+ component library for **Искра.DCI** in Hard-Shell Minimal style. Stable `ik-*` CSS class names.

## Install

```bash
pnpm add @iskra-ui/react @iskra-ui/styles
```

## Usage

```tsx
import '@iskra-ui/styles/index.css';
import '@iskra-ui/react/styles.css';
import { Button, TextField, Badge, Icon } from '@iskra-ui/react';

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
  );
}
```

## Internationalization

Default locale is **English**. Wrap your app with `IskraProvider` to set locale or override messages:

```tsx
import { IskraProvider, Button } from '@iskra-ui/react';

export function App() {
  return (
    <IskraProvider locale="ru">
      <Button>My action</Button>
    </IskraProvider>
  );
}
```

**Migration (breaking):** built-in component strings previously defaulted to Russian. To keep Russian UI after upgrading, add `<IskraProvider locale="ru">`. Sidebar presets: use `getDciOperatorNav(locale)` instead of deprecated `DCI_OPERATOR_NAV`.

## Docs

https://github.com/iskra-dctech/iskra.ui-kit/blob/master/docs/PACKAGES.md#iskra-uireact
