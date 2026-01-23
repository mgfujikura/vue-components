<script setup lang="ts">
import Overlay from '../components/Overlay.vue';
import { computed } from 'vue';
import * as R from 'remeda';

const props = defineProps<{
  width: number | string;
  height?: number | string;
  img?: string;
  titleHeight?: number;
  nineSlice?:
    | number
    | {
        repeat?: string;
        slice?: string;
        width?: string;
      };
  radius?: number | string;
  dialogClass?: any;
  dialogStyle?: { [key: string]: any };
  backgroundColor?: string;
  closeOnBackgroundClick?: boolean;
  backgroundClass?: any;
  backgroundStyle?: { [key: string]: any };
}>();

const dialogStyle = computed(() => {
  const style: any = {};
  if (props.width) style.width = R.isNumber(props.width) ? `${props.width}px` : props.width;
  if (props.height) style.height = R.isNumber(props.height) ? `${props.height}px` : props.height;
  if (props.nineSlice) {
    style.borderImage = `url(${props.img})`;
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
  }
  if (props.radius) style.borderRadius = R.isNumber(props.radius) ? props.radius + 'px' : props.radius;
  return style;
});

const titleStyle = computed(() => {
  const style: any = {};
  if (props.titleHeight) style.height = R.isNumber(props.titleHeight) ? `${props.titleHeight}px` : props.titleHeight;
  return style;
});

const contentStyle = computed(() => {
  const style: any = {};
  if (titleStyle.value.height) {
    style.height = `calc(100% - ${titleStyle.value.height})`;
  } else {
    style.height = '100%';
  }
  return style;
});

const backgroundStyle = computed(() => {
  const style = props.backgroundStyle || {};
  style.display = 'flex';
  style.justifyContent = 'center';
  style.alignItems = 'center';
  return style;
});
</script>
<template>
  <Overlay
    :color="backgroundColor"
    :close-on-click="closeOnBackgroundClick"
    :style="backgroundStyle"
    :class="backgroundClass"
  >
    <div
      class="FwComponentDialog"
      :class="dialogClass"
      :style="[dialogStyle, dialogStyle]"
      @click.stop=""
    >
      <div
        :style="titleStyle"
        class="FwComponentDialog_title"
      >
        <slot name="title" />
      </div>
      <div
        :style="contentStyle"
        class="FwComponentDialog_content"
      >
        <slot />
      </div>
    </div>
  </Overlay>
</template>
<style></style>
