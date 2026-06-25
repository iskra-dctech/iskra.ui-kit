<script setup lang="ts">
import { inject } from 'vue';
import Icon from './Icon.vue';
import { cx } from '../utils/cx.js';
import type { IconName } from '@iskra-ui/icons';
import type { SidebarNavItem } from '@iskra-ui/core';
import { sidebarContextKey } from './sidebar/context.js';

const props = defineProps<{
  item?: SidebarNavItem;
  id?: string;
  label?: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
  active?: boolean;
}>();

const emit = defineEmits<{ click: [] }>();

const ctx = inject(sidebarContextKey);

const resolvedItem = (): SidebarNavItem => {
  if (props.item) return props.item;
  return {
    id: props.id ?? props.label ?? '',
    label: props.label ?? '',
    icon: props.icon,
    badge: props.badge,
    disabled: props.disabled,
  };
};

const item = resolvedItem();
const badge = props.badge ?? item.badge;

function handleClick() {
  emit('click');
}

function handleMouseEnter(e: MouseEvent) {
  if (ctx?.collapsed.value && ctx.tipRdy.value) {
    ctx.showTip(e, item.label);
  }
}

function handleMouseLeave() {
  ctx?.hideTip();
}
</script>

<template>
  <button
    type="button"
    :class="cx('isb-item', active && 'isb-on')"
    :title="item.label"
    :disabled="item.disabled"
    :aria-current="active ? 'page' : undefined"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="isb-ico">
      <Icon v-if="item.icon" :name="item.icon as IconName" :size="16" />
    </span>
    <span class="isb-lbl">{{ item.label }}</span>
    <span
      v-if="badge != null && badge > 0"
      class="isb-bdg"
      :aria-label="`${item.label}: ${badge}`"
    >
      {{ badge }}
    </span>
  </button>
</template>
