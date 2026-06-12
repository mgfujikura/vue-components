import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import { useScrollBottom, useScrollTop } from './useScrollTopBottom';

// useScrollBottom：下端到達でアイテムを追加する無限スクロールのデモ。
const ScrollBottomDemo = defineComponent({
  setup() {
    const rootRef = ref<HTMLElement | null>(null);
    const items = ref(Array.from({ length: 20 }, (_, i) => i + 1));

    useScrollBottom(rootRef, () => {
      const base = items.value.length;
      items.value.push(...Array.from({ length: 10 }, (_, i) => base + i + 1));
    });

    return { rootRef, items };
  },
  template: `
    <div>
      <p style="margin:0 0 8px; font-size:12px; color:#555;">下端までスクロールすると自動で 10 件追加されます（現在 {{ items.length }} 件）</p>
      <div ref="rootRef" style="height:300px; overflow-y:auto; border:1px solid #cbd5e1; border-radius:4px;">
        <div v-for="n in items" :key="n" style="padding:12px 16px; border-bottom:1px solid #eee;">アイテム {{ n }}</div>
      </div>
    </div>
  `,
});

// useScrollTop：上端到達でアイテムを先頭に追加するデモ。
const ScrollTopDemo = defineComponent({
  setup() {
    const rootRef = ref<HTMLElement | null>(null);
    const items = ref(Array.from({ length: 20 }, (_, i) => i + 1));

    useScrollTop(
      rootRef,
      () => {
        const first = items.value[0];
        const prepended = Array.from({ length: 10 }, (_, i) => first - 10 + i);
        items.value.unshift(...prepended);
      },
      { ignoreInitial: true },
    );

    return { rootRef, items };
  },
  template: `
    <div>
      <p style="margin:0 0 8px; font-size:12px; color:#555;">上端までスクロールすると先頭に 10 件追加されます（現在 {{ items.length }} 件）</p>
      <div ref="rootRef" style="height:300px; overflow-y:auto; border:1px solid #cbd5e1; border-radius:4px;">
        <div v-for="n in items" :key="n" style="padding:12px 16px; border-bottom:1px solid #eee;">アイテム {{ n }}</div>
      </div>
    </div>
  `,
});

/**
 * スクロールコンテナの端（上端・下端）への到達を検出するコンポーザブル。
 * 内部で sentinel 要素と IntersectionObserver を管理し、端に到達すると callback を呼ぶ。
 * 無限スクロールなどに利用できる。
 */
const meta = {
  title: 'Composables/useScrollTopBottom',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScrollBottom: Story = {
  render: () => ({
    components: { ScrollBottomDemo },
    template: '<ScrollBottomDemo />',
  }),
  parameters: {
    docs: {
      description: {
        story: '`useScrollBottom`：下端への到達を検出し、リスト末尾にアイテムを追加する無限スクロール。',
      },
    },
  },
};

export const ScrollTop: Story = {
  render: () => ({
    components: { ScrollTopDemo },
    template: '<ScrollTopDemo />',
  }),
  parameters: {
    docs: {
      description: {
        story:
          '`useScrollTop`：上端への到達を検出し、リスト先頭にアイテムを追加する。`ignoreInitial` で初回通知を無視している。',
      },
    },
  },
};
