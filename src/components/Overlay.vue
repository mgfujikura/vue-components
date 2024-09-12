<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  style?: { [key: string]: any };
  class?: any;
  color?: string;
  closeOnClick?: boolean;
}>();
const model = defineModel<boolean>();

const color = computed(() => {
  return props.color || '#00000099';
});

const cls = computed(() => {
  return props.class;
});

const onClick = () => {
  if (props.closeOnClick) {
    model.value = false;
  }
};
</script>
<template>
  <Teleport to="body">
    <div
      v-if="model"
      class="FwComponentOverlay"
      :class="cls"
      :style="[
        {
          backgroundColor: color,
        },
        style,
      ]"
      @click="onClick"
    >
      <slot />
    </div>
  </Teleport>
</template>
<style scoped>
div.FwComponentOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>
