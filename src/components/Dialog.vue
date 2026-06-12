<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue';
import Overlay, { type OverlayCloseReason } from './Overlay.vue';
import Window, { WindowProps } from './Window.vue';
import { computed } from 'vue';

const props = defineProps<
  WindowProps & {
    windowClass?: HTMLAttributes['class'];
    windowStyle?: CSSProperties;
    backgroundColor?: string;
    closeOnBackgroundClick?: boolean;
    backgroundClass?: HTMLAttributes['class'];
    backgroundStyle?: CSSProperties;
  }
>();

const model = defineModel<boolean>();
const emit = defineEmits<{
  open: [];
  close: [reason: OverlayCloseReason];
  backdropClick: [event: MouseEvent];
}>();

const backgroundStyle = computed(() => ({
  ...(props.backgroundStyle ?? {}),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
</script>
<template>
  <Overlay
    v-model="model"
    :color="backgroundColor"
    :close-on-click="closeOnBackgroundClick"
    :style="backgroundStyle"
    :class="backgroundClass"
    @open="emit('open')"
    @close="(reason) => emit('close', reason)"
    @backdrop-click="(event) => emit('backdropClick', event)"
  >
    <Window
      :width="props.width"
      :height="props.height"
      :img="props.img"
      :title-height="props.titleHeight"
      :nine-slice="props.nineSlice"
      :radius="props.radius"
      :class="props.windowClass"
      :style="props.windowStyle"
    >
      <template #title>
        <slot name="title" />
      </template>
      <slot />
    </Window>
  </Overlay>
</template>
