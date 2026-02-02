<script setup lang="ts">
import { nextTick, onUnmounted, ref, useTemplateRef } from 'vue';

type Props = {
  text: string;
  maxLines: number;
  typeInterval?: number;
};

const props = withDefaults(defineProps<Props>(), {
  typeInterval: 50,
});

const emit = defineEmits<{
  (e: 'end'): void;
}>();

// テキスト表示領域のDOM参照
const player = useTemplateRef('player');

// 現在表示中のテキスト
const visibleText = ref('');
// 文字送り用タイマーID
const timerId = ref<NodeJS.Timeout>();

// 進行中のタイマーをクリア
const clearTimer = () => {
  if (timerId.value) {
    clearInterval(timerId.value);
    timerId.value = undefined;
  }
};

// 文字送りを開始
// ※visibleTextの初期化はresetでのみ行う
const start = () => {
  clearTimer();
  timerId.value = setInterval(() => {
    if (visibleText.value.length < props.text.length) {
      visibleText.value += props.text.charAt(visibleText.value.length);
      nextTick(() => {
        // スクロールを追従
        if (player.value) {
          player.value.scrollTop = player.value.scrollHeight;
        }
      });
    } else {
      clearTimer();
      emit('end'); // 全文表示後にendイベント発火（描画タイミングは厳密保証しない）
    }
  }, props.typeInterval);
};

// 一時停止
const pause = () => {
  clearTimer();
};

// 表示テキストを初期化
const reset = () => {
  clearTimer();
  visibleText.value = '';
};

// 全文即時表示＋endイベント発火
const end = () => {
  clearTimer();
  if (visibleText.value.length < props.text.length) {
    visibleText.value = props.text;
    nextTick(() => {
      if (player.value) {
        player.value.scrollTop = player.value.scrollHeight;
        emit('end');
      }
    });
    return;
  }
  emit('end');
};

// 外部から操作可能なAPIをexpose
defineExpose({
  start,
  pause,
  reset,
  end,
});

// コンポーネント破棄時にタイマーを必ずクリア
onUnmounted(() => {
  clearTimer();
});
</script>
<template>
  <div
    ref="player"
    class="TextPlayer"
    @click="end"
  >
    {{ visibleText }}
  </div>
</template>
<style scoped>
.TextPlayer {
  width: 100%;
  height: calc(1em * v-bind(maxLines));
  overflow-y: hidden;
  white-space: pre-wrap;
}
</style>
