# 移行ガイド（0.6.x → 1.0.0）

`@mgfujikura/vue-components` 1.0.0 では、API の一貫性・型安全性・CSS クラス名の統一を目的とした破壊的変更を行います。

## バージョニング方針

| 変更種別 | 例 | バージョン |
|---|---|---|
| 破壊的変更（prop 名・型・CSS クラス） | 本ガイドの内容 | **1.0.0** |
| 後方互換の追加 | 新 prop の追加、optional 化 | マイナー |

---

## 変更サマリー

| 対象 | 変更 | 破壊的 |
|---|---|---|
| Btn | `disabled` の型修正、`width`/`height` の型拡張 | 一部 |
| Overlay | `class`/`style` をフォールスルー属性に移行 | あり |
| Window | `windowClass`/`windowStyle` 廃止、`titleHeight` の型拡張 | あり |
| Dialog | `dialogClass`/`dialogStyle` → `windowClass`/`windowStyle` | あり |
| TileList | `gap` の型拡張、CSS クラス名変更 | あり |
| TextPlayer | CSS クラス名変更 | あり |
| useScrollTop / useScrollBottom | `rootRef` の型を `Ref` に統一 | 型のみ |
| usePointerDrag | 変更なし | — |

---

## Btn

### 変更なし（維持）

- `img`, `imgDisabled` — 命名は現状維持
- `shape`, `radius` — 現状維持

### 変更あり

| 0.6.x | 1.0.0 | 備考 |
|---|---|---|
| `disabled?: any` | `disabled?: boolean` | 型の厳格化 |
| `width?: number` | `width?: number \| string` | `number` は px として扱う |
| `height?: number` | `height?: number \| string` | 同上 |

```vue
<!-- 0.6.x -->
<Btn :width="160" :height="48" :disabled="isDisabled" />

<!-- 1.0.0（文字列指定も可能） -->
<Btn width="10rem" height="3em" :disabled="isDisabled" />
```

---

## Overlay

Overlay は単体利用時に短い prop 名を維持します。

### 変更なし（維持）

- `color`, `closeOnClick`

### 変更あり

| 0.6.x | 1.0.0 | 備考 |
|---|---|---|
| `:class="..."`（prop） | `class="..."`（属性） | フォールスルー属性に移行 |
| `:style="..."`（prop） | `:style="..."`（属性） | 同上 |

```vue
<!-- 0.6.x -->
<Overlay v-model="open" color="#00000099" :close-on-click="true" :class="overlayClass" :style="overlayStyle">
  ...
</Overlay>

<!-- 1.0.0（class / style は通常の HTML 属性として指定） -->
<Overlay v-model="open" color="#00000099" :close-on-click="true" :class="overlayClass" :style="overlayStyle">
  ...
</Overlay>
```

> **注意**: テンプレート上の書き方は同じですが、コンポーネント内部の prop 定義がなくなるため、型定義（`.d.ts`）上は `class` / `style` が props ではなく attributes として扱われます。

---

## Window

Window も単体利用時は短い名前（`class` / `style`）を使います。

### 変更あり

| 0.6.x | 1.0.0 | 備考 |
|---|---|---|
| `window-class` | `class` | フォールスルー属性に移行 |
| `window-style` | `style` | 同上 |
| `title-height?: number` | `title-height?: number \| string` | `number` は px として扱う |

```vue
<!-- 0.6.x -->
<Window
  :width="300"
  :height="180"
  window-class="custom-window"
  :window-style="{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }"
>
  ...
</Window>

<!-- 1.0.0 -->
<Window
  :width="300"
  :height="180"
  class="custom-window"
  :style="{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }"
>
  ...
</Window>
```

コンポーネント内部で計算されるスタイル（`width`, `nineSlice` 等）と、利用者が渡す `style` はマージされます。

---

## Dialog

Dialog は Overlay + Window の合成コンポーネントのため、レイヤーごとにプレフィックス付きの prop 名を使います。

### 変更なし（維持）

| prop | 渡し先 |
|---|---|
| `backgroundColor` | Overlay の `color` |
| `closeOnBackgroundClick` | Overlay の `closeOnClick` |
| `backgroundClass` | Overlay の `class` |
| `backgroundStyle` | Overlay の `style` |
| `width`, `height`, `img`, `titleHeight`, `nineSlice`, `radius` | Window（WindowProps 由来） |

### 変更あり

| 0.6.x | 1.0.0 | 備考 |
|---|---|---|
| `dialog-class` | `window-class` | 実体は Window 層への指定。名前を実体に合わせる |
| `dialog-style` | `window-style` | 同上 |

