<script setup lang="ts">
import TextPlayer from './components/TextPlayer.vue';
import Window from './components/Window.vue';
import Btn from './components/Btn.vue';
import Dialog from './components/Dialog.vue';
import Overlay from './components/Overlay.vue';
import TileList from './components/TileList.vue';
import { useScrollBottom, useScrollTop } from './composable/useScrollTopBottom.ts';
import { computed, ref, useTemplateRef } from 'vue';
import { usePointerDrag } from './composable/usePointerDrag.ts';

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

const textPlayer = useTemplateRef('textPlayer');
const endTextPlayer = () => {
  alert('TextPlayer ended');
};

const draggableArea = useTemplateRef('draggableArea');
const dragBox = useTemplateRef('dragBox');
const dragInfo = usePointerDrag(dragBox, draggableArea);
let isDragged = false;
const pos = computed(() => {
  if (!isDragged) {
    if (!dragInfo.isDragging.value) {
      return { x: 100, y: 100 };
    } else {
      isDragged = true;
    }
  }

  if (!dragBox.value || !draggableArea.value) {
    return { x: 0, y: 0 };
  }
  const area = draggableArea.value.getBoundingClientRect();
  const box = dragBox.value.getBoundingClientRect();
  const max = {
    x: area.width - box.width,
    y: area.height - box.height,
  };

  return {
    x: Math.min(Math.max(0, dragInfo.pos.value.x - dragInfo.offset.value.x), max.x),
    y: Math.min(Math.max(0, dragInfo.pos.value.y - dragInfo.offset.value.y), max.y),
  };
});
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
  <div>
    <h2>TextPlayer</h2>
    <div style="display: flex; gap: 10px; align-items: center">
      <div class="TextWindow">
        <TextPlayer
          ref="textPlayer"
          :text="`これはテキストプレイヤーのテストです。\n1文字ずつ表示されます。\n最大行数を超えたらスクロールします。\nクリックでendイベントが発火します。`"
          :max-lines="3"
          :type-interval="100"
          @end="endTextPlayer"
        />
      </div>
      <button @click="textPlayer?.start()">start</button>
      <button @click="textPlayer?.pause()">pause</button>
      <button @click="textPlayer?.reset()">reset</button>
      <button @click="textPlayer?.end()">end</button>
    </div>
  </div>

  <h2>Window</h2>
  <h3>シンプル</h3>
  <Window
    :width="300"
    :height="180"
    img="/img/simple-dialog.png"
    :title-height="32"
    :radius="12"
    :nine-slice="20"
    window-class="custom-window"
    :window-style="{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }"
  >
    <template #title>
      <div style="text-align: center; font-weight: bold; color: #333">Windowタイトル</div>
    </template>
    <div style="padding: 1em; text-align: center">
      これはWindow.vueのサンプルです。<br />
      任意の内容を表示できます。
    </div>
  </Window>
  <div style="margin-top: 2em">
    <h2>Window（ノベルゲーム風サンプル）</h2>
    <Window
      :width="500"
      :height="200"
      img="/img/nine-slice-window.png"
      :title-height="0"
      :radius="0"
      :nine-slice="{
        slice: '90 90 90 420 fill',
        width: '90px 90px 90px 420px',
        repeat: 'stretch',
      }"
      window-class="novel-window"
    >
      <template #title>
        <div style="padding-left: 70px; padding-top: 13px; font-size: 1.5em; font-weight: bold; color: white">
          ノベルゲーム風
        </div>
      </template>
      <div style="padding: 1.5em 0 0 4em; font-size: 1.1em; color: wheat; line-height: 1.7">
        彼女は静かに窓の外を見つめていた。<br />
        「……明日も晴れるといいね」<br />
        その声は、どこか遠くを思うように優しかった。
      </div>
    </Window>
  </div>

  <h2>usePointerDrag</h2>
  <div
    ref="draggableArea"
    class="DraggableArea"
  >
    <div
      ref="dragBox"
      class="DragBox"
      :style="{
        top: pos.y + 'px',
        left: pos.x + 'px',
      }"
    >
      Drag me!
    </div>
  </div>
</template>

<style scoped>
.custom-window {
  border: 2px solid #1976d2;
}
.TextWindow {
  width: 12em;
  height: 3lh;
  border: 2px solid black;
  padding: 0.2em;
  background-color: #f0f0f0;
}
.novel-window {
  border: none;
  background: transparent;
}
.DraggableArea {
  width: 100%;
  height: 300px;
  border: 2px dashed #999;
  background-color: #ccc;
  position: relative;
  margin-bottom: 1em;
}
.DragBox {
  width: 150px;
  height: 150px;
  background: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  touch-action: none;
  position: absolute;
  border-radius: 8px;
  top: 10px;
  left: 100px;
}
</style>
