<script setup lang="ts">
import Overlay from '../components/Overlay.vue';
import Window, { WindowProps } from './Window.vue';
import { computed } from 'vue';

const props = defineProps<
  WindowProps & {
    dialogClass?: any;
    dialogStyle?: { [key: string]: any };
    backgroundColor?: string;
    closeOnBackgroundClick?: boolean;
    backgroundClass?: any;
    backgroundStyle?: { [key: string]: any };
  }
>();

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
    <Window
      :width="props.width"
      :height="props.height"
      :img="props.img"
      :title-height="props.titleHeight"
      :nine-slice="props.nineSlice"
      :radius="props.radius"
      :window-class="props.dialogClass"
      :window-style="props.dialogStyle"
    >
      <template #title>
        <slot name="title" />
      </template>
      <slot />
    </Window>
  </Overlay>
</template>

<style></style>
