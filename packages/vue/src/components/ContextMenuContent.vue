<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import {
  computeAnchorPosition,
  computeCursorPosition,
  firstEnabledMenuItemIndex,
  getNextMenuItemIndex,
  Keys,
} from '@iskra-ui/core';
import { cx } from '../utils/cx.js';
import { useContextMenuContext } from '../composables/contextMenu.js';

const props = defineProps<{
  class?: string;
}>();

const ctx = useContextMenuContext('ContextMenuContent');

const panelRef = ref<HTMLDivElement | null>(null);
const opened = ref(false);
const prevFocus = ref<HTMLElement | null>(null);

const updatePosition = () => {
  const panel = panelRef.value;
  if (!panel) return;
  const pr = panel.getBoundingClientRect();

  if (ctx.positionMode.value === 'cursor' && ctx.cursorPoint.value) {
    const nextPos = computeCursorPosition(ctx.cursorPoint.value, pr);
    panel.style.top = `${nextPos.top}px`;
    panel.style.left = `${nextPos.left}px`;
  } else {
    const anchor = ctx.triggerRef.value;
    if (!anchor) return;
    const ar = anchor.getBoundingClientRect();
    const nextPos = computeAnchorPosition(ar, pr, ctx.placement);
    panel.style.top = `${nextPos.top}px`;
    panel.style.left = `${nextPos.left}px`;
  }
  panel.style.visibility = 'visible';
};

watch(
  () => ctx.open.value,
  (open) => {
    if (!open) {
      opened.value = false;
      return;
    }
    requestAnimationFrame(updatePosition);
  },
);

watch(
  [() => ctx.open.value, () => ctx.items.value.length],
  ([open]) => {
    if (!open || opened.value || ctx.items.value.length === 0) return;
    opened.value = true;
    prevFocus.value = document.activeElement as HTMLElement | null;
    const first = firstEnabledMenuItemIndex(ctx.items.value);
    if (first === undefined) return;
    ctx.setActiveIndex(first);
    requestAnimationFrame(() => ctx.items.value[first]?.focus());
  },
);

function onKey(e: KeyboardEvent) {
  if (!ctx.open.value) return;
  if (e.key === Keys.Escape) {
    e.preventDefault();
    ctx.close();
    prevFocus.value?.focus();
    return;
  }
  const nextIndex = getNextMenuItemIndex(ctx.items.value, ctx.activeIndex.value, e.key);
  if (nextIndex !== undefined) {
    e.preventDefault();
    ctx.setActiveIndex(nextIndex);
    ctx.items.value[nextIndex]?.focus();
  }
}

function onDown(e: MouseEvent) {
  if (!ctx.open.value) return;
  const target = e.target as Node;
  if (panelRef.value?.contains(target) || ctx.triggerRef.value?.contains(target)) return;
  ctx.close();
  prevFocus.value?.focus();
}

onMounted(() => {
  document.addEventListener('keydown', onKey);
  document.addEventListener('mousedown', onDown);
  window.addEventListener('resize', updatePosition);
  window.addEventListener('scroll', updatePosition, true);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKey);
  document.removeEventListener('mousedown', onDown);
  window.removeEventListener('resize', updatePosition);
  window.removeEventListener('scroll', updatePosition, true);
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="ctx.open.value"
      :id="ctx.contentId"
      ref="panelRef"
      role="menu"
      aria-orientation="vertical"
      :class="cx('ik-context-menu', props.class)"
      :style="{ top: '-9999px', left: '-9999px', visibility: 'hidden' }"
      @mousedown.stop
    >
      <slot />
    </div>
  </Teleport>
</template>
