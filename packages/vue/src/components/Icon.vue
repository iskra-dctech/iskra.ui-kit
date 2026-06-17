<script setup lang="ts">
import { computed } from 'vue';
import { icons, type IconName } from '@iskra-dci/icons';

const props = withDefaults(
  defineProps<{
    /** Icon name from the canonical set. */
    name: IconName;
    /** Size — number (px) or any CSS length. Defaults to 1em (scales with text). */
    size?: number | string;
    strokeWidth?: number;
    /** Accessible name. When omitted the icon is decorative (aria-hidden). */
    title?: string;
  }>(),
  { size: '1em', strokeWidth: 1.5 },
);

const px = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size));
const inner = computed(
  () => (props.title ? `<title>${props.title}</title>` : '') + icons[props.name],
);
</script>

<template>
  <svg
    class="iskra-icon"
    :width="px"
    :height="px"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :role="title ? 'img' : undefined"
    :aria-hidden="title ? undefined : 'true'"
    :aria-label="title || undefined"
    style="display: inline-block; flex-shrink: 0; vertical-align: middle"
    v-html="inner"
  />
</template>
