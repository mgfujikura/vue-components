<script setup lang="ts">
import Btn from '@/components/Btn.vue';
import Dialog from '@/components/Dialog.vue';
import Overlay from '@/components/Overlay.vue';
import TileList from '@/components/TileList.vue';
import { useScrollBottom, useScrollTop } from '@/composable/useScrollTopBottom.ts';
import { ref, useTemplateRef } from 'vue';

const disabledCheck = ref(false);
const disabledCheck2 = ref(false);
const disabledCheck3 = ref(false);

const overlay = ref(false);

const showSimpleDialog = ref(false);
const showDialogWithTitle = ref(false);

const scrollBox = useTemplateRef('scrollBox');
useScrollTop(
  scrollBox,
  () => {
    alert('Scrolled to top!');
  },
  {
    ignoreInitial: true,
  },
);
useScrollBottom(
  scrollBox,
  () => {
    alert('Scrolled to bottom!');
  },
  {
    ignoreInitial: true,
  },
);
</script>

<template>
  <h1>TEST</h1>
  <div>
    <h2>Btn</h2>
    <h3>simple</h3>
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
    <h3>9-slice</h3>
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
    <h3>9-slice オブジェクト指定</h3>
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
    <h3>カプセル型</h3>
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
  <div>
    <h2>Overlay</h2>
    <input
      id="overlay"
      v-model="overlay"
      type="checkbox"
    /><label for="overlay">overlay</label>
    <Overlay
      v-model="overlay"
      :close-on-click="true"
    >
      TEST
    </Overlay>
  </div>
  <div>
    <h2>Dialog</h2>
    <h3>シンプル</h3>
    <button @click="showSimpleDialog = true">Show Dialog</button>
    <Dialog
      v-model="showSimpleDialog"
      :width="400"
      :height="300"
      :close-on-background-click="true"
      :nine-slice="20"
      :radius="20"
      img="/img/simple-dialog.png"
    >
      TEST
    </Dialog>
    <h3>タイトル付き modal</h3>
    <button @click="showDialogWithTitle = true">Show Dialog</button>
    <Dialog
      v-model="showDialogWithTitle"
      :width="400"
      :height="300"
      :nine-slice="20"
      :radius="20"
      :title-height="20"
      img="/img/dialog-with-title.png"
    >
      <template #title>
        <div style="color: white; font-weight: bold; text-align: center">ダイアログタイトル</div>
      </template>
      <div style="height: 100%; display: flex; justify-content: center; align-items: center">
        <button @click="showDialogWithTitle = false">閉じる</button>
      </div>
    </Dialog>
  </div>
  <div>
    <h2>useScrollTop, useScrollBottom</h2>
    <div
      ref="scrollBox"
      style="height: 200px; overflow-y: scroll; border: 1px solid black"
    >
      <div
        v-for="n in 100"
        :key="n"
      >
        Item {{ n }}
      </div>
    </div>
  </div>
  <div>
    <h2>TileList</h2>
    <TileList
      :columns="4"
      gap="10px"
    >
      <div
        v-for="n in 10"
        :key="n"
        style="border: black solid 1px"
      >
        Item {{ n }}
      </div>
    </TileList>
  </div>
</template>

<style scoped></style>
