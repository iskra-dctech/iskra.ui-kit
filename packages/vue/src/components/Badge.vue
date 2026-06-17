<script lang="ts">
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'accent' | 'neutral';
export type BadgeSize = 's' | 'm';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../utils/cx.js';

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant;
    size?: BadgeSize;
    /** Show a leading status dot. */
    dot?: boolean;
  }>(),
  { variant: 'neutral', size: 'm', dot: false },
);

const cls = computed(() => cx('ik-bdg', `ik-bdg-${props.size}`, `ik-bdg-${props.variant}`));
</script>

<template>
  <span :class="cls">
    <span v-if="dot" class="ik-bdg-dot" aria-hidden="true" />
    <slot name="icon" />
    <slot />
  </span>
</template>
