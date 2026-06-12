import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Dialog from './Dialog.vue';

function mountDialog(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  return mount(Dialog, {
    props: { width: 400, modelValue: true, ...props },
    slots: { default: 'BODY', ...slots },
    global: { stubs: { teleport: true } },
  });
}

describe('Dialog', () => {
  it('表示時に Window と本文を描画する', () => {
    const wrapper = mountDialog();

    expect(wrapper.find('.FwComponentWindow').exists()).toBe(true);
    expect(wrapper.text()).toContain('BODY');
  });

  it('title スロットを Window のタイトルへ渡す', () => {
    const wrapper = mountDialog({}, { title: 'TITLE' });

    expect(wrapper.find('.FwComponentWindow_title').text()).toContain('TITLE');
  });

  it('width を Window に伝搬する', () => {
    const wrapper = mountDialog({ width: 320 });

    expect(wrapper.find('.FwComponentWindow').attributes('style')).toContain('width: 320px');
  });

  it('backgroundStyle を props からコピーし中央寄せを適用する', () => {
    const backgroundStyle = { padding: '8px' };
    const wrapper = mountDialog({ backgroundStyle });

    const overlay = wrapper.find('.FwComponentOverlay').element as HTMLElement;
    expect(overlay.style.padding).toBe('8px');
    expect(overlay.style.display).toBe('flex');
    expect(overlay.style.justifyContent).toBe('center');
    expect(overlay.style.alignItems).toBe('center');
    expect(backgroundStyle).toEqual({ padding: '8px' });
  });

  it('closeOnBackgroundClick で背景クリック時に閉じる', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountDialog({
      closeOnBackgroundClick: true,
      'onUpdate:modelValue': onUpdate,
    });

    await wrapper.find('.FwComponentOverlay').trigger('click');

    expect(onUpdate).toHaveBeenCalledWith(false);
  });
});
