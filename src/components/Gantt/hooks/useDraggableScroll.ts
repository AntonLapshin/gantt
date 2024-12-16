import { RefObject, useEffect } from "react";

function getEventCoordinates(
  e: MouseEvent | TouchEvent,
  element: HTMLElement
): { x: number; y: number } {
  const isTouch = e.type.startsWith("touch");
  const event = isTouch ? (e as TouchEvent).touches[0] : (e as MouseEvent);
  return {
    x: event.pageX - element.offsetLeft,
    y: event.pageY - element.offsetTop,
  };
}

function updateElementStyles(element: HTMLElement, isDragging: boolean) {
  element.style.cursor = isDragging ? "grabbing" : "grab";
  element.style.userSelect = isDragging ? "none" : "";
}

const mouseEvents = {
  start: "mousedown",
  move: "mousemove",
  end: "mouseup",
};

const touchEvents = {
  start: "touchstart",
  move: "touchmove",
  end: "touchend",
};

export function useDraggableScroll(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const { x, y } = getEventCoordinates(e, element);
      startX = x;
      startY = y;
      scrollLeft = element.scrollLeft;
      scrollTop = element.scrollTop;
      updateElementStyles(element, true);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const { x, y } = getEventCoordinates(e, element);
      const walkX = (x - startX) * 1;
      const walkY = (y - startY) * 1;
      element.scrollLeft = scrollLeft - walkX;
      element.scrollTop = scrollTop - walkY;
    };

    const handleEnd = () => {
      isDragging = false;
      updateElementStyles(element, false);
    };

    const body = document.body;

    element.addEventListener(mouseEvents.start, handleStart as EventListener);
    body.addEventListener(mouseEvents.move, handleMove as EventListener);
    body.addEventListener(mouseEvents.end, handleEnd);

    element.addEventListener(touchEvents.start, handleStart as EventListener);
    body.addEventListener(touchEvents.move, handleMove as EventListener);
    body.addEventListener(touchEvents.end, handleEnd);

    return () => {
      element.removeEventListener(
        mouseEvents.start,
        handleStart as EventListener
      );
      body.removeEventListener(mouseEvents.move, handleMove as EventListener);
      body.removeEventListener(mouseEvents.end, handleEnd);

      element.removeEventListener(
        touchEvents.start,
        handleStart as EventListener
      );
      body.removeEventListener(touchEvents.move, handleMove as EventListener);
      body.removeEventListener(touchEvents.end, handleEnd);
    };
  }, [ref]);
}
