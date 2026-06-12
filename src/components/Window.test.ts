import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Window from './Window.vue';

describe('Window', () => {
  it('width / height を px 付き style に変換する', () => {
    const wrapper = mount(Window, {
      props: { width: 300, height: 200 },
    });

    const root = wrapper.find('.FwComponentWindow');
    const style = root.attributes('style') ?? '';
    expect(style).toContain('width: 300px');
    expect(style).toContain('height: 200px');
  });

  it('img 指定時に background スタイルを設定する', () => {
    const wrapper = mount(Window, {
      props: { width: 300, img: 'window.png' },
    });

    const background = (wrapper.find('.FwComponentWindow').element as HTMLElement).style.background;
    expect(background).toContain('window.png');
    expect(background).toContain('no-repeat');
    expect(background).toContain('100%');
  });

  it('width / height / radius が文字列のときそのまま適用する', () => {
    const wrapper = mount(Window, {
      props: { width: '80%', height: '50vh', radius: '1rem' },
    });

    const style = (wrapper.find('.FwComponentWindow').element as HTMLElement).style;
    expect(style.width).toBe('80%');
    expect(style.height).toBe('50vh');
    expect(style.borderRadius).toBe('1rem');
  });

  it('radius が数値のとき px 付きで適用する', () => {
    const wrapper = mount(Window, {
      props: { width: 300, radius: 12 },
    });

    expect((wrapper.find('.FwComponentWindow').element as HTMLElement).style.borderRadius).toBe('12px');
  });

  it('nineSlice が数値のとき borderImage 系スタイルを設定する', () => {
    const wrapper = mount(Window, {
      props: { width: 300, img: 'window.png', nineSlice: 16 },
    });

    const style = (wrapper.find('.FwComponentWindow').element as HTMLElement).style;
    expect(style.borderImageWidth).toBe('16px');
    expect(style.borderImageSlice).toBe('16 fill');
  });

  it('nineSlice がオブジェクトのとき各 borderImage プロパティを設定する', () => {
    const wrapper = mount(Window, {
      props: {
        width: 300,
        img: 'window.png',
        nineSlice: { repeat: 'round', slice: '30 fill', width: '20px' },
      },
    });

    const style = (wrapper.find('.FwComponentWindow').element as HTMLElement).style;
    expect(style.borderImageRepeat).toBe('round');
    expect(style.borderImageSlice).toBe('30 fill');
    expect(style.borderImageWidth).toBe('20px');
  });

  it('title スロットと default スロットを表示する', () => {
    const wrapper = mount(Window, {
      props: { width: 300 },
      slots: {
        title: 'Window Title',
        default: 'Window Body',
      },
    });

    expect(wrapper.find('.FwComponentWindow_title').text()).toBe('Window Title');
    expect(wrapper.find('.FwComponentWindow_content').text()).toBe('Window Body');
  });

  it('titleHeight 指定時にコンテンツ高さを calc で調整する', () => {
    const wrapper = mount(Window, {
      props: { width: 300, height: 200, titleHeight: 40 },
    });

    const titleStyle = wrapper.find('.FwComponentWindow_title').attributes('style') ?? '';
    const contentStyle = wrapper.find('.FwComponentWindow_content').attributes('style') ?? '';

    expect(titleStyle).toContain('height: 40px');
    expect(contentStyle).toContain('height: calc(100% - 40px)');
  });

  it('ルート要素のクリックは親へ伝播しない', async () => {
    const onParentClick = vi.fn();
    const Parent = defineComponent({
      components: { Window },
      setup: () => ({ onParentClick }),
      template: '<div @click="onParentClick"><Window :width="300" /></div>',
    });

    const wrapper = mount(Parent);
    await wrapper.find('.FwComponentWindow').trigger('click');

    expect(onParentClick).not.toHaveBeenCalled();
  });
});
