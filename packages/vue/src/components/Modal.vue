<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { createFocusTrap } from '@iskra-ui/core'
import { cx } from '../utils/cx.js'

export type ModalSize = 's' | 'm' | 'l'

const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    description?: string
    size?: ModalSize
    closeOnEsc?: boolean
    closeOnClickOutside?: boolean
    showClose?: boolean
    closeLabel?: string
  }>(),
  {
    size: 'm',
    closeOnEsc: true,
    closeOnClickOutside: true,
    showClose: true,
    closeLabel: 'Закрыть',
  },
)

const emit = defineEmits<{ close: [] }>()

const dialogRef = ref<HTMLDivElement | null>(null)
const prevFocus = ref<HTMLElement | null>(null)
let trap: ReturnType<typeof createFocusTrap> | null = null

watch(
  () => props.open,
  (open) => {
    if (open) {
      prevFocus.value = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => {
        if (dialogRef.value) trap = createFocusTrap(dialogRef.value)
        trap?.activate()
      })
      return
    }
    trap?.deactivate()
    trap = null
    document.body.style.overflow = ''
    prevFocus.value?.focus()
  },
)

function onKey(e: KeyboardEvent) {
  if (props.closeOnEsc && props.open && e.key === 'Escape') emit('close')
}

function onOverlayMouseDown(e: MouseEvent) {
  if (props.closeOnClickOutside && e.target === e.currentTarget) emit('close')
}

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  trap?.deactivate()
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="ik-modal-overlay" @mousedown="onOverlayMouseDown">
      <div
        ref="dialogRef"
        :class="cx('ik-modal', `ik-modal-${size}`)"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'ik-modal-title' : undefined"
        :aria-describedby="description ? 'ik-modal-desc' : undefined"
        tabindex="-1"
      >
        <div v-if="title || showClose" class="ik-modal-header">
          <div class="ik-modal-titles">
            <div v-if="title" id="ik-modal-title" class="ik-modal-title">{{ title }}</div>
            <div v-if="description" id="ik-modal-desc" class="ik-modal-desc">{{ description }}</div>
          </div>
          <button
            v-if="showClose"
            type="button"
            class="ik-modal-close"
            :aria-label="closeLabel"
            @click="emit('close')"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </svg>
          </button>
        </div>
        <div v-if="$slots.default" class="ik-modal-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="ik-modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
