import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Overlay from './Overlay.vue';

/**
 * 画面全体を覆うオーバーレイコンポーネント。
 * `v-model`（boolean）で表示を制御し、`Teleport` で body 直下に描画する。
 * `closeOnClick` を有効にすると、オーバーレイのクリックで閉じる。
 */
const meta = {
  title: 'Components/Overlay',
  component: Overlay,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'text' },
    closeOnClick: { control: 'boolean' },
  },
  render: (args) => ({
    components: { Overlay },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <button @click="open = true">オーバーレイを開く</button>
        <Overlay v-bind="args" v-model="open">
          <div style="display:flex; align-items:center; justify-content:center; height:100%; color:#fff; font-size:20px;">
            オーバーレイの内容（{{ args.closeOnClick ? '背景クリックで閉じます' : '閉じるには Esc またはツール再描画' }}）
          </div>
        </Overlay>
      </div>
    `,
  }),
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    closeOnClick: true,
  },
  parameters: {
    docs: { description: { story: '`closeOnClick` を有効にしたオーバーレイ。背景クリックで閉じる。' } },
  },
};

export const CustomColor: Story = {
  args: {
    closeOnClick: true,
    color: '#1d4ed8cc',
  },
  parameters: {
    docs: { description: { story: '`color` で背景色（半透明）を変更した例。' } },
  },
};
