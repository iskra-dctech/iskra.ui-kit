# @iskra-ui/vue

Vue 3.4+ component library for **Искра.DCI** — API parity with `@iskra-ui/react` over a shared headless core and token layer.

## Install

```bash
pnpm add @iskra-ui/vue @iskra-ui/styles
```

## Usage

```vue
<script setup lang="ts">
import '@iskra-ui/styles/index.css';
import '@iskra-ui/vue/styles.css';
import { Button, TextField, Badge } from '@iskra-ui/vue';
</script>

<template>
  <TextField label="Хост" />
  <Button variant="outline">Force Sync</Button>
  <Badge variant="warning" dot>Drift</Badge>
</template>
```

## Internationalization

Default locale is **English**. Use `IskraProvider` or `IskraLocalePlugin`:

```vue
<script setup lang="ts">
import { IskraProvider } from '@iskra-ui/vue';
</script>

<template>
  <IskraProvider locale="ru">
    <App />
  </IskraProvider>
</template>
```

**Migration:** wrap the app in `<IskraProvider locale="ru">` to keep Russian built-in strings after upgrading.

## Docs

https://github.com/iskra-dctech/iskra.ui-kit/blob/master/docs/PACKAGES.md#iskra-uivue
