import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TileList from './TileList.vue';

/**
 * 子要素をグリッド状に並べるレイアウトコンポーネント。
 * `columns` で列数、`gap` でタイル間の余白を指定し、中身は slot で渡す。
 */
const meta = {
  title: 'Components/TileList',
  component: TileList,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: { type: 'number', min: 1 } },
    gap: { control: 'text' },
  },
  args: {
    columns: 3,
    gap: '8px',
  },
  render: (args) => ({
    components: { TileList },
    setup() {
      const tiles = Array.from({ length: 9 }, (_, i) => i + 1);
      return { args, tiles };
    },
    template: `
      <TileList v-bind="args">
        <div
          v-for="n in tiles"
          :key="n"
          style="display:flex; align-items:center; justify-content:center; height:64px; background:#3b82f6; color:#fff; border-radius:4px;"
        >{{ n }}</div>
      </TileList>
    `,
  }),
} satisfies Meta<typeof TileList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: '3列・8pxの余白でタイルを並べた基本例。' } },
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: '16px',
  },
  parameters: {
    docs: { description: { story: '`columns: 2` と広めの `gap` を指定した例。' } },
  },
};
