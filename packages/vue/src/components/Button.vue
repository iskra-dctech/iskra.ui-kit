<script lang="ts">
export type ButtonVariant = 'primary' | 'outline' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 's' | 'm' | 'l';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../utils/cx.js';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconOnly?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    variant: 'primary',
    size: 'm',
    iconOnly: false,
    loading: false,
    fullWidth: false,
    disabled: false,
    type: 'button',
  },
);

const cls = computed(() =>
  cx(
    'ik-btn',
    `ik-btn-${props.variant}`,
    `ik-btn-${props.size}`,
    props.iconOnly && 'ik-btn-io',
    props.fullWidth && 'ik-btn-fw',
    props.loading && 'ik-btn-loading',
  ),
);
</script>

<template>
  <button :type="type" :class="cls" :disabled="disabled || loading">
    <span v-if="loading" class="ik-btn-spinner" aria-hidden="true" />
    <span class="ik-btn-content">
      <slot name="iconBefore" />
      <span v-if="!iconOnly"><slot /></span>
      <slot v-else />
      <slot name="iconAfter" />
    </span>
  </button>
</template>
