<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import { createId, type PopoverPlacement } from '@iskra-ui/core';
import {
  contextMenuKey,
  type ContextMenuPositionMode,
  type ContextMenuTriggerOn,
  type RegisteredMenuItem,
} from '../composables/contextMenu.js';

const props = withDefaults(
  defineProps<{
    open?: boolean;
    defaultOpen?: boolean;
    triggerOn?: ContextMenuTriggerOn;
    placement?: PopoverPlacement;
  }>(),
  {
    defaultOpen: false,
    triggerOn: 'both',
    placement: 'bottom-start',
  },
);

const emit = defineEmits<{ 'update:open': [open: boolean]; openChange: [open: boolean] }>();

const isOpen = ref(props.open ?? props.defaultOpen);
const contentId = createId('ik-context-menu');
const triggerRef = ref<HTMLElement | null>(null);
const positionMode = ref<ContextMenuPositionMode>('anchor');
const cursorPoint = ref<{ x: number; y: number } | null>(null);
const items = ref<RegisteredMenuItem[]>([]);
const activeIndex = ref(0);

watch(
  () => props.open,
  (value) => {
    if (value !== undefined) isOpen.value = value;
  },
);

const setOpen = (value: boolean) => {
  isOpen.value = value;
  emit('update:open', value);
  emit('openChange', value);
  if (!value) {
    cursorPoint.value = null;
    activeIndex.value = 0;
  }
};

const close = () => setOpen(false);

const setPositionMode = (mode: ContextMenuPositionMode) => {
  positionMode.value = mode;
};

const setCursorPoint = (point: { x: number; y: number } | null) => {
  cursorPoint.value = point;
};

const registerItem = (item: RegisteredMenuItem) => {
  const index = items.value.findIndex((entry) => entry.id === item.id);
  if (index === -1) {
    items.value = [...items.value, item];
    return;
  }
  const next = [...items.value];
  next[index] = item;
  items.value = next;
};

const unregisterItem = (id: string) => {
  items.value = items.value.filter((entry) => entry.id !== id);
};

const setActiveIndex = (index: number) => {
  activeIndex.value = index;
};

provide(contextMenuKey, {
  open: isOpen,
  setOpen,
  triggerOn: props.triggerOn,
  triggerRef,
  contentId,
  positionMode,
  setPositionMode,
  cursorPoint,
  setCursorPoint,
  placement: props.placement,
  close,
  items,
  registerItem,
  unregisterItem,
  activeIndex,
  setActiveIndex,
});
</script>

<template>
  <slot />
</template>
