<script setup lang="ts">
import { cx } from '../utils/cx.js';

defineProps<{ class?: string }>();
</script>

<template>
  <div :class="cx('isb-grp', $props.class)">
    <slot />
  </div>
</template>
