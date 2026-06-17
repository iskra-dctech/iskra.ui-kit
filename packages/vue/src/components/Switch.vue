<script lang="ts">
export type SwitchSize = 's' | 'm';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { createId } from '@iskra-ui/core';
import { cx } from '../utils/cx.js';

const props = withDefaults(
  defineProps<{
    /** Controlled checked state (v-model). */
    modelValue?: boolean;
    size?: SwitchSize;
    label?: string;
    description?: string;
    disabled?: boolean;
    id?: string;
  }>(),
  { modelValue: false, size: 'm', disabled: false },
);

const emit = defineEmits<{ 'update:modelValue': [value: boolean]; change: [event: Event] }>();

const inputId = computed(() => props.id ?? createId('ik-sw'));
const rootCls = computed(() => cx('ik-sw', `ik-sw-${props.size}`, props.disabled && 'is-disabled'));

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked);
  emit('change', e);
}
</script>

<template>
  <label :class="rootCls" :for="inputId">
    <input
      :id="inputId"
      type="checkbox"
      role="switch"
      class="ik-sw-input"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="ik-sw-track" aria-hidden="true">
      <span class="ik-sw-knob" />
    </span>
    <span v-if="label || description" class="ik-sw-textwrap">
      <span v-if="label" class="ik-sw-text">{{ label }}</span>
      <span v-if="description" class="ik-sw-desc">{{ description }}</span>
    </span>
  </label>
</template>
