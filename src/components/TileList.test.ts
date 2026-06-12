import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TileList from './TileList.vue';

describe('TileList', () => {
  it('FwComponentTileList クラスを持つ要素にスロットを描画する', () => {
    const wrapper = mount(TileList, {
      props: { columns: 3, gap: '8px' },
      slots: { default: 'TILE' },
    });

    expect(wrapper.classes()).toContain('FwComponentTileList');
    expect(wrapper.text()).toBe('TILE');
  });

  it('grid レイアウトのルート要素を描画する', () => {
    const wrapper = mount(TileList, {
      props: { columns: 4, gap: 12 },
    });

    const root = wrapper.find('.FwComponentTileList');
    expect(root.exists()).toBe(true);
    expect(root.element.tagName).toBe('DIV');
  });
});
