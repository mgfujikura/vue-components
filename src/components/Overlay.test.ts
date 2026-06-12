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

  it('closeOnClick によるクリックで reason backdrop の close を emit する', async () => {
    const wrapper = mountOverlay({ closeOnClick: true });

    await wrapper.find('.FwComponentOverlay').trigger('click');

    expect(wrapper.emitted('close')).toEqual([['backdrop']]);
  });

  it('model が true から false へ変化したとき reason programmatic の close を emit する', async () => {
    const wrapper = mountOverlay();

    await wrapper.setProps({ modelValue: false });

    expect(wrapper.emitted('close')).toEqual([['programmatic']]);
  });

  it('閉じていないときは close を emit しない', async () => {
    const wrapper = mountOverlay();

    await wrapper.find('.FwComponentOverlay').trigger('click');

    expect(wrapper.emitted('close')).toBeUndefined();
  });

  it('model が false から true へ変化したとき open を emit する', async () => {
    const wrapper = mountOverlay({ modelValue: false });

    await wrapper.setProps({ modelValue: true });

    expect(wrapper.emitted('open')).toEqual([[]]);
  });

  it('背景クリック時に backdropClick を MouseEvent 付きで emit する', async () => {
    const wrapper = mountOverlay();

    await wrapper.find('.FwComponentOverlay').trigger('click');

    const emitted = wrapper.emitted('backdropClick');
    expect(emitted).toHaveLength(1);
    expect(emitted?.[0][0]).toBeInstanceOf(MouseEvent);
  });

  it('closeOnClick 未指定でも backdropClick は emit するが閉じない', async () => {
    const wrapper = mountOverlay();

    await wrapper.find('.FwComponentOverlay').trigger('click');

    expect(wrapper.emitted('backdropClick')).toHaveLength(1);
    expect(wrapper.emitted('close')).toBeUndefined();
  });

  it('color 未指定時は既定の半透明黒を適用する', () => {
    const wrapper = mountOverlay();

    const el = wrapper.find('.FwComponentOverlay').element as HTMLElement;
    expect(el.style.backgroundColor).toBe('rgba(0, 0, 0, 0.6)');
  });

  it('class / style 属性をルート要素に適用する', () => {
    const wrapper = mount(Overlay, {
      props: { modelValue: true },
      attrs: {
        class: 'custom-overlay',
        style: { padding: '16px' },
      },
      slots: { default: 'CONTENT' },
      global: { stubs: { teleport: true } },
    });

    const el = wrapper.find('.FwComponentOverlay');
    expect(el.classes()).toContain('custom-overlay');
    expect((el.element as HTMLElement).style.padding).toBe('16px');
  });

  it('color 指定時に背景色を適用する', () => {
    const wrapper = mountOverlay({ color: 'rgb(1, 2, 3)' });

    const el = wrapper.find('.FwComponentOverlay').element as HTMLElement;
    expect(el.style.backgroundColor).toBe('rgb(1, 2, 3)');
  });
});
