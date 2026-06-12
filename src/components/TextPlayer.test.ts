import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import TextPlayer from './TextPlayer.vue';

interface TextPlayerExposed {
  start: () => void;
  pause: () => void;
  reset: () => void;
  end: () => void;
}

function mountPlayer(text = 'abc', typeInterval?: number) {
  const wrapper = mount(TextPlayer, {
    props: { text, maxLines: 3, ...(typeInterval ? { typeInterval } : {}) },
  });
  const api = wrapper.vm as unknown as TextPlayerExposed;
  return { wrapper, api };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('TextPlayer', () => {
  it('start() で typeInterval ごとに 1 文字ずつ表示する', async () => {
    const { wrapper, api } = mountPlayer('abc', 50);

    api.start();
    expect(wrapper.text()).toBe('');

    await vi.advanceTimersByTimeAsync(50);
    expect(wrapper.text()).toBe('a');

    await vi.advanceTimersByTimeAsync(50);
    expect(wrapper.text()).toBe('ab');

    await vi.advanceTimersByTimeAsync(50);
    expect(wrapper.text()).toBe('abc');
  });

  it('全文表示後に end イベントを発火する', async () => {
    const { wrapper, api } = mountPlayer('ab', 50);

    api.start();
    await vi.advanceTimersByTimeAsync(50 * 3);

    expect(wrapper.emitted('end')).toHaveLength(1);
  });

  it('typeInterval 未指定時は既定の 50ms で進む', async () => {
    const { wrapper, api } = mountPlayer('xy');

    api.start();
    await vi.advanceTimersByTimeAsync(49);
    expect(wrapper.text()).toBe('');

    await vi.advanceTimersByTimeAsync(1);
    expect(wrapper.text()).toBe('x');
  });

  it('pause() で進行が止まる', async () => {
    const { wrapper, api } = mountPlayer('abc', 50);

    api.start();
    await vi.advanceTimersByTimeAsync(50);
    expect(wrapper.text()).toBe('a');

    api.pause();
    await vi.advanceTimersByTimeAsync(200);
    expect(wrapper.text()).toBe('a');
  });

  it('reset() で表示を初期化する', async () => {
    const { wrapper, api } = mountPlayer('abc', 50);

    api.start();
    await vi.advanceTimersByTimeAsync(100);
    expect(wrapper.text()).toBe('ab');

    api.reset();
    await flushPromises();
    expect(wrapper.text()).toBe('');
  });

  it('end() で全文を即時表示し end を発火する', async () => {
    const { wrapper, api } = mountPlayer('abc', 50);

    api.end();
    await flushPromises();

    expect(wrapper.text()).toBe('abc');
    expect(wrapper.emitted('end')).toHaveLength(1);
  });

  it('クリックで全文表示し end を発火する', async () => {
    const { wrapper } = mountPlayer('abc', 50);

    await wrapper.trigger('click');
    await flushPromises();

    expect(wrapper.text()).toBe('abc');
    expect(wrapper.emitted('end')).toHaveLength(1);
  });

  it('全文表示済みの状態で end() を呼ぶと end を再発火する', async () => {
    const { wrapper, api } = mountPlayer('ab', 50);

    api.start();
    await vi.advanceTimersByTimeAsync(50 * 3);
    api.end();
    await flushPromises();

    expect(wrapper.emitted('end')).toHaveLength(2);
  });

  it('アンマウント時にタイマーをクリアする', async () => {
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');
    const { wrapper, api } = mountPlayer('abc', 50);

    api.start();
    await vi.advanceTimersByTimeAsync(50);
    wrapper.unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});
