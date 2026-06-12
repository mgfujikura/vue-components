import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Btn from './Btn.vue';

describe('Btn', () => {
  it('width / height が文字列のときそのまま適用する', () => {
    const wrapper = mount(Btn, {
      props: { width: '10rem', height: '3em' },
    });

    expect((wrapper.element as HTMLButtonElement).style.width).toBe('10rem');
    expect((wrapper.element as HTMLButtonElement).style.height).toBe('3em');
  });

  it('width / height を px 付き style に変換する', () => {
    const wrapper = mount(Btn, {
      props: { width: 120, height: 40 },
    });

    expect(wrapper.attributes('style')).toContain('width: 120px');
    expect(wrapper.attributes('style')).toContain('height: 40px');
  });

  it('nineSlice が数値のとき borderImage 系スタイルを設定する', () => {
    const wrapper = mount(Btn, {
      props: { img: 'btn.png', nineSlice: 10 },
    });

    const el = wrapper.element as HTMLButtonElement;
    expect(el.style.borderImage).toContain('btn.png');
    expect(el.style.borderImageWidth).toBe('10px');
    expect(el.style.borderImageSlice).toBe('10 fill');
  });

  it('nineSlice がオブジェクトのとき各 borderImage プロパティを設定する', () => {
    const wrapper = mount(Btn, {
      props: {
        img: 'btn.png',
        nineSlice: { repeat: 'round', slice: '30 fill', width: '20px' },
      },
    });

    const style = (wrapper.element as HTMLButtonElement).style;
    expect(style.borderImageRepeat).toBe('round');
    expect(style.borderImageSlice).toBe('30 fill');
    expect(style.borderImageWidth).toBe('20px');
  });

  it('disabled かつ imgDisabled のとき nineSlice 画像を切り替える', () => {
    const wrapper = mount(Btn, {
      props: {
        img: 'btn.png',
        imgDisabled: 'btn-disabled.png',
        disabled: true,
        nineSlice: 10,
      },
    });

    expect((wrapper.element as HTMLButtonElement).style.borderImage).toContain('btn-disabled.png');
  });

  it('nineSlice なしで img 指定時は background を設定する', () => {
    const wrapper = mount(Btn, {
      props: { img: 'btn.png' },
    });

    const background = (wrapper.element as HTMLButtonElement).style.background;
    expect(background).toContain('btn.png');
    expect(background).toContain('no-repeat');
  });

  it('nineSlice なしで disabled かつ imgDisabled のとき background を切り替える', () => {
    const wrapper = mount(Btn, {
      props: { img: 'btn.png', imgDisabled: 'btn-disabled.png', disabled: true },
    });

    expect((wrapper.element as HTMLButtonElement).style.background).toContain('btn-disabled.png');
  });

  it('shape が capsule のとき border-radius を 9999px にする', () => {
    const wrapper = mount(Btn, {
      props: { shape: 'capsule' },
    });

    expect(wrapper.attributes('style')).toContain('border-radius: 9999px');
  });

  it('radius が数値のとき px 付きで border-radius を設定する', () => {
    const wrapper = mount(Btn, {
      props: { radius: 8 },
    });

    expect((wrapper.element as HTMLButtonElement).style.borderRadius).toBe('8px');
  });

  it('radius が文字列のときそのまま border-radius を設定する', () => {
    const wrapper = mount(Btn, {
      props: { radius: '50%' },
    });

    expect((wrapper.element as HTMLButtonElement).style.borderRadius).toBe('50%');
  });

  it('スロット内容を表示する', () => {
    const wrapper = mount(Btn, {
      slots: { default: 'Click me' },
    });

    expect(wrapper.text()).toBe('Click me');
  });
});
