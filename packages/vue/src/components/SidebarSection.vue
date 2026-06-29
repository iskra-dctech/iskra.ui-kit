<script setup lang="ts">
import { cx } from '../utils/cx.js';

defineProps<{ class?: string }>();
</script>

<template>
  <div :class="cx('isb-sec', $props.class)" aria-hidden="true">
    <slot />
  </div>
</template>
