# vue-component

## インストール

```
npm install @mgfujikura/vue-components
```

※ GitHub Packages で公開しているので .npmrc ファイルが必要。
https://docs.github.com/ja/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package

.npmrc例

```
@mgfujikura:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=[GITHUB_TOKEN]
```

## コンポーネント

各コンポーネントの props や表示例は Storybook で確認できます。

```
pnpm storybook
```

起動後、ブラウザで http://localhost:6006 を開いてください。

提供コンポーネント:

- Btn（ボタン）
- Overlay（オーバーレイ）
- Dialog（ダイアログ）
- TileList（タイルリスト）
- TextPlayer（テキストプレーヤー）
- Window（ウィンドウ）

## コンポーザブル

各コンポーザブルの動作例も Storybook で確認できます。

提供コンポーザブル:

- useScrollTop, useScrollBottom（スクロール端の検出）
- usePointerDrag（ポインタによるドラッグ）
