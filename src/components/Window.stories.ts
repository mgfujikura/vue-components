import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Window from './Window.vue';

// デモ用の背景画像（外部アセットに依存しないよう SVG の data URI を使用）。
// 角丸は radius プロパティで制御するため、画像自体は矩形にしておく。
const panelImage = (fill: string) =>
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><rect width="320" height="200" fill="${fill}"/></svg>`,
  );

const slateImage = panelImage('#1e293b');
const tealImage = panelImage('#0f766e');

/**
 * タイトル領域と本文領域を持つウィンドウコンポーネント。
 * 背景は `img`（または `nineSlice`）で与える。
 * `title` スロットでヘッダー、デフォルトスロットで本文を渡す。
 */
const meta = {
  title: 'Components/Window',
  component: Window,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    titleHeight: { control: 'number' },
    radius: { control: 'text' },
    img: { control: 'text' },
  },
  args: {
    width: 320,
    height: 200,
    titleHeight: 48,
    img: slateImage,
  },
  render: (args) => ({
    components: { Window },
    setup() {
      return { args };
    },
    template: `
      <Window v-bind="args">
        <template #title>
          <div style="display:flex; align-items:center; height:100%; padding:0 16px; color:#fff; font-weight:bold;">
            タイトル
          </div>
        </template>
        <div style="padding:16px; color:#e2e8f0;">
          本文エリア。デフォルトスロットの内容がここに表示されます。
        </div>
      </Window>
    `,
  }),
} satisfies Meta<typeof Window>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '`img` で背景画像を全面表示した基本例。' } },
  },
};

export const Rounded: Story = {
  args: {
    img: tealImage,
    radius: 24,
  },
  parameters: {
    docs: { description: { story: '`img` 背景に `radius` で角丸を指定した例。' } },
  },
};
