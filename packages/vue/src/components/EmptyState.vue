<script lang="ts">
export type EmptyStateVariant = 'default' | 'not-found';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../utils/cx.js';
import Button from './Button.vue';
import Icon from './Icon.vue';

const NOT_FOUND_DEFAULTS = {
  title: 'Страница не найдена',
  description:
    'Запрошенный адрес отсутствует в платформе Искра или был перемещён. Проверьте ссылку или вернитесь на главную.',
  code: 404,
} as const;

const props = withDefaults(
  defineProps<{
    variant?: EmptyStateVariant;
    code?: number;
    fullPage?: boolean;
    title?: string;
    description?: string;
    showBack?: boolean;
    class?: string;
  }>(),
  { variant: 'default', fullPage: false, showBack: false },
);

const emit = defineEmits<{
  home: [];
  back: [];
}>();

const isNotFound = computed(() => props.variant === 'not-found');
const resolvedCode = computed(
  () => props.code ?? (isNotFound.value ? NOT_FOUND_DEFAULTS.code : undefined),
);
const resolvedTitle = computed(
  () => props.title ?? (isNotFound.value ? NOT_FOUND_DEFAULTS.title : ''),
);
const resolvedDescription = computed(
  () => props.description ?? (isNotFound.value ? NOT_FOUND_DEFAULTS.description : undefined),
);
</script>

<template>
  <div
    :class="
      cx(
        'ik-empty',
        isNotFound && 'ik-empty-not-found',
        fullPage && 'ik-empty-full-page',
        $props.class,
      )
    "
    :role="isNotFound ? 'region' : undefined"
    :aria-label="isNotFound ? 'Страница не найдена' : undefined"
  >
    <div v-if="resolvedCode != null" class="ik-empty-code" aria-hidden="true">
      {{ resolvedCode }}
    </div>
    <span v-if="$slots.icon || isNotFound" class="ik-empty-ico" aria-hidden="true">
      <slot name="icon">
        <Icon v-if="isNotFound" name="help" :size="40" />
      </slot>
    </span>
    <div class="ik-empty-title">{{ resolvedTitle }}</div>
    <div v-if="resolvedDescription" class="ik-empty-desc">{{ resolvedDescription }}</div>
    <div v-if="$slots.action || $slots.secondary || isNotFound" class="ik-empty-actions">
      <div v-if="$slots.action || isNotFound" class="ik-empty-action">
        <slot name="action">
          <Button v-if="isNotFound" @click="emit('home')">На главную</Button>
        </slot>
      </div>
      <div v-if="$slots.secondary || (isNotFound && showBack)" class="ik-empty-action">
        <slot name="secondary">
          <Button v-if="isNotFound && showBack" variant="ghost" @click="emit('back')">Назад</Button>
        </slot>
      </div>
    </div>
  </div>
</template>
