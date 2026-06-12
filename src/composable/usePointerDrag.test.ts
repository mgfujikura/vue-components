import { defineComponent, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { usePointerDrag } from './usePointerDrag';

function mountDragHost() {
  const Host = defineComponent({
    setup() {
      const parentRef = ref<HTMLElement | null>(null);
      const targetRef = ref<HTMLElement | null>(null);
      const drag = usePointerDrag(targetRef, parentRef);
      return { parentRef, targetRef, drag };
    },
    template: `
      <div ref="parentRef" style="width: 200px; height: 200px; position: relative">
        <div ref="targetRef" style="width: 50px; height: 50px"></div>
      </div>
    `,
  });

  const wrapper = mount(Host);
  const parent = wrapper.element as HTMLElement;
  const target = parent.firstElementChild as HTMLElement;

  vi.spyOn(parent, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    width: 200,
    height: 200,
    right: 200,
    bottom: 200,
    toJSON: () => ({}),
  });

  vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
    x: 10,
    y: 10,
    left: 10,
    top: 10,
    width: 50,
    height: 50,
    right: 60,
    bottom: 60,
    toJSON: () => ({}),
  });

  target.setPointerCapture = vi.fn();
  target.releasePointerCapture = vi.fn();

  const drag = (wrapper.vm as { drag: ReturnType<typeof usePointerDrag> }).drag;
  return { wrapper, target, drag };
}

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

function mountUnboundHost() {
  const Host = defineComponent({
    setup() {
      const parentRef = ref<HTMLElement | null>(null);
      const targetRef = ref<HTMLElement | null>(null);
      const drag = usePointerDrag(targetRef, parentRef);
      return { drag };
    },
    template: '<div></div>',
  });
  return mount(Host);
}

function mountTargetOnlyHost() {
  const Host = defineComponent({
    setup() {
      const parentRef = ref<HTMLElement | null>(null);
      const targetRef = ref<HTMLElement | null>(null);
      const drag = usePointerDrag(targetRef, parentRef);
      return { targetRef, drag };
    },
    template: '<div ref="targetRef" style="width: 50px; height: 50px"></div>',
  });

  const wrapper = mount(Host);
  const target = wrapper.element as HTMLElement;
  target.setPointerCapture = vi.fn();
  target.releasePointerCapture = vi.fn();
  const drag = (wrapper.vm as { drag: ReturnType<typeof usePointerDrag> }).drag;
  return { wrapper, target, drag };
}

describe('usePointerDrag', () => {
  it('targetRef が null のままマウント・アンマウントしても例外を投げない', () => {
    expect(() => {
      const wrapper = mountUnboundHost();
      wrapper.unmount();
    }).not.toThrow();
  });

  it('parentRef が null のとき pointermove で pos を更新しない', () => {
    const { target, drag } = mountTargetOnlyHost();

    target.dispatchEvent(
      new PointerEvent('pointerdown', { clientX: 30, clientY: 40, pointerId: 1, bubbles: true }),
    );
    target.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 80, clientY: 90, pointerId: 1, bubbles: true }),
    );

    expect(drag.isDragging.value).toBe(true);
    expect(drag.pos.value).toEqual({ x: 0, y: 0 });
  });

  it('pointerdown 前の pointermove は無視される', () => {
    const { target, drag } = mountTargetOnlyHost();

    target.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 80, clientY: 90, pointerId: 1, bubbles: true }),
    );

    expect(drag.isDragging.value).toBe(false);
    expect(drag.pos.value).toEqual({ x: 0, y: 0 });
  });

  it('pointerdown でドラッグ開始し start / offset を記録する', async () => {
    const { target, drag } = mountDragHost();

    target.dispatchEvent(
      new PointerEvent('pointerdown', { clientX: 30, clientY: 40, pointerId: 1, bubbles: true }),
    );

    expect(drag.isDragging.value).toBe(true);
    expect(drag.start.value).toEqual({ x: 30, y: 40 });
    expect(drag.offset.value).toEqual({ x: 20, y: 30 });
    expect(target.setPointerCapture).toHaveBeenCalledWith(1);
  });

  it('pointermove で pos を更新する', () => {
    const { target, drag } = mountDragHost();

    target.dispatchEvent(
      new PointerEvent('pointerdown', { clientX: 30, clientY: 40, pointerId: 1, bubbles: true }),
    );
    target.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 80, clientY: 90, pointerId: 1, bubbles: true }),
    );

    expect(drag.pos.value).toEqual({ x: 80, y: 90 });
  });

  it('pointercancel でもドラッグを終了する', () => {
    const { target, drag } = mountDragHost();

    target.dispatchEvent(
      new PointerEvent('pointerdown', { clientX: 30, clientY: 40, pointerId: 1, bubbles: true }),
    );
    target.dispatchEvent(
      new PointerEvent('pointercancel', { clientX: 30, clientY: 40, pointerId: 1, bubbles: true }),
    );

    expect(drag.isDragging.value).toBe(false);
    expect(target.releasePointerCapture).toHaveBeenCalledWith(1);
  });

  it('アンマウント時にイベントリスナーを解除する', () => {
    const removeSpy = vi.spyOn(HTMLElement.prototype, 'removeEventListener');
    const { wrapper } = mountDragHost();

    wrapper.unmount();

    expect(removeSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('pointerup', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('pointercancel', expect.any(Function));
  });

  it('pointerup でドラッグ終了し end を記録する', () => {
    const { target, drag } = mountDragHost();

    target.dispatchEvent(
      new PointerEvent('pointerdown', { clientX: 30, clientY: 40, pointerId: 1, bubbles: true }),
    );
    target.dispatchEvent(
      new PointerEvent('pointermove', { clientX: 80, clientY: 90, pointerId: 1, bubbles: true }),
    );
    target.dispatchEvent(
      new PointerEvent('pointerup', { clientX: 80, clientY: 90, pointerId: 1, bubbles: true }),
    );

    expect(drag.isDragging.value).toBe(false);
    expect(drag.end.value).toEqual({ x: 80, y: 90 });
    expect(target.releasePointerCapture).toHaveBeenCalledWith(1);
  });
});
