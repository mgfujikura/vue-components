<script setup lang="ts">
import { computed, useAttrs, watch, type StyleValue } from 'vue';

defineOptions({ inheritAttrs: false });

export type OverlayCloseReason = 'backdrop' | 'programmatic';

const props = defineProps<{
  color?: string;
  closeOnClick?: boolean;
}>();
const model = defineModel<boolean>();
const emit = defineEmits<{
  open: [];
  close: [reason: OverlayCloseReason];
  backdropClick: [event: MouseEvent];
}>();
const attrs = useAttrs();

// 次に閉じる際の理由。背景クリック以外（親による v-model 変更等）は programmatic とみなす。
let closeReason: OverlayCloseReason = 'programmatic';

watch(model, (value, oldValue) => {
  if (value && !oldValue) {
    emit('open');
  }
  if (oldValue && !value) {
    emit('close', closeReason);
    closeReason = 'programmatic';
  }
});

const color = computed(() => {
  return props.color || '#00000099';
});

const overlayStyle = computed((): StyleValue => [{ backgroundColor: color.value }, attrs.style as StyleValue]);

const onClick = (event: MouseEvent) => {
  emit('backdropClick', event);
  if (props.closeOnClick) {
    closeReason = 'backdrop';
    model.value = false;
  }
};
</script>
<template>
  <Teleport to="body">
    <div
      v-if="model"
      class="FwComponentOverlay"
      :class="attrs.class"
      :style="overlayStyle"
      @click="onClick"
    >
      <slot />
    </div>
  </Teleport>
</template>
<style>
div.FwComponentOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>
