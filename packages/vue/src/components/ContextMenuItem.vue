<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { createId, isActivationKey } from '@iskra-ui/core';
import { cx } from '../utils/cx.js';
import { useContextMenuContext } from '../composables/contextMenu.js';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    destructive?: boolean;
    class?: string;
  }>(),
  {
    disabled: false,
    destructive: false,
  },
);

const emit = defineEmits<{ select: [] }>();

const ctx = useContextMenuContext('ContextMenuItem');

const itemId = createId('ik-context-menu-item');
const buttonRef = ref<HTMLButtonElement | null>(null);

const isActive = computed(() => ctx.items.value[ctx.activeIndex.value]?.id === itemId);
const tabIndex = computed(() => (isActive.value ? 0 : -1));

const handleSelect = () => {
  if (props.disabled) return;
  emit('select');
  ctx.close();
  ctx.triggerRef.value?.focus();
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isActivationKey(e.key)) return;
  e.preventDefault();
  handleSelect();
};

onMounted(() => {
  ctx.registerItem({
    id: itemId,
    disabled: props.disabled,
    focus: () => buttonRef.value?.focus(),
  });
});

watch(
  () => props.disabled,
  (disabled) => {
    ctx.registerItem({
      id: itemId,
      disabled,
      focus: () => buttonRef.value?.focus(),
    });
  },
);

onUnmounted(() => {
  ctx.unregisterItem(itemId);
});
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    role="menuitem"
    :disabled="disabled"
    :tabindex="tabIndex"
    :class="
      cx('ik-context-menu-item', destructive && 'ik-context-menu-item--destructive', props.class)
    "
    @click="handleSelect"
    @keydown="handleKeyDown"
    @focus="
      () => {
        const idx = ctx.items.value.findIndex((entry) => entry.id === itemId);
        if (idx >= 0) ctx.setActiveIndex(idx);
      }
    "
  >
    <span v-if="$slots.icon" class="ik-context-menu-item-icon" aria-hidden="true">
      <slot name="icon" />
    </span>
    <span class="ik-context-menu-item-label">
      <slot />
    </span>
  </button>
</template>
