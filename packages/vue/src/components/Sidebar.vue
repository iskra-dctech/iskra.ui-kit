<script lang="ts">
export type SidebarTheme = '' | 'theme-cold' | 'theme-warm';
</script>

<script setup lang="ts">
import { computed, onMounted, provide, ref, useAttrs, useSlots, watch } from 'vue';
import { useIskraLocale, useIskraT } from '../i18n/useIskraT.js';
import SidebarItem from './SidebarItem.vue';
import SidebarGroup from './SidebarGroup.vue';
import SidebarSection from './SidebarSection.vue';
import SidebarFooter from './SidebarFooter.vue';
import SidebarBrand from './SidebarBrand.vue';
import SidebarBody from './SidebarBody.vue';
import { cx } from '../utils/cx.js';
import {
  resolveSidebarGroups,
  type SidebarNavGroup,
  type SidebarNavItem,
  type SidebarVariant,
} from '@iskra-ui/core';
import { sidebarContextKey } from './sidebar/context.js';

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
    desktopOnly?: boolean;
    class?: string;
  }>(),
  {
    footerItems: () => [],
    collapsed: false,
    collapsible: true,
    variant: 'operator',
    theme: '',
    badges: () => ({}),
    desktopOnly: false,
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
const slots = useSlots();

const groups = computed(() => props.groups ?? resolveSidebarGroups(props.variant, locale));
const showCollapser = computed(() => props.collapsible && typeof attrs.onToggle !== 'undefined');
const useLegacyLayout = computed(
  () =>
    !slots.default ||
    props.groups != null ||
    !!slots.brand ||
    !!slots.header ||
    !!slots.footer ||
    props.footerItems.length > 0,
);

const sbCls = computed(() =>
  cx(
    'iskra-sb',
    props.collapsed && 'isb-c',
    props.collapsed && tipRdy.value && 'isb-tip-rdy',
    props.desktopOnly && 'iskra-sb--desktop-only',
    props.theme,
    props.class,
  ),
);

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

provide(sidebarContextKey, {
  collapsed: computed(() => props.collapsed),
  tipRdy,
  showTip,
  hideTip,
});

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
    <template v-if="useLegacyLayout">
      <div v-if="$slots.brand || showCollapser" class="isb-logo">
        <SidebarBrand v-if="$slots.brand">
          <slot name="brand" />
        </SidebarBrand>
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

      <SidebarBody>
        <SidebarGroup v-for="grp in groups" :key="grp.id">
          <SidebarSection v-if="grp.label">{{ grp.label }}</SidebarSection>
          <SidebarItem
            v-for="item in grp.items"
            :key="item.id"
            :item="item"
            :active="activeItem === item.id"
            :badge="badgeFor(item)"
            @click="onItemClick(item)"
          />
        </SidebarGroup>
      </SidebarBody>

      <SidebarFooter v-if="$slots.footer">
        <slot name="footer" />
      </SidebarFooter>
      <SidebarFooter v-else-if="footerItems.length">
        <SidebarItem
          v-for="item in footerItems"
          :key="item.id"
          :item="item"
          :active="activeItem === item.id"
          :badge="badgeFor(item)"
          @click="onItemClick(item)"
        />
      </SidebarFooter>
    </template>

    <slot v-else />

    <div v-if="tip" class="isb-floatip" :style="{ top: `${tip.top}px` }">
      {{ tip.lbl }}
    </div>
  </aside>
</template>
