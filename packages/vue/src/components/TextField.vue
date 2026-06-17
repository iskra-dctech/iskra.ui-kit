<script lang="ts">
export type TextFieldSize = 's' | 'm' | 'l';
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { createId } from '@iskra-dci/core';
import { cx } from '../utils/cx.js';

const props = withDefaults(
  defineProps<{
    /** Controlled value (v-model). */
    modelValue?: string;
    size?: TextFieldSize;
    label?: string;
    hint?: string;
    /** Error message (string) or boolean error state. */
    error?: string | boolean;
    required?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    id?: string;
    placeholder?: string;
    type?: string;
    clearLabel?: string;
  }>(),
  {
    modelValue: '',
    size: 'm',
    required: false,
    clearable: false,
    disabled: false,
    type: 'text',
    clearLabel: 'Очистить',
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: string]; clear: [] }>();

const inputRef = ref<HTMLInputElement>();
const inputId = computed(() => props.id ?? createId('ik-tf'));
const errText = computed(() => (typeof props.error === 'string' ? props.error : null));
const isError = computed(() => Boolean(props.error));
const showClear = computed(
  () => props.clearable && !props.disabled && (props.modelValue ?? '').length > 0,
);
const fieldCls = computed(() =>
  cx(
    'ik-tf-field',
    `ik-tf-${props.size}`,
    isError.value && 'is-error',
    props.disabled && 'is-disabled',
  ),
);
const describedBy = computed(() =>
  errText.value || props.hint ? `${inputId.value}-msg` : undefined,
);

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}

function onClear() {
  emit('update:modelValue', '');
  emit('clear');
  inputRef.value?.focus();
}
</script>

<template>
  <div class="ik-tf-wrap">
    <label v-if="label" class="ik-tf-label" :for="inputId">
      {{ label }}
      <span v-if="required" class="ik-tf-req" aria-hidden="true">*</span>
    </label>
    <div :class="fieldCls">
      <span v-if="$slots.iconBefore" class="ik-tf-ico"><slot name="iconBefore" /></span>
      <input
        :id="inputId"
        ref="inputRef"
        class="ik-tf-input"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :aria-invalid="isError || undefined"
        :aria-describedby="describedBy"
        @input="onInput"
      />
      <button
        v-if="showClear"
        type="button"
        class="ik-tf-clear"
        :aria-label="clearLabel"
        @click="onClear"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <line x1="4" y1="4" x2="12" y2="12" />
          <line x1="12" y1="4" x2="4" y2="12" />
        </svg>
      </button>
    </div>
    <div
      v-if="errText || hint"
      :id="`${inputId}-msg`"
      :class="cx('ik-tf-msg', isError && 'is-error')"
    >
      {{ errText || hint }}
    </div>
  </div>
</template>
