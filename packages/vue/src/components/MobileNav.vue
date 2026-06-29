<script setup lang="ts">
import { computed, ref } from 'vue';
import { resolvePrimaryNavItems, type SidebarNavGroup, type SidebarNavItem } from '@iskra-ui/core';
import { useIskraT } from '../i18n/useIskraT.js';
import Icon from './Icon.vue';
import Sheet from './Sheet.vue';
import { cx } from '../utils/cx.js';
import type { IconName } from '@iskra-ui/icons';

const props = withDefaults(
  defineProps<{
    groups: SidebarNavGroup[];
    footerItems?: SidebarNavItem[];
    primaryItems: string[];
    activeItem?: string;
    menuLabel?: string;
    sheetTitle?: string;
    badges?: Record<string, number>;
    ariaLabel?: string;
    class?: string;
  }>(),
  {
    footerItems: () => [],
    badges: () => ({}),
  },
);

const emit = defineEmits<{
  navigate: [id: string];
  itemClick: [item: SidebarNavItem];
}>();

const t = useIskraT();
const menuOpen = ref(false);

const resolvedAriaLabel = computed(() => props.ariaLabel ?? t('a11y.mobileNavigation'));
const resolvedMenuLabel = computed(() => props.menuLabel ?? t('a11y.openMenu'));
const resolvedSheetTitle = computed(() => props.sheetTitle ?? t('a11y.moreNavigation'));
const primary = computed(() => resolvePrimaryNavItems(props.groups, props.primaryItems, 4));

const isMenuActive = computed(
  () => props.activeItem != null && !primary.value.some((item) => item.id === props.activeItem),
);

function badgeFor(item: SidebarNavItem) {
  return props.badges[item.id] ?? item.badge;
}

function handleSelect(item: SidebarNavItem) {
  emit('itemClick', item);
  emit('navigate', item.id);
  menuOpen.value = false;
}
</script>

<template>
  <nav
    :class="cx('iskra-mobile-nav', $props.class)"
    role="navigation"
    :aria-label="resolvedAriaLabel"
  >
    <button
      v-for="item in primary"
      :key="item.id"
      type="button"
      :class="cx('imn-tab', activeItem === item.id && 'imn-tab--on')"
      :disabled="item.disabled"
      :aria-current="activeItem === item.id ? 'page' : undefined"
      @click="handleSelect(item)"
    >
      <span class="imn-tab-ico">
        <Icon v-if="item.icon" :name="item.icon as IconName" :size="18" />
      </span>
      <span class="imn-tab-lbl">{{ item.label }}</span>
      <span
        v-if="badgeFor(item) != null && badgeFor(item)! > 0"
        class="imn-tab-bdg"
        aria-hidden="true"
      >
        {{ badgeFor(item)! > 9 ? '9+' : badgeFor(item) }}
      </span>
    </button>

    <button
      type="button"
      :class="cx('imn-tab', isMenuActive && 'imn-tab--on')"
      :aria-label="resolvedMenuLabel"
      :aria-expanded="menuOpen"
      @click="menuOpen = true"
    >
      <span class="imn-tab-ico">
        <Icon name="grid" :size="18" />
      </span>
      <span class="imn-tab-lbl">{{ resolvedMenuLabel }}</span>
    </button>
  </nav>

  <Sheet v-model:open="menuOpen" :title="resolvedSheetTitle" snap="half">
    <div class="imn-sheet-body">
      <div v-for="(group, index) in groups" :key="group.id" class="imn-sheet-grp">
        <div v-if="index > 0" class="imn-sheet-divider" role="separator" />
        <div v-if="group.label" class="imn-sheet-sec" aria-hidden="true">{{ group.label }}</div>
        <button
          v-for="item in group.items"
          :key="item.id"
          type="button"
          :class="cx('imn-sheet-item', activeItem === item.id && 'imn-sheet-item--on')"
          :disabled="item.disabled"
          :aria-current="activeItem === item.id ? 'page' : undefined"
          @click="handleSelect(item)"
        >
          <span class="imn-sheet-item-ico">
            <Icon v-if="item.icon" :name="item.icon as IconName" :size="16" />
          </span>
          <span class="imn-sheet-item-lbl">{{ item.label }}</span>
          <span
            v-if="badgeFor(item) != null && badgeFor(item)! > 0"
            class="imn-sheet-item-bdg"
            :aria-label="`${item.label}: ${badgeFor(item)}`"
          >
            {{ badgeFor(item) }}
          </span>
        </button>
      </div>

      <div v-if="footerItems.length" class="imn-sheet-grp">
        <div class="imn-sheet-divider" role="separator" />
        <button
          v-for="item in footerItems"
          :key="item.id"
          type="button"
          :class="cx('imn-sheet-item', activeItem === item.id && 'imn-sheet-item--on')"
          :aria-current="activeItem === item.id ? 'page' : undefined"
          @click="handleSelect(item)"
        >
          <span class="imn-sheet-item-ico">
            <Icon v-if="item.icon" :name="item.icon as IconName" :size="16" />
          </span>
          <span class="imn-sheet-item-lbl">{{ item.label }}</span>
        </button>
      </div>
    </div>
  </Sheet>
</template>
