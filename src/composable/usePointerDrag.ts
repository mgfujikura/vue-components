import { onMounted, onBeforeUnmount, ref, Ref } from 'vue';

type UsePointerDrag = (
  targetRef: Ref<HTMLElement | null>,
  parentRef: Ref<HTMLElement | null>,
) => {
  isDragging: Ref<boolean>;
  pos: Ref<{ x: number; y: number }>;
  start: Ref<{ x: number; y: number }>;
  offset: Ref<{ x: number; y: number }>;
  end: Ref<{ x: number; y: number }>;
};

export const usePointerDrag: UsePointerDrag = (targetRef, parentRef) => {
  const isDragging = ref(false);
  const pos = ref({ x: 0, y: 0 });
  const start = ref({ x: 0, y: 0 });
  const offset = ref({ x: 0, y: 0 });
  const end = ref({ x: 0, y: 0 });

  const updatePointer = (e: PointerEvent) => {
    const parent = parentRef.value;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();

    pos.value = {
      x: e.clientX - parentRect.left,
      y: e.clientY - parentRect.top,
    };
  };

  const onPointerDown = (e: PointerEvent) => {
    const el = targetRef.value;
    if (!el) return;

    el.setPointerCapture(e.pointerId);

    isDragging.value = true;
    updatePointer(e);
    start.value = { ...pos.value };
    offset.value = {
      x: e.clientX - el.getBoundingClientRect().left,
      y: e.clientY - el.getBoundingClientRect().top,
    };
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging.value) return;
    updatePointer(e);
  };

  const onPointerUp = (e: PointerEvent) => {
    const el = targetRef.value;
    if (el) {
      el.releasePointerCapture(e.pointerId);
    }
    isDragging.value = false;
    end.value = { ...pos.value };
  };

  onMounted(() => {
    const el = targetRef.value;
    if (!el) return;

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
  });

  onBeforeUnmount(() => {
    const el = targetRef.value;
    if (!el) return;

    el.removeEventListener('pointerdown', onPointerDown);
    el.removeEventListener('pointermove', onPointerMove);
    el.removeEventListener('pointerup', onPointerUp);
    el.removeEventListener('pointercancel', onPointerUp);
  });

  return { isDragging, pos, start, offset, end };
};
