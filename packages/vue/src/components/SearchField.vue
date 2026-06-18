<script lang="ts">
export type SearchFieldSize = 's' | 'm'
export type SearchFieldVariant = 'default' | 'inline'
</script>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { createId } from '@iskra-ui/core'
import Icon from './Icon.vue'
import { cx } from '../utils/cx.js'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    size?: SearchFieldSize
    variant?: SearchFieldVariant
    clearable?: boolean
    disabled?: boolean
    placeholder?: string
    shortcut?: string
    enableShortcut?: boolean
    clearLabel?: string
  }>(),
  {
    modelValue: '',
    size: 'm',
    variant: 'default',
    clearable: true,
    disabled: false,
    placeholder: 'Поиск…',
    clearLabel: 'Очистить',
    enableShortcut: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  clear: []
  shortcut: []
}>()

const inputRef = ref<HTMLInputElement>()
const inputId = createId('ik-sf')

const showClear = computed(
  () => props.clearable && !props.disabled && (props.modelValue ?? '').length > 0,
)

const fieldCls = computed(() =>
  cx(
    'ik-sf-field',
    `ik-sf-${props.size}`,
    props.variant === 'inline' && 'ik-sf-inline',
    props.disabled && 'is-disabled',
  ),
)

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function onClear() {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

function onKey(e: KeyboardEvent) {
  if (!props.enableShortcut) return
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    inputRef.value?.focus()
    emit('shortcut')
  }
}

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="ik-sf-wrap">
    <div :class="fieldCls">
      <span class="ik-sf-ico" aria-hidden="true">
        <Icon name="search" :size="14" />
      </span>
      <input
        :id="inputId"
        ref="inputRef"
        type="search"
        class="ik-sf-input"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :aria-label="placeholder"
        @input="onInput"
      />
      <button
        v-if="showClear"
        type="button"
        class="ik-sf-clear"
        :aria-label="clearLabel"
        @click="onClear"
      >
        <Icon name="close" :size="13" />
      </button>
      <kbd v-else-if="shortcut" class="ik-sf-kbd" aria-hidden="true">{{ shortcut }}</kbd>
    </div>
  </div>
</template>
