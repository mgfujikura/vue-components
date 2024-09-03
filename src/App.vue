<script setup lang="ts">
import Btn from '@/components/Btn.vue';
import { ref } from 'vue';

const disabledCheck = ref(false);
</script>

<template>
  <div>
    <h1>Btn</h1>
    <h2>simple</h2>
    <Btn
      img="/img/gradation-btn.png"
      img-disabled="/img/nine-slice-btn.png"
      :width="91"
      :height="61"
      :disabled="disabledCheck"
      >ボタン</Btn
    >
    <input
      type="checkbox"
      id="disabledCheck"
      v-model="disabledCheck"
    /><label for="disabledCheck">disabled</label>
    <h2>disabled</h2>
  </div>
</template>

<style scoped></style>
