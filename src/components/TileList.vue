<script setup lang="ts">
import { computed } from 'vue';
import * as R from 'remeda';

const props = defineProps<{
  columns: number;
  gap: number | string;
}>();

const gapValue = computed(() => (R.isNumber(props.gap) ? `${props.gap}px` : props.gap));

const gridStyle = computed(() => ({
  gap: gapValue.value,
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
}));
</script>
<template>
  <div class="FwComponentTileList" :style="gridStyle">
    <slot />
  </div>
</template>
<style scoped>
.FwComponentTileList {
  display: grid;
}
</style>
