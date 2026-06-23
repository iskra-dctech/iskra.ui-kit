<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
import { createFocusTrap } from '@iskra-ui/core';
import { useIskraT } from '../i18n/useIskraT.js';
import { cx } from '../utils/cx.js';

export type SheetSnap = 'content' | 'half' | 'full';

const props = withDefaults(
  defineProps<{
    open: boolean;
    title?: string;
    description?: string;
    snap?: SheetSnap;
    showHandle?: boolean;
    dismissible?: boolean;
    showClose?: boolean;
    closeLabel?: string;
  }>(),
  {
    snap: 'content',
    showHandle: true,
    dismissible: true,
    showClose: true,
  },
);

const t = useIskraT();
const resolvedCloseLabel = computed(() => props.closeLabel ?? t('common.close'));

const emit = defineEmits<{ 'update:open': [open: boolean] }>();

const sheetRef = ref<HTMLDivElement | null>(null);
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
        if (sheetRef.value) trap = createFocusTrap(sheetRef.value);
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
  if (props.dismissible && props.open && e.key === 'Escape') handleClose();
}

function onOverlayMouseDown(e: MouseEvent) {
  if (props.dismissible && e.target === e.currentTarget) handleClose();
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
    <div v-if="open" class="ik-sheet-overlay" @mousedown="onOverlayMouseDown">
      <div
        ref="sheetRef"
        :class="cx('ik-sheet', `ik-sheet-snap-${snap}`)"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'ik-sheet-title' : undefined"
        :aria-describedby="description ? 'ik-sheet-desc' : undefined"
        tabindex="-1"
      >
        <div v-if="showHandle" class="ik-sheet-handle" aria-hidden="true">
          <span class="ik-sheet-handle-bar" />
        </div>
        <div v-if="title || showClose" class="ik-sheet-header">
          <div>
            <div v-if="title" id="ik-sheet-title" class="ik-sheet-title">{{ title }}</div>
            <div v-if="description" id="ik-sheet-desc" class="ik-sheet-desc">{{ description }}</div>
          </div>
          <button
            v-if="showClose"
            type="button"
            class="ik-sheet-close"
            :aria-label="resolvedCloseLabel"
            @click="handleClose"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              aria-hidden="true"
            >
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </svg>
          </button>
        </div>
        <div v-if="$slots.default" class="ik-sheet-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="ik-sheet-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
