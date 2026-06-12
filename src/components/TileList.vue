<script setup lang="ts">
import { computed } from 'vue';
import * as R from 'remeda';

const props = defineProps<{
  columns: number;
  gap: number | string;
}>();

const gapValue = computed(() => (R.isNumber(props.gap) ? `${props.gap}px` : props.gap));
</script>
<template>
  <div class="FwComponentTileList">
    <slot />
  </div>
</template>
<style scoped>
.FwComponentTileList {
  display: grid;
  gap: v-bind(gapValue);
  grid-template-columns: repeat(v-bind(columns), 1fr);
}
</style>
