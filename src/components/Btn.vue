<script setup lang="ts">
import { computed, ref, unref } from 'vue';

const props = defineProps<{
  img?: string;
  disabled?: any;
  imgDisabled?: string;
  width?: number;
  height?: number;
  nineSlice?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  shape?: 'square' | 'cupsule';
  radius?: number;
}>();

const style = computed(() => {
  console.log('props', props);
  const style: any = {};
  props.img && (style.background = `url(${props.img})`);
  props.disabled && props.imgDisabled && (style.background = `url(${props.imgDisabled})`);
  props.width && (style.width = `${props.width}px`);
  props.height && (style.height = `${props.height}px`);
  console.log('style', style);
  return style;
});
</script>
<template>
  <button
    class="FwComponentBtn"
    :style="style"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
<style>
button.FwComponentBtn {
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
}
button.FwComponentBtn:active {
  background: none;
}
</style>
