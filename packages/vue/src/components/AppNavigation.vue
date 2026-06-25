<script setup lang="ts">
import { computed } from 'vue';
import { resolveSidebarGroups, type SidebarNavGroup, type SidebarNavItem, type SidebarVariant } from '@iskra-ui/core';
import { useIskraLocale } from '../i18n/useIskraT.js';
import { useBreakpoint } from '../composables/useMediaQuery.js';
import Sidebar, { type SidebarTheme } from './Sidebar.vue';
import MobileNav from './MobileNav.vue';

const props = withDefaults(
  defineProps<{
    groups?: SidebarNavGroup[];
    footerItems?: SidebarNavItem[];
    primaryItems: string[];
    collapsed?: boolean;
    collapsible?: boolean;
    activeItem?: string;
    variant?: SidebarVariant;
    theme?: SidebarTheme;
    badges?: Record<string, number>;
    ariaLabel?: string;
    menuSheetTitle?: string;
    navClass?: string;
    sidebarClass?: string;
    mobileClass?: string;
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

const emit = defineEmits<{
  navigate: [id: string];
  itemClick: [item: SidebarNavItem];
  toggle: [];
}>();

const { locale } = useIskraLocale();
const isMobile = useBreakpoint('below-md', { ssrMatch: false });

const resolvedGroups = computed(
  () => props.groups ?? resolveSidebarGroups(props.variant, locale),
);
</script>

<template>
  <MobileNav
    v-if="isMobile"
    :groups="resolvedGroups"
    :footer-items="footerItems"
    :primary-items="primaryItems"
    :active-item="activeItem"
    :badges="badges"
    :aria-label="ariaLabel"
    :sheet-title="menuSheetTitle"
    :class="mobileClass ?? navClass"
    @navigate="emit('navigate', $event)"
    @item-click="emit('itemClick', $event)"
  />
  <Sidebar
    v-else
    :groups="resolvedGroups"
    :footer-items="footerItems"
    :collapsed="collapsed"
    :collapsible="collapsible"
    :active-item="activeItem"
    :variant="variant"
    :theme="theme"
    :badges="badges"
    :aria-label="ariaLabel"
    desktop-only
    :class="sidebarClass ?? navClass"
    @navigate="emit('navigate', $event)"
    @item-click="emit('itemClick', $event)"
    @toggle="emit('toggle')"
  />
</template>
