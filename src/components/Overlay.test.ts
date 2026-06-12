import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Overlay from './Overlay.vue';

function mountOverlay(props: Record<string, unknown> = {}) {
  return mount(Overlay, {
    props: { modelValue: true, ...props },
    slots: { default: 'CONTENT' },
    global: { stubs: { teleport: true } },
  });
}

describe('Overlay', () => {
  it('model が true のとき表示しスロットを描画する', () => {
    const wrapper = mountOverlay();

    expect(wrapper.find('.FwComponentOverlay').exists()).toBe(true);
    expect(wrapper.text()).toContain('CONTENT');
  });

  it('model が false のとき描画しない', () => {
    const wrapper = mountOverlay({ modelValue: false });

    expect(wrapper.find('.FwComponentOverlay').exists()).toBe(false);
  });

  it('closeOnClick が true のときクリックで false を emit する', async () => {
    const wrapper = mountOverlay({ closeOnClick: true });

    await wrapper.find('.FwComponentOverlay').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
  });

  it('closeOnClick 未指定ではクリックしても閉じない', async () => {
    const wrapper = mountOverlay();

    await wrapper.find('.FwComponentOverlay').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('color 未指定時は既定の半透明黒を適用する', () => {
    const wrapper = mountOverlay();

    const el = wrapper.find('.FwComponentOverlay').element as HTMLElement;
    expect(el.style.backgroundColor).toBe('rgba(0, 0, 0, 0.6)');
  });

  it('color 指定時に背景色を適用する', () => {
    const wrapper = mountOverlay({ color: 'rgb(1, 2, 3)' });

    const el = wrapper.find('.FwComponentOverlay').element as HTMLElement;
    expect(el.style.backgroundColor).toBe('rgb(1, 2, 3)');
  });
});
