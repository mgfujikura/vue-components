<script setup lang="ts">
import { computed } from 'vue';
import * as R from 'remeda';

export type WindowProps = {
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
  windowClass?: any;
  windowStyle?: { [key: string]: any };
};

const props = defineProps<WindowProps>();

// ウィンドウ本体のスタイル計算
const windowStyle = computed(() => {
  const style: any = {};
  if (props.width) style.width = R.isNumber(props.width) ? `${props.width}px` : props.width;
  if (props.height) style.height = R.isNumber(props.height) ? `${props.height}px` : props.height;
  if (props.nineSlice) {
    console.log('props.nineSlice', props.nineSlice);
    style.borderImage = `url(${props.img})`;
    if (R.isNumber(props.nineSlice)) {
      style.borderImageWidth = `${props.nineSlice}px`;
      style.borderImageSlice = `${props.nineSlice} fill`;
    } else {
      const nineSlice = props.nineSlice as any;
      for (const p of Object.keys(nineSlice)) {
        console.log('p', p);
        const name = 'borderImage' + p.charAt(0).toUpperCase() + p.slice(1);
        style[name] = nineSlice[p];
        console.log('name', name, nineSlice[p]);
      }
    }
  } else {
    if (props.img) style.background = `center/100% 100% no-repeat url(${props.img})`;
  }
  if (props.radius) style.borderRadius = R.isNumber(props.radius) ? props.radius + 'px' : props.radius;
  console.log(style);
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
</script>
<template>
  <div
    class="FwComponentWindow"
    :class="windowClass"
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
  /* Dialogと同じ基本レイアウトを継承 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.FwComponentWindow_title {
  /* タイトル部分のスタイル */
}
.FwComponentWindow_content {
  /* コンテンツ部分のスタイル */
  flex: 1;
  overflow: auto;
}
</style>
