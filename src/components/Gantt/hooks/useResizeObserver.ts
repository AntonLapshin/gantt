import { useLayoutEffect, useRef } from "react";

export const useResizeObserver = (
  target: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  const observerRef = useRef<ResizeObserver | null>(null);

  useLayoutEffect(() => {
    if (!target.current) {
      return;
    }

    const createObserver = () => {
      observerRef.current = new ResizeObserver(() => {
        callback();
      });

      if (target.current) {
        observerRef.current.observe(target.current);
      }
    };

    createObserver();

    return () => {
      if (observerRef.current && target.current) {
        observerRef.current.unobserve(target.current);
        observerRef.current.disconnect();
      }
    };
  }, [target, callback]);
};
