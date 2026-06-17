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

## Docs

https://github.com/iskra-dctech/iskra.ui-kit/blob/master/docs/PACKAGES.md#iskra-uivue
