<script setup lang="ts">
import { computed } from 'vue';
import * as R from 'remeda';

export type WindowProps = {
  width: number | string;
  height?: number | string;
  img?: string;
  titleHeight?: number | string;
  nineSlice?:
    | number
    | {
        repeat?: string;
        slice?: string;
        width?: string;
      };
  radius?: number | string;
};

const props = defineProps<WindowProps>();

const windowStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.width) style.width = R.isNumber(props.width) ? `${props.width}px` : props.width;
  if (props.height) style.height = R.isNumber(props.height) ? `${props.height}px` : props.height;
  if (props.nineSlice) {
    style.borderImage = `url(${props.img})`;
    if (R.isNumber(props.nineSlice)) {
      style.borderImageWidth = `${props.nineSlice}px`;
      style.borderImageSlice = `${props.nineSlice} fill`;
    } else {
      const nineSlice = props.nineSlice;
      for (const p of Object.keys(nineSlice) as (keyof typeof nineSlice)[]) {
        const value = nineSlice[p];
        if (value === undefined) continue;
        const name = 'borderImage' + p.charAt(0).toUpperCase() + p.slice(1);
        style[name] = value;
      }
    }
  } else {
    if (props.img) style.background = `center/100% 100% no-repeat url(${props.img})`;
  }
  if (props.radius) style.borderRadius = R.isNumber(props.radius) ? props.radius + 'px' : props.radius;
  return style;
});

const titleStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.titleHeight !== undefined) {
    style.height = R.isNumber(props.titleHeight) ? `${props.titleHeight}px` : props.titleHeight;
  }
  return style;
});

const contentStyle = computed(() => {
  const style: Record<string, string> = {};
  if (titleStyle.value.height) {
    style.height = `calc(100% - ${titleStyle.value.height})`;
  } else {
    style.height = '100%';
  }
  return style;
});
</script>
<template>
  <div
    class="FwComponentWindow"
    :style="windowStyle"
    @click.stop=""
  >
    <div
      :style="titleStyle"
      class="FwComponentWindow_title"
    >
      <slot name="title" />
    </div>
    <div
      :style="contentStyle"
      class="FwComponentWindow_content"
    >
      <slot />
    </div>
  </div>
</template>
<style scoped>
.FwComponentWindow {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.FwComponentWindow_content {
  flex: 1;
  overflow: auto;
}
</style>
