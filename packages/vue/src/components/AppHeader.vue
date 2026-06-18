<script lang="ts">
export type AppHeaderIndicatorDot = 'ok' | 'warn' | 'error' | 'off';
/** @deprecated Use AppHeaderIndicatorDot */
export type AppHeaderStatusDot = AppHeaderIndicatorDot;
</script>

<script setup lang="ts">
import { cx } from '../utils/cx.js';

defineProps<{
  class?: string;
}>();
</script>

<template>
  <header :class="cx('ik-app-header', $props.class)">
    <div v-if="$slots.leading" class="ik-app-header-leading">
      <slot name="leading" />
    </div>
    <div v-if="$slots.center" class="ik-app-header-center">
      <slot name="center" />
    </div>
    <div v-if="$slots.trailing" class="ik-app-header-trailing">
      <slot name="trailing" />
    </div>
    <slot />
  </header>
</template>
