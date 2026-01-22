<script setup lang="ts">
const props = defineProps<{
  columns: number;
  gap: string;
}>();
</script>
<template>
  <div class="TileList">
    <slot />
  </div>
</template>
<style scoped>
.TileList {
  display: grid;
  gap: v-bind(gap);
  grid-template-columns: repeat(v-bind(columns), 1fr);
}
</style>
