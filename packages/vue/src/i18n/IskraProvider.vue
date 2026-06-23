<script setup lang="ts">
import { provide } from 'vue'
import type { DeepPartial, IskraLocale, IskraMessages } from '@iskra-ui/i18n'
import { createIskraLocaleContext } from './context.js'
import { IskraLocaleKey } from './context.js'

const props = withDefaults(
  defineProps<{
    locale?: IskraLocale
    messages?: DeepPartial<IskraMessages>
  }>(),
  { locale: 'en' },
)

provide(IskraLocaleKey, createIskraLocaleContext(props.locale, props.messages))
</script>

<template>
  <slot />
</template>
