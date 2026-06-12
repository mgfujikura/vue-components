import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, defineComponent, ref, watch } from 'vue';
import { usePointerDrag } from './usePointerDrag';

// usePointerDrag：親要素内でターゲットをドラッグし、座標を取得するデモ。
const DragDemo = defineComponent({
  setup() {
    const parentRef = ref<HTMLElement | null>(null);
    const targetRef = ref<HTMLElement | null>(null);
    const { isDragging, pos, start, offset, end } = usePointerDrag(targetRef, parentRef);

    // 初回ドラッグ前は初期位置を保持する
    const moved = ref(false);
    watch(isDragging, (dragging) => {
      if (dragging) moved.value = true;
    });

    const targetStyle = computed(() => {
      if (!moved.value) return { left: '20px', top: '20px' };
      return {
        left: `${pos.value.x - offset.value.x}px`,
        top: `${pos.value.y - offset.value.y}px`,
      };
    });

    const round = (p: { x: number; y: number }) => `(${Math.round(p.x)}, ${Math.round(p.y)})`;

    return { parentRef, targetRef, targetStyle, isDragging, pos, start, offset, end, round };
  },
  template: `
    <div style="display:flex; gap:24px; flex-wrap:wrap;">
      <div
        ref="parentRef"
        style="position:relative; width:360px; height:260px; border:1px solid #cbd5e1; border-radius:4px; background:#f8fafc; touch-action:none;"
      >
        <div
          ref="targetRef"
          :style="targetStyle"
          style="position:absolute; width:72px; height:72px; border-radius:8px; background:#3b82f6; color:#fff; display:flex; align-items:center; justify-content:center; cursor:grab; user-select:none;"
        >ドラッグ</div>
      </div>
      <dl style="margin:0; font-size:13px; color:#334155; line-height:1.8;">
        <div><dt style="display:inline; font-weight:bold;">isDragging:</dt> <dd style="display:inline; margin:0;">{{ isDragging }}</dd></div>
        <div><dt style="display:inline; font-weight:bold;">pos:</dt> <dd style="display:inline; margin:0;">{{ round(pos) }}</dd></div>
        <div><dt style="display:inline; font-weight:bold;">start:</dt> <dd style="display:inline; margin:0;">{{ round(start) }}</dd></div>
        <div><dt style="display:inline; font-weight:bold;">offset:</dt> <dd style="display:inline; margin:0;">{{ round(offset) }}</dd></div>
        <div><dt style="display:inline; font-weight:bold;">end:</dt> <dd style="display:inline; margin:0;">{{ round(end) }}</dd></div>
      </dl>
    </div>
  `,
});

/**
 * 親要素を基準にターゲット要素をドラッグするためのコンポーザブル。
 * ポインタイベントの登録・解除を内部で管理し、ドラッグ状態と各種座標
 * （現在位置・開始位置・掴んだ相対位置・終了位置）を Ref で返す。
 */
const meta = {
  title: 'Composables/usePointerDrag',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { DragDemo },
    template: '<DragDemo />',
  }),
  parameters: {
    docs: {
      description: {
        story: '青いボックスをドラッグすると、親要素を基準とした各種座標がリアルタイムに更新される。',
      },
    },
  },
};
