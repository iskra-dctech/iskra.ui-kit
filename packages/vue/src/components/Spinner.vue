<script lang="ts">
export type SpinnerSize = 's' | 'm' | 'l';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../utils/cx.js';

const props = withDefaults(
  defineProps<{
    size?: SpinnerSize;
    /** Accessible label announced to screen readers. */
    label?: string;
  }>(),
  { size: 'm', label: 'Загрузка…' },
);

const spinnerCls = computed(() => cx('ik-spinner', `ik-spinner-${props.size}`));
</script>

<template>
  <div role="status" aria-live="polite" class="ik-spinner-wrap">
    <span :class="spinnerCls" aria-hidden="true" />
    <span class="ik-spinner-label">{{ label }}</span>
  </div>
</template>
