<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { createId, getTriggerAria } from '@iskra-ui/core'
import { cx } from '../utils/cx.js'

export type PopoverPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'bottom'
  | 'top-start'
  | 'top-end'
  | 'top'

const props = withDefaults(
  defineProps<{
    open?: boolean
    placement?: PopoverPlacement
    offset?: number
    closeOnEsc?: boolean
    closeOnClickOutside?: boolean
    panelClassName?: string
    id?: string
  }>(),
  {
    placement: 'bottom-end',
    offset: 8,
    closeOnEsc: true,
    closeOnClickOutside: true,
  },
)

const emit = defineEmits<{ 'update:open': [value: boolean]; openChange: [value: boolean] }>()

const anchorRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelId = computed(() => props.id ?? createId('ik-popover'))
const pos = ref<{ top: number; left: number } | null>(null)

const isOpen = computed({
  get: () => props.open ?? false,
  set: (v: boolean) => {
    emit('update:open', v)
    emit('openChange', v)
  },
})

const triggerAria = computed(() => getTriggerAria(isOpen.value, panelId.value))

function updatePosition() {
  const anchor = anchorRef.value
  const panel = panelRef.value
  if (!anchor || !panel || !isOpen.value) return
  const ar = anchor.getBoundingClientRect()
  const pr = panel.getBoundingClientRect()
  const offset = props.offset
  let top = ar.bottom + offset
  let left = ar.right - pr.width
  if (props.placement === 'bottom-start') left = ar.left
  const pad = 8
  left = Math.max(pad, Math.min(left, window.innerWidth - pr.width - pad))
  top = Math.max(pad, Math.min(top, window.innerHeight - pr.height - pad))
  pos.value = { top, left }
}

function toggle() {
  isOpen.value = !isOpen.value
}

function onKey(e: KeyboardEvent) {
  if (props.closeOnEsc && e.key === 'Escape') isOpen.value = false
}

function onDown(e: MouseEvent) {
  if (!props.closeOnClickOutside) return
  const t = e.target as Node
  if (anchorRef.value?.contains(t) || panelRef.value?.contains(t)) return
  isOpen.value = false
}

watch(isOpen, (v) => {
  if (v) requestAnimationFrame(updatePosition)
  else pos.value = null
})

onMounted(() => {
  document.addEventListener('keydown', onKey)
  document.addEventListener('mousedown', onDown)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition, true)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('mousedown', onDown)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})
</script>

<template>
  <span ref="anchorRef" class="ik-popover-anchor" @click="toggle">
    <slot
      name="trigger"
      :aria-expanded="triggerAria['aria-expanded']"
      :aria-controls="isOpen ? panelId : undefined"
    />
  </span>
  <Teleport to="body">
    <div
      v-if="isOpen"
      :id="panelId"
      ref="panelRef"
      role="dialog"
      :class="cx('ik-popover-panel', panelClassName)"
      :style="
        pos
          ? { top: `${pos.top}px`, left: `${pos.left}px`, visibility: 'visible' }
          : { top: '-9999px', left: '-9999px', visibility: 'hidden' }
      "
      @mousedown.stop
    >
      <slot />
    </div>
  </Teleport>
</template>
