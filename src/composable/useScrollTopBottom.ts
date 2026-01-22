import { onMounted, onUnmounted } from 'vue';

interface ScrollEdgeOptions {
  ignoreInitial?: boolean;
}

export function useScrollTop(
  rootRef: { value: HTMLElement | null },
  callback: () => void,
  options: ScrollEdgeOptions = {},
) {
  useScrollEdge(
    rootRef,
    (sentinelEl) => {
      rootRef.value?.prepend(sentinelEl);
    },
    callback,
    options,
  );
}

export function useScrollBottom(
  rootRef: { value: HTMLElement | null },
  callback: () => void,
  options: ScrollEdgeOptions = {},
) {
  useScrollEdge(
    rootRef,
    (sentinelEl) => {
      rootRef.value?.appendChild(sentinelEl);
    },
    callback,
    options,
  );
}

export function useScrollEdge(
  rootRef: { value: HTMLElement | null },
  sentinelAppender: (sentinel: HTMLElement) => void,
  callback: () => void,
  options: ScrollEdgeOptions,
) {
  let observer: IntersectionObserver | undefined;
  let sentinel: HTMLElement | undefined;
  // 初回通知を無視するためのフラグ
  let hasInitialized = false;

  onMounted(() => {
    const root = rootRef.value;
    if (!root) return;

    sentinel = createSentinel();
    sentinelAppender(sentinel);

    observer = new IntersectionObserver(
      (entries) => {
        // 初回は無視
        if (!hasInitialized) {
          hasInitialized = true;
          if (options.ignoreInitial) return;
        }

        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { root },
    );

    observer.observe(sentinel);
  });

  onUnmounted(() => {
    observer?.disconnect();
    sentinel?.remove();
  });
}

function createSentinel(): HTMLElement {
  const sentinelEl = document.createElement('div');
  sentinelEl.style.height = '1px';
  sentinelEl.style.width = '100%';
  sentinelEl.style.flexShrink = '0';
  sentinelEl.style.flexGrow = '0';
  sentinelEl.style.pointerEvents = 'none';
  sentinelEl.style.visibility = 'hidden';
  return sentinelEl;
}
