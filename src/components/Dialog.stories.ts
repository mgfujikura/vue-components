import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Dialog from './Dialog.vue';

// デモ用の背景画像（外部アセットに依存しないよう SVG の data URI を使用）
const panelImage =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="220"><rect width="360" height="220" rx="12" fill="#1e293b"/></svg>`,
  );

/**
 * オーバーレイ上にウィンドウを中央表示するダイアログコンポーネント。
 * `v-model`（boolean）で開閉し、`closeOnBackgroundClick` で背景クリック時に閉じる。
 * `title` スロットでヘッダー、デフォルトスロットで本文を渡す。
 */
const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    titleHeight: { control: 'number' },
    img: { control: 'text' },
    backgroundColor: { control: 'text' },
    closeOnBackgroundClick: { control: 'boolean' },
  },
  args: {
    width: 360,
    height: 220,
    titleHeight: 48,
    closeOnBackgroundClick: true,
    img: panelImage,
  },
  render: (args) => ({
    components: { Dialog },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <button @click="open = true">ダイアログを開く</button>
        <Dialog v-bind="args" v-model="open">
          <template #title>
            <div style="display:flex; align-items:center; height:100%; padding:0 16px; color:#fff; font-weight:bold;">
              確認
            </div>
          </template>
          <div style="padding:16px; color:#e2e8f0;">
            本文エリア。{{ args.closeOnBackgroundClick ? '背景クリックで閉じます。' : '' }}
          </div>
        </Dialog>
      </div>
    `,
  }),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '`img` で背景画像を設定し、背景クリックで閉じる基本的なダイアログ。' } },
  },
};

export const StaticBackground: Story = {
  args: {
    closeOnBackgroundClick: false,
  },
  parameters: {
    docs: {
      description: { story: '`closeOnBackgroundClick: false` で背景クリックでは閉じない例。' },
    },
  },
};
