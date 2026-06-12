import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TileList from './TileList.vue';

describe('TileList', () => {
  it('TileList クラスを持つ要素にスロットを描画する', () => {
    const wrapper = mount(TileList, {
      props: { columns: 3, gap: '8px' },
      slots: { default: 'TILE' },
    });

    expect(wrapper.classes()).toContain('TileList');
    expect(wrapper.text()).toBe('TILE');
  });

  it('grid レイアウトのルート要素を描画する', () => {
    const wrapper = mount(TileList, {
      props: { columns: 4, gap: '12px' },
    });

    const root = wrapper.find('.TileList');
    expect(root.exists()).toBe(true);
    expect(root.element.tagName).toBe('DIV');
  });
});
