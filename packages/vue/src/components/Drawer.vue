<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { createFocusTrap } from '@iskra-ui/core';
import { cx } from '../utils/cx.js';

export type DrawerSide = 'left' | 'right';

const props = withDefaults(
  defineProps<{
    open: boolean;
    side?: DrawerSide;
    title?: string;
    ariaLabel?: string;
    closeOnOverlay?: boolean;
    closeOnEsc?: boolean;
  }>(),
  {
    side: 'left',
    closeOnOverlay: true,
    closeOnEsc: true,
  },
);

const emit = defineEmits<{ 'update:open': [open: boolean] }>();

const panelRef = ref<HTMLDivElement | null>(null);
const prevFocus = ref<HTMLElement | null>(null);
let trap: ReturnType<typeof createFocusTrap> | null = null;

const handleClose = () => emit('update:open', false);

watch(
  () => props.open,
  (open) => {
    if (open) {
      prevFocus.value = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        if (panelRef.value) trap = createFocusTrap(panelRef.value);
        trap?.activate();
      });
      return;
    }
    trap?.deactivate();
    trap = null;
    document.body.style.overflow = '';
    prevFocus.value?.focus();
  },
);

function onKey(e: KeyboardEvent) {
  if (props.closeOnEsc && props.open && e.key === 'Escape') handleClose();
}

function onOverlayMouseDown(e: MouseEvent) {
  if (props.closeOnOverlay && e.target === e.currentTarget) handleClose();
}

onMounted(() => document.addEventListener('keydown', onKey));
onUnmounted(() => {
  document.removeEventListener('keydown', onKey);
  trap?.deactivate();
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="ik-drawer-overlay" @mousedown="onOverlayMouseDown">
      <div
        ref="panelRef"
        :class="cx('ik-drawer-panel', side === 'right' ? 'is-right' : 'is-left')"
        role="dialog"
        aria-modal="true"
        :aria-label="title ? undefined : ariaLabel"
        :aria-labelledby="title ? 'ik-drawer-title' : undefined"
        tabindex="-1"
      >
        <span v-if="title" id="ik-drawer-title" class="ik-sr-only">{{ title }}</span>
        <div class="ik-drawer-body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
