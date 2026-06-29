<script lang="ts">
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const DEFAULT_ICON: Record<AlertVariant, string> = {
  info: 'info',
  success: 'check-circle',
  warning: 'warning',
  error: 'x-circle',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { type IconName } from '@iskra-ui/icons';
import { useIskraT } from '../i18n/useIskraT.js';
import { cx } from '../utils/cx.js';
import Icon from './Icon.vue';

const props = withDefaults(
  defineProps<{
    variant?: AlertVariant;
    title?: string;
    closable?: boolean;
    closeLabel?: string;
  }>(),
  { variant: 'info', closable: false },
);

const t = useIskraT();
const resolvedCloseLabel = computed(() => props.closeLabel ?? t('common.close'));

const emit = defineEmits<{ close: [] }>();

const role = computed(() =>
  props.variant === 'error' || props.variant === 'warning' ? 'alert' : 'status',
);
const cls = computed(() => cx('ik-alert', `ik-alert-${props.variant}`));
const iconName = computed(() => DEFAULT_ICON[props.variant] as IconName);
</script>

<template>
  <div :class="cls" :role="role">
    <span class="ik-alert-ico" aria-hidden="true">
      <slot name="icon"><Icon :name="iconName" :size="16" /></slot>
    </span>
    <div class="ik-alert-body">
      <div v-if="title" class="ik-alert-title">{{ title }}</div>
      <slot />
    </div>
    <button
      v-if="closable"
      type="button"
      class="ik-alert-close"
      :aria-label="resolvedCloseLabel"
      @click="emit('close')"
    >
      <Icon name="close" :size="14" />
    </button>
  </div>
</template>
