import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Btn from './Btn.vue';

// デモ用のボタン画像（外部アセットに依存しないよう SVG の data URI を使用）
const btnImage = (fill: string) =>
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="48"><rect width="160" height="48" rx="8" fill="${fill}"/></svg>`,
  );

const imgNormal = btnImage('#3b82f6');
const imgDisabled = btnImage('#9ca3af');

// nineSlice 用のボーダー画像（MDN の border-image 例に倣ったダイヤモンド模様）。
// 90×90 を 3×3（各 30px）に分割し、各セルにダイヤを配置することで、
// 9スライス時の角の固定・辺の繰り返し（repeat/round/space）の違いが見やすくなる。
// グラデーション参照（url(#id)）は border-image では描画に失敗するため単色で塗る。
const diamondImage = (() => {
  const centers = [15, 45, 75];
  const diamond = (cx: number, cy: number) => {
    const isCorner = (cx === 15 || cx === 75) && (cy === 15 || cy === 75);
    const fill = isCorner ? '#ef4444' : '#f59e0b';
    return `<polygon points="${cx},${cy - 13} ${cx + 13},${cy} ${cx},${cy + 13} ${cx - 13},${cy}" fill="${fill}"/>`;
  };
  const shapes = centers.flatMap((cy) => centers.map((cx) => diamond(cx, cy))).join('');
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90">` +
    `<rect width="90" height="90" fill="#1f2937"/>` +
    shapes +
    `</svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
})();

// 9スライスの効果を比較するためのレンダラ。
// 「元画像」「9スライスなしで拡大」「9スライス適用」を横並びで表示する。
const nineSliceRender = (args: Record<string, unknown>) => ({
  components: { Btn },
  setup() {
    return { args };
  },
  template: `
    <div style="display:flex; align-items:flex-end; gap:32px; flex-wrap:wrap;">
      <figure style="margin:0; text-align:center;">
        <img :src="args.img" width="90" height="90" style="display:block;" />
        <figcaption style="margin-top:8px; font-size:12px; color:#555;">元画像 (90×90)</figcaption>
      </figure>
      <figure style="margin:0; text-align:center;">
        <img :src="args.img" :width="args.width" :height="args.height" style="display:block;" />
        <figcaption style="margin-top:8px; font-size:12px; color:#555;">9スライスなしで拡大</figcaption>
      </figure>
      <figure style="margin:0; text-align:center;">
        <Btn v-bind="args"><span style="color:#fff">ボタン</span></Btn>
        <figcaption style="margin-top:8px; font-size:12px; color:#555;">9スライス適用</figcaption>
      </figure>
    </div>
  `,
});

// border-image-repeat の各モード（stretch / repeat / round / space）を並べて比較するレンダラ。
const repeatModes = ['stretch', 'repeat', 'round', 'space'] as const;
const repeatModesRender = (args: Record<string, unknown>) => ({
  components: { Btn },
  setup() {
    return { args, repeatModes };
  },
  template: `
    <div style="display:flex; flex-direction:column; gap:20px;">
      <figure
        v-for="mode in repeatModes"
        :key="mode"
        style="margin:0; display:flex; align-items:center; gap:16px;"
      >
        <code style="width:72px; font-size:12px; color:#555;">{{ mode }}</code>
        <Btn
          :img="args.img"
          :width="240"
          :height="90"
          :nineSlice="{ slice: '30 fill', width: '30px', repeat: mode }"
        />
      </figure>
    </div>
  `,
});

/**
 * 画像で見た目を作るボタンコンポーネント。
 * ラベルは slot で渡し、`img` / `nineSlice` で背景や枠を表現します。
 * 無効状態の見た目は `img` と `imgDisabled` の両方を指定したときだけ切り替わります。
 */
const meta = {
  title: 'Components/Btn',
  component: Btn,
  tags: ['autodocs'],
  argTypes: {
    shape: { control: 'inline-radio', options: ['square', 'capsule'] },
    width: { control: 'number' },
    height: { control: 'number' },
    radius: { control: 'text' },
    disabled: { control: 'boolean' },
    img: { control: 'text' },
    imgDisabled: { control: 'text' },
  },
  args: {
    width: 160,
    height: 48,
  },
  render: (args) => ({
    components: { Btn },
    setup() {
      return { args };
    },
    template: '<Btn v-bind="args"><span style="color:#fff">ボタン</span></Btn>',
  }),
} satisfies Meta<typeof Btn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    img: imgNormal,
  },
  parameters: {
    docs: { description: { story: '`img` で背景画像を指定した基本的なボタン。' } },
  },
};

export const Capsule: Story = {
  args: {
    img: imgNormal,
    shape: 'capsule',
  },
  parameters: {
    docs: { description: { story: "`shape: 'capsule'` で両端を丸めたカプセル形。" } },
  },
};

export const Disabled: Story = {
  args: {
    img: imgNormal,
    imgDisabled,
    disabled: true,
  },
  parameters: {
    docs: { description: { story: '`disabled` 時に `imgDisabled` の画像へ切り替わる。' } },
  },
};

export const Radius: Story = {
  args: {
    img: imgNormal,
    radius: '50%',
  },
  parameters: {
    docs: {
      description: { story: '`radius` に任意の値（数値=px / 文字列=そのまま）を指定して角を丸める。' },
    },
  },
};

export const NineSlice: Story = {
  args: {
    img: diamondImage,
    nineSlice: 30,
    width: 240,
    height: 90,
  },
  render: nineSliceRender,
  parameters: {
    docs: {
      description: {
        story:
          '`nineSlice` に数値を渡し、ダイヤ模様のボーダー画像を9スライスで伸縮させる。元画像（左）と単純拡大（中央）を比べると、9スライス（右）では四隅のダイヤが潰れず保たれるのが分かる。',
      },
    },
  },
};

export const NineSliceRepeat: Story = {
  args: {
    img: diamondImage,
  },
  render: repeatModesRender,
  parameters: {
    docs: {
      description: {
        story:
          '`nineSlice` をオブジェクトで指定し、`repeat`（border-image-repeat）の違いを比較する。stretch は引き伸ばし、repeat はタイル状に反復、round は端数が出ないよう伸縮しつつ反復、space は間隔を空けて反復する。',
      },
    },
  },
};
