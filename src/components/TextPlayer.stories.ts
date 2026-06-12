import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, useTemplateRef } from 'vue';
import TextPlayer from './TextPlayer.vue';

const sampleText =
  'これはテキストプレイヤーのデモです。\n一定間隔で1文字ずつ表示され、全文表示後に end イベントを発火します。\nクリックすると全文を即時表示します。';

/**
 * テキストを1文字ずつ送り出すコンポーネント。
 * `start` / `pause` / `reset` / `end` を expose しており、外部から制御できる。
 * 全文表示後、またはクリック時に `end` イベントを発火する。
 */
const meta = {
  title: 'Components/TextPlayer',
  component: TextPlayer,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    maxLines: { control: { type: 'number', min: 1 } },
    typeInterval: { control: { type: 'number', min: 0 } },
  },
  args: {
    text: sampleText,
    maxLines: 3,
    typeInterval: 50,
  },
  render: (args) => ({
    components: { TextPlayer },
    setup() {
      const playerRef = useTemplateRef<InstanceType<typeof TextPlayer>>('player');
      const ended = ref(false);
      const onEnd = () => {
        ended.value = true;
      };
      const start = () => {
        ended.value = false;
        playerRef.value?.start();
      };
      return { args, playerRef, ended, onEnd, start };
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; max-width:480px;">
        <div style="display:flex; gap:8px;">
          <button @click="start">start</button>
          <button @click="playerRef?.pause()">pause</button>
          <button @click="playerRef?.reset()">reset</button>
          <button @click="playerRef?.end()">end</button>
        </div>
        <div style="border:1px solid #cbd5e1; border-radius:4px; padding:12px;">
          <TextPlayer ref="player" v-bind="args" @end="onEnd" />
        </div>
        <p style="margin:0; font-size:12px; color:#555;">end イベント: {{ ended ? '発火済み' : '未発火' }}</p>
      </div>
    `,
  }),
} satisfies Meta<typeof TextPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'start で文字送りを開始。pause / reset / end や本文クリックで制御できる。',
      },
    },
  },
};

export const FastTyping: Story = {
  args: {
    typeInterval: 10,
  },
  parameters: {
    docs: { description: { story: '`typeInterval: 10` で高速に文字送りする例。' } },
  },
};
