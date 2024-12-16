import { useEffect, useState, useRef, RefObject } from "react";

interface UseDraggableProps {
  onDrag?: (deltaX: number, deltaY: number) => void;
}

export function useDraggable<T extends HTMLElement>(
  ref: RefObject<T>,
  { onDrag }: UseDraggableProps = {}
) {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startX.current = e.clientX - element.offsetLeft;
      startY.current = e.clientY - element.offsetTop;

      // Prevent text selection
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const x = e.clientX - element.offsetLeft;
      const y = e.clientY - element.offsetTop;

      const deltaX = x - startX.current;
      const deltaY = y - startY.current;

      onDrag?.(deltaX, deltaY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Add event listeners
    element.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup
    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [ref, isDragging, onDrag]);

  return { isDragging };
}
