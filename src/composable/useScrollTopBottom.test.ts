import { defineComponent, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useScrollBottom, useScrollTop } from './useScrollTopBottom';

let observerCallback: IntersectionObserverCallback;
const disconnectSpy = vi.fn();

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];
  observe = vi.fn();
  disconnect = disconnectSpy;
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);

  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
}

function triggerIntersection(isIntersecting: boolean) {
  observerCallback(
    [{ isIntersecting } as IntersectionObserverEntry],
    {} as IntersectionObserver,
  );
}

function mountScrollHost(useHook: typeof useScrollTop | typeof useScrollBottom, options?: { ignoreInitial?: boolean }) {
  const callback = vi.fn();

  const Host = defineComponent({
    setup() {
      const rootRef = ref<HTMLElement | null>(null);
      useHook(rootRef, callback, options);
      return { rootRef };
    },
    template: '<div ref="rootRef" style="overflow: auto; height: 100px"></div>',
  });

  const wrapper = mount(Host);
  return { wrapper, callback, root: wrapper.element as HTMLElement };
}

beforeEach(() => {
  disconnectSpy.mockClear();
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useScrollTop', () => {
  it('sentinel を root の先頭に追加する', () => {
    const { root } = mountScrollHost(useScrollTop);
    const sentinel = root.firstElementChild;

    expect(sentinel).toBeTruthy();
    expect(sentinel?.tagName).toBe('DIV');
  });

  it('ignoreInitial: true のとき初回 intersection では callback を呼ばない', () => {
    const { callback } = mountScrollHost(useScrollTop, { ignoreInitial: true });

    triggerIntersection(true);

    expect(callback).not.toHaveBeenCalled();
  });

  it('ignoreInitial: false のとき初回 intersection で callback を呼ぶ', () => {
    const { callback } = mountScrollHost(useScrollTop, { ignoreInitial: false });

    triggerIntersection(true);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('isIntersecting が false のとき callback を呼ばない', () => {
    const { callback } = mountScrollHost(useScrollTop, { ignoreInitial: false });

    triggerIntersection(false);

    expect(callback).not.toHaveBeenCalled();
  });

  it('2 回目の intersection で callback を呼ぶ', () => {
    const { callback } = mountScrollHost(useScrollTop, { ignoreInitial: true });

    triggerIntersection(true);
    triggerIntersection(true);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('アンマウント時に observer を disconnect し sentinel を除去する', () => {
    const { wrapper, root } = mountScrollHost(useScrollTop);
    const sentinel = root.firstElementChild;

    wrapper.unmount();

    expect(disconnectSpy).toHaveBeenCalled();
    expect(sentinel?.isConnected).toBe(false);
  });
});

describe('useScrollBottom', () => {
  it('sentinel を root の末尾に追加する', () => {
    const { root } = mountScrollHost(useScrollBottom);
    const sentinel = root.lastElementChild;

    expect(sentinel).toBeTruthy();
    expect(sentinel?.tagName).toBe('DIV');
  });
});

describe('useScrollEdge エッジケース', () => {
  it('rootRef が null のとき observer を生成しない', () => {
    const Host = defineComponent({
      setup() {
        const rootRef = ref<HTMLElement | null>(null);
        useScrollTop(rootRef, vi.fn());
        return {};
      },
      template: '<div></div>',
    });

    const wrapper = mount(Host);

    expect(disconnectSpy).not.toHaveBeenCalled();
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
