<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue';
import { getTriggerAria } from '@iskra-ui/core';
import { contextMenuKey } from '../composables/contextMenu.js';

const props = defineProps<{
  class?: string;
}>();

const ctx = inject(contextMenuKey);
if (!ctx) throw new Error('ContextMenuTrigger must be used within ContextMenu.');

const rootRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (rootRef.value) ctx.triggerRef.value = rootRef.value;
});

onUnmounted(() => {
  if (ctx.triggerRef.value === rootRef.value) ctx.triggerRef.value = null;
});

const triggerAria = computed(() =>
  getTriggerAria(ctx.open.value, ctx.contentId, { haspopup: 'menu' }),
);

const handleContextMenu = (e: MouseEvent) => {
  if (ctx.triggerOn === 'click') return;
  e.preventDefault();
  ctx.setPositionMode('cursor');
  ctx.setCursorPoint({ x: e.clientX, y: e.clientY });
  ctx.setOpen(true);
};

const handleClick = () => {
  if (ctx.triggerOn === 'contextmenu') return;
  ctx.setPositionMode('anchor');
  ctx.setCursorPoint(null);
  ctx.setOpen(!ctx.open.value);
};
</script>

<template>
  <span
    ref="rootRef"
    :class="props.class"
    :aria-expanded="triggerAria['aria-expanded']"
    :aria-controls="ctx.open.value ? ctx.contentId : undefined"
    :aria-haspopup="triggerAria['aria-haspopup']"
    @contextmenu="handleContextMenu"
    @click="handleClick"
  >
    <slot />
  </span>
</template>
