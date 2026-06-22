<script setup lang="ts">
import { cx } from '../utils/cx.js';

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div role="separator" :class="cx('ik-context-menu-separator', props.class)" />
</template>
