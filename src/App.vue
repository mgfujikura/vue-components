<script setup lang="ts">
import Btn from '@/components/Btn.vue';
import { ref } from 'vue';

const disabledCheck = ref(false);
const disabledCheck2 = ref(false);
const disabledCheck3 = ref(false);
</script>

<template>
  <div>
    <h1>Btn</h1>
    <h2>simple</h2>
    <Btn
      img="/img/gradation-btn.png"
      img-disabled="/img/nine-slice-disabled-btn.png"
      :width="100"
      :height="50"
      :disabled="disabledCheck"
    >
      シンプルボタン
    </Btn>
    <input
      id="disabledCheck"
      v-model="disabledCheck"
      type="checkbox"
    /><label for="disabledCheck">disabled</label>
    <h2>9-slice</h2>
    <Btn
      img="/img/nine-slice-btn.png"
      img-disabled="/img/nine-slice-disabled-btn.png"
      :width="120"
      :height="40"
      :nine-slice="5"
      :disabled="disabledCheck2"
    >
      9-Sliceボタン
    </Btn>
    <input
      id="disabledCheck2"
      v-model="disabledCheck2"
      type="checkbox"
    /><label for="disabledCheck2">disabled</label>
    <h2>9-slice オブジェクト指定</h2>
    <Btn
      img="/img/nine-slice-btn.png"
      img-disabled="/img/nine-slice-disabled-btn.png"
      :width="120"
      :height="40"
      :nine-slice="{
        width: '5px',
        slice: '5',
      }"
    >
      9-Sliceボタン
    </Btn>
    <h2>カプセル型</h2>
    <Btn
      img="/img/capsule-btn.png"
      img-disabled="/img/capsule-disabled-btn.png"
      :width="200"
      :height="30"
      shape="capsule"
      :nine-slice="15"
      :disabled="disabledCheck3"
    >
      カプセル型ボタン
    </Btn>
    <input
      id="disabledCheck3"
      v-model="disabledCheck3"
      type="checkbox"
    /><label for="disabledCheck3">disabled</label>
  </div>
</template>

<style scoped></style>
