<script lang="ts">
export interface TabItem {
  value: string;
  label: string;
  content?: string;
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { createId, createTabsIds, firstEnabledValue, getNextTabValue } from '@iskra-ui/core';

const props = withDefaults(
  defineProps<{
    items: TabItem[];
    /** Selected tab value (v-model). */
    modelValue?: string;
    defaultValue?: string;
    ariaLabel?: string;
  }>(),
  {},
);

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const baseId = createId('ik-tabs');
const ids = createTabsIds(baseId);
const internal = ref(props.modelValue ?? props.defaultValue ?? firstEnabledValue(props.items));
watch(
  () => props.modelValue,
  (v) => {
    if (v != null) internal.value = v;
  },
);
const current = computed(() => props.modelValue ?? internal.value);

const tabEls = ref<Record<string, HTMLButtonElement | null>>({});
function setTabEl(value: string, el: Element | null) {
  tabEls.value[value] = el as HTMLButtonElement | null;
}

function select(value: string) {
  internal.value = value;
  emit('update:modelValue', value);
}

function onKeydown(e: KeyboardEvent, value: string) {
  const next = getNextTabValue(props.items, value, e.key);
  if (next) {
    e.preventDefault();
    select(next);
    tabEls.value[next]?.focus();
  }
}
</script>

<template>
  <div class="ik-tabs">
    <div class="ik-tabs-list" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="item in items"
        :key="item.value"
        :ref="(el) => setTabEl(item.value, el as Element | null)"
        type="button"
        role="tab"
        :id="ids.tab(item.value)"
        :aria-selected="item.value === current"
        :aria-controls="ids.panel(item.value)"
        :tabindex="item.value === current ? 0 : -1"
        :disabled="item.disabled"
        class="ik-tabs-tab"
        @click="select(item.value)"
        @keydown="(e) => onKeydown(e, item.value)"
      >
        {{ item.label }}
      </button>
    </div>
    <div
      v-for="item in items"
      :key="item.value"
      role="tabpanel"
      :id="ids.panel(item.value)"
      :aria-labelledby="ids.tab(item.value)"
      :hidden="item.value !== current"
      :tabindex="0"
      class="ik-tabs-panel"
    >
      <slot v-if="item.value === current" :name="item.value">{{ item.content }}</slot>
    </div>
  </div>
</template>
