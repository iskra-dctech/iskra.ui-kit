<script setup lang="ts" generic="T">
import { computed } from 'vue';
import { useIskraT } from '../i18n/useIskraT.js';
import { cx } from '../utils/cx.js';
import Spinner from './Spinner.vue';

export type DataListDensity = 'regular' | 'compact';

withDefaults(
  defineProps<{
    items: T[];
    getItemKey: (item: T) => string;
    loading?: boolean;
    error?: boolean;
    density?: DataListDensity;
    ariaLabel: string;
  }>(),
  {
    loading: false,
    error: false,
    density: 'regular',
  },
);

defineSlots<{
  default(props: { item: T; index: number }): unknown;
  empty?(): unknown;
  error?(): unknown;
}>();

const t = useIskraT();
const emptyLabel = computed(() => t('common.noData'));
</script>

<template>
  <div v-if="error" class="ik-datalist-state ik-datalist-state-error" role="alert">
    <slot name="error" />
  </div>
  <div v-else-if="loading" class="ik-datalist-state" :aria-label="ariaLabel" aria-busy="true">
    <Spinner size="m" />
  </div>
  <div v-else-if="items.length === 0" class="ik-datalist-state" role="status">
    <slot name="empty">{{ emptyLabel }}</slot>
  </div>
  <ul
    v-else
    :class="cx('ik-datalist', density === 'compact' && 'ik-datalist-compact')"
    role="list"
    :aria-label="ariaLabel"
  >
    <li
      v-for="(item, index) in items"
      :key="getItemKey(item)"
      class="ik-datalist-item"
      role="listitem"
    >
      <slot :item="item" :index="index" />
    </li>
  </ul>
</template>