```vue
<!-- 0.6.x -->
<Dialog
  v-model="open"
  :width="400"
  background-color="#00000099"
  :close-on-background-click="true"
  dialog-class="my-dialog"
  :dialog-style="{ border: '2px solid red' }"
>
  ...
</Dialog>

<!-- 1.0.0 -->
<Dialog
  v-model="open"
  :width="400"
  background-color="#00000099"
  :close-on-background-click="true"
  window-class="my-dialog"
  :window-style="{ border: '2px solid red' }"
>
  ...
</Dialog>
```

### 命名方針の整理

| コンポーネント | 背景色 | 背景クリックで閉じる | 見た目の class/style |
|---|---|---|---|
| Overlay（単体） | `color` | `closeOnClick` | `class` / `style` |
| Window（単体） | — | — | `class` / `style` |
| Dialog（合成） | `backgroundColor` | `closeOnBackgroundClick` | `backgroundClass` / `backgroundStyle`（Overlay 層）、`windowClass` / `windowStyle`（Window 層） |

---

## TileList

### 変更あり

| 0.6.x | 1.0.0 | 備考 |
|---|---|---|
| `gap: string` | `gap: number \| string` | `number` は px として扱う |
| CSS `.TileList` | CSS `.FwComponentTileList` | プレフィックス統一 |

```vue
<!-- 0.6.x -->
<TileList :columns="3" gap="8px">...</TileList>

<!-- 1.0.0（数値指定も可能） -->
<TileList :columns="3" :gap="8">...</TileList>
```

CSS でスタイルを上書きしている場合:

```css
/* 0.6.x */
.TileList { ... }

/* 1.0.0 */
.FwComponentTileList { ... }
```

---

## TextPlayer

### 変更あり

| 0.6.x | 1.0.0 |
|---|---|
| CSS `.TextPlayer` | CSS `.FwComponentTextPlayer` |

prop・イベント・expose（`start` / `pause` / `reset` / `end`）は変更なし。

---

## Composable

### useScrollTop / useScrollBottom

| 0.6.x | 1.0.0 | 備考 |
|---|---|---|
| `rootRef: { value: HTMLElement \| null }` | `rootRef: Ref<HTMLElement \| null>` | 型の統一のみ。実行時の挙動は同じ |

```ts
// 0.6.x / 1.0.0 ともに ref を渡す使い方は同じ
const rootRef = ref<HTMLElement | null>(null);
useScrollTop(rootRef, onReachTop);
```

ファイル名（`useScrollTopBottom.ts`）と export 名（`useScrollTop` / `useScrollBottom`）は変更しません。

### usePointerDrag

変更なし。返り値（`pos`, `start`, `offset`, `end`）も現状維持。

---

## CSS クラス名一覧

| コンポーネント | 0.6.x | 1.0.0 |
|---|---|---|
| Btn | `FwComponentBtn` | `FwComponentBtn`（変更なし） |
| Overlay | `FwComponentOverlay` | `FwComponentOverlay`（変更なし） |
| Window | `FwComponentWindow` | `FwComponentWindow`（変更なし） |
| Window（タイトル） | `FwComponentWindow_title` | 変更なし |
| Window（本文） | `FwComponentWindow_content` | 変更なし |
| TileList | `TileList` | `FwComponentTileList` |
| TextPlayer | `TextPlayer` | `FwComponentTextPlayer` |

---

## 型の改善（横断）

1.0.0 では以下の型改善も行います（利用者の TypeScript コードに影響する場合があります）。

| 対象 | 0.6.x | 1.0.0 |
|---|---|---|
| `class` 系 prop | `any` | `HTMLAttributes['class']` 相当 |
| `style` 系 prop | `{ [key: string]: any }` | `StyleValue` 相当 |
| サイズ系 prop | コンポーネントごとに `number` のみ等 | `number \| string` に統一 |

---

## 移行チェックリスト

利用側で以下を確認してください。

- [ ] `Dialog` の `dialog-class` / `dialog-style` を `window-class` / `window-style` に変更
- [ ] `Window` の `window-class` / `window-style` を `class` / `style` に変更
- [ ] CSS セレクタ `.TileList` → `.FwComponentTileList`、`.TextPlayer` → `.FwComponentTextPlayer`
- [ ] `Btn` の `disabled` に `boolean` 以外を渡していないか確認
- [ ] TypeScript で `useScrollTop` / `useScrollBottom` の `rootRef` 型エラーが出る場合は `Ref` 型に修正

---

## 実装ステータス

1.0.0 として実装済みです。
