<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watch } from 'vue';
import { useIskraLocale, useIskraT } from '../i18n/useIskraT.js';
import Icon from './Icon.vue';
import { cx } from '../utils/cx.js';
import type { IconName } from '@iskra-ui/icons';
import {
  resolveSidebarGroups,
  type SidebarNavGroup,
  type SidebarNavItem,
  type SidebarVariant,
} from '@iskra-ui/core';

export type SidebarTheme = '' | 'theme-cold' | 'theme-warm';

const props = withDefaults(
  defineProps<{
    groups?: SidebarNavGroup[];
    footerItems?: SidebarNavItem[];
    collapsed?: boolean;
    collapsible?: boolean;
    activeItem?: string;
    variant?: SidebarVariant;
    theme?: SidebarTheme;
    badges?: Record<string, number>;
    ariaLabel?: string;
  }>(),
  {
    footerItems: () => [],
    collapsed: false,
    collapsible: true,
    variant: 'operator',
    theme: '',
    badges: () => ({}),
  },
);

const t = useIskraT();
const { locale } = useIskraLocale();
const resolvedAriaLabel = computed(() => props.ariaLabel ?? t('a11y.navigation'));
const collapseLabel = computed(() =>
  props.collapsed ? t('a11y.sidebarExpand') : t('a11y.sidebarCollapse'),
);

const emit = defineEmits<{
  navigate: [id: string];
  itemClick: [item: SidebarNavItem];
  toggle: [];
}>();

const sbRef = ref<HTMLElement | null>(null);
const tip = ref<{ lbl: string; top: number } | null>(null);
const tipRdy = ref(false);

const attrs = useAttrs();

const groups = computed(() => props.groups ?? resolveSidebarGroups(props.variant, locale));
const showCollapser = computed(() => props.collapsible && typeof attrs.onToggle !== 'undefined');

const sbCls = computed(() =>
  cx(
    'iskra-sb',
    props.collapsed && 'isb-c',
    props.collapsed && tipRdy.value && 'isb-tip-rdy',
    props.theme,
  ),
);

function iconName(item: SidebarNavItem): IconName | undefined {
  return item.icon as IconName | undefined;
}

function badgeFor(item: SidebarNavItem) {
  return props.badges[item.id] ?? item.badge;
}

function onItemClick(item: SidebarNavItem) {
  emit('itemClick', item);
  emit('navigate', item.id);
}

function showTip(e: MouseEvent, lbl: string) {
  if (!tipRdy.value || !sbRef.value) return;
  const ir = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const sr = sbRef.value.getBoundingClientRect();
  tip.value = { lbl, top: ir.top - sr.top + ir.height / 2 };
}

function hideTip() {
  tip.value = null;
}

watch(
  () => props.collapsed,
  (c) => {
    tipRdy.value = false;
    tip.value = null;
    if (c)
      setTimeout(() => {
        tipRdy.value = true;
      }, 210);
  },
);

onMounted(() => {
  if (props.collapsed)
    setTimeout(() => {
      tipRdy.value = true;
    }, 210);
});
</script>

<template>
  <aside ref="sbRef" :class="sbCls" role="navigation" :aria-label="resolvedAriaLabel">
    <div v-if="$slots.brand || showCollapser" class="isb-logo">
      <div v-if="$slots.brand" class="isb-brand">
        <slot name="brand" />
      </div>
      <button
        v-if="showCollapser"
        class="isb-collapser"
        type="button"
        :aria-expanded="!collapsed"
        :aria-label="collapseLabel"
        @click="emit('toggle')"
      >
        <svg
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <polyline points="7,2 4,5 7,8" />
        </svg>
      </button>
    </div>

    <div v-if="$slots.header" class="isb-head">
      <slot name="header" />
    </div>

    <div class="isb-scroll">
      <slot>
        <div v-for="grp in groups" :key="grp.id" class="isb-grp">
          <div v-if="grp.label" class="isb-sec" aria-hidden="true">{{ grp.label }}</div>
          <button
            v-for="item in grp.items"
            :key="item.id"
            type="button"
            :class="cx('isb-item', activeItem === item.id && 'isb-on')"
            :title="item.label"
            :disabled="item.disabled"
            :aria-current="activeItem === item.id ? 'page' : undefined"
            @click="onItemClick(item)"
            @mouseenter="collapsed ? showTip($event, item.label) : undefined"
            @mouseleave="collapsed ? hideTip() : undefined"
          >
            <span class="isb-ico">
              <Icon v-if="iconName(item)" :name="iconName(item)!" :size="16" />
            </span>
            <span class="isb-lbl">{{ item.label }}</span>
            <span
              v-if="badgeFor(item) != null && badgeFor(item)! > 0"
              class="isb-bdg"
              :aria-label="`${item.label}: ${badgeFor(item)}`"
            >
              {{ badgeFor(item) }}
            </span>
          </button>
        </div>
      </slot>
    </div>

    <div v-if="$slots.footer" class="isb-foot">
      <slot name="footer" />
    </div>
    <div v-else-if="footerItems.length" class="isb-foot">
      <button
        v-for="item in footerItems"
        :key="item.id"
        type="button"
        :class="cx('isb-item', activeItem === item.id && 'isb-on')"
        :title="item.label"
        :aria-current="activeItem === item.id ? 'page' : undefined"
        @click="onItemClick(item)"
        @mouseenter="collapsed ? showTip($event, item.label) : undefined"
        @mouseleave="collapsed ? hideTip() : undefined"
      >
        <span class="isb-ico">
          <Icon v-if="iconName(item)" :name="iconName(item)!" :size="16" />
        </span>
        <span class="isb-lbl">{{ item.label }}</span>
      </button>
    </div>

    <div v-if="tip" class="isb-floatip" :style="{ top: `${tip.top}px` }">
      {{ tip.lbl }}
    </div>
  </aside>
</template>
