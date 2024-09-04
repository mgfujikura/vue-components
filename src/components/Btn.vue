<script setup lang="ts">
import { computed } from 'vue';
import * as R from 'remeda';

const props = defineProps<{
  img?: string;
  disabled?: any;
  imgDisabled?: string;
  width?: number;
  height?: number;
  nineSlice?:
    | number
    | {
        repeat?: string;
        slice?: string;
        width?: string;
      };
  shape?: 'square' | 'capsule';
  radius?: number;
}>();

const style = computed(() => {
  console.log('props', props);
  const style: any = {};
  if (props.width) style.width = `${props.width}px`;
  if (props.height) style.height = `${props.height}px`;
  if (props.nineSlice) {
    style.borderImage = `url(${props.img})`;
    if (props.disabled && props.imgDisabled) style.borderImage = `url(${props.imgDisabled})`;
    if (R.isNumber(props.nineSlice)) {
      style.borderImageWidth = `${props.nineSlice}px`;
      style.borderImageSlice = `${props.nineSlice} fill`;
    } else {
      const nineSlice = props.nineSlice as any;
      for (const p of Object.keys(nineSlice)) {
        const name = 'borderImage' + p.charAt(0).toUpperCase() + p.slice(1);
        style[name] = nineSlice[p];
      }
    }
  } else {
    if (props.img) style.background = `center/100% 100% no-repeat url(${props.img})`;
    if (props.disabled && props.imgDisabled) style.background = `center/100% 100% no-repeat url(${props.imgDisabled})`;
  }
  if (props.shape == 'capsule') style.borderRadius = '9999px';
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
    <slot />
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
button.FwComponentBtn:hover {
  cursor: pointer;
}
</style>
