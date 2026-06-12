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

  it('windowClass / windowStyle を Window に伝搬する', () => {
    const wrapper = mountDialog({
      windowClass: 'my-window',
      windowStyle: { border: '2px solid red' },
    });

    const root = wrapper.find('.FwComponentWindow');
    expect(root.classes()).toContain('my-window');
    expect((root.element as HTMLElement).style.border).toContain('2px solid red');
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

  it('背景クリックで閉じたとき reason backdrop の close を emit する', async () => {
    const wrapper = mountDialog({ closeOnBackgroundClick: true });

    await wrapper.find('.FwComponentOverlay').trigger('click');

    expect(wrapper.emitted('close')).toEqual([['backdrop']]);
  });

  it('model が true から false へ変化したとき reason programmatic の close を emit する', async () => {
    const wrapper = mountDialog();

    await wrapper.setProps({ modelValue: false });

    expect(wrapper.emitted('close')).toEqual([['programmatic']]);
  });

  it('model が false から true へ変化したとき open を emit する', async () => {
    const wrapper = mountDialog({ modelValue: false });

    await wrapper.setProps({ modelValue: true });

    expect(wrapper.emitted('open')).toEqual([[]]);
  });

  it('背景クリック時に backdropClick を MouseEvent 付きで emit する', async () => {
    const wrapper = mountDialog();

    await wrapper.find('.FwComponentOverlay').trigger('click');

    const emitted = wrapper.emitted('backdropClick');
    expect(emitted).toHaveLength(1);
    expect(emitted?.[0][0]).toBeInstanceOf(MouseEvent);
  });
});
