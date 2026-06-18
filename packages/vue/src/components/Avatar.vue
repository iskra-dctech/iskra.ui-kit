<script lang="ts">
export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'warn' | 'off' | 'error';
export type AvatarStatusDisplay = 'ring' | 'none';
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { cx } from '../utils/cx.js';

const props = withDefaults(
  defineProps<{
    name?: string;
    src?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
    status?: AvatarStatus;
    statusDisplay?: AvatarStatusDisplay;
  }>(),
  {
    size: 'md',
    shape: 'circle',
    statusDisplay: 'ring',
  },
);

const failed = ref(false);
const showImg = computed(() => props.src && !failed.value);
const showRing = computed(() => props.status && props.statusDisplay === 'ring');

const wrapCls = computed(() => cx('ik-av-wrap', showRing.value && `ik-av-ring-${props.status}`));
const avCls = computed(() => cx('ik-av', `ik-av-${props.size}`, `ik-av-${props.shape}`));

const initials = computed(() => {
  if (!props.name) return '?';
  const parts = props.name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0] ?? '').join('') || '?';
});

function onImgError() {
  failed.value = true;
}
</script>

<template>
  <span :class="wrapCls">
    <span :class="avCls" role="img" :aria-label="name">
      <img v-if="showImg" class="ik-av-img" :src="src" alt="" @error="onImgError" />
      <span v-else aria-hidden="true">{{ initials }}</span>
    </span>
  </span>
</template>
