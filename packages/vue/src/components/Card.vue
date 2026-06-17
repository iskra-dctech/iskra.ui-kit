<script lang="ts">
export type CardPadding = 'none' | 's' | 'm' | 'l';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../utils/cx.js';

const props = withDefaults(
  defineProps<{
    padding?: CardPadding;
    elevated?: boolean;
    /** Hoverable/focusable affordance. Provide a click handler and an accessible name. */
    interactive?: boolean;
    selected?: boolean;
  }>(),
  { padding: 'm', elevated: false, interactive: false, selected: false },
);

const cls = computed(() =>
  cx(
    'ik-card',
    `ik-card-pad-${props.padding}`,
    props.elevated && 'ik-card-elevated',
    props.interactive && 'ik-card-interactive',
    props.selected && 'ik-card-selected',
  ),
);
</script>

<template>
  <div :class="cls" :tabindex="interactive ? 0 : undefined">
    <slot />
  </div>
</template>
