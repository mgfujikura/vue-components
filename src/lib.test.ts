import { describe, expect, it } from 'vitest';
import * as lib from './lib';

describe('lib エクスポート面', () => {
  it('全コンポーネントを公開する', () => {
    expect(lib.Btn).toBeTruthy();
    expect(lib.Overlay).toBeTruthy();
    expect(lib.Dialog).toBeTruthy();
    expect(lib.TileList).toBeTruthy();
    expect(lib.TextPlayer).toBeTruthy();
    expect(lib.Window).toBeTruthy();
  });

  it('全 composable を公開する', () => {
    expect(typeof lib.useScrollTop).toBe('function');
    expect(typeof lib.useScrollBottom).toBe('function');
    expect(typeof lib.usePointerDrag).toBe('function');
  });
});
