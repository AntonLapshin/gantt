import { useLayoutEffect, useState } from "react";
import { useResizeObserver } from "./useResizeObserver";

const DEFAULT_ELEMENT_WIDTH = 1024;

interface UseElementWidthProps {
  ref: any;
  defaultElementWidth?: number;
}

export const useElementWidth = ({
  ref,
  defaultElementWidth = DEFAULT_ELEMENT_WIDTH,
}: UseElementWidthProps) => {
  const [elementWidth, setElementWidth] = useState<number>(defaultElementWidth);

  useLayoutEffect(() => {
    setElementWidth(ref.current.clientWidth);
  }, [ref, setElementWidth]);

  useResizeObserver(ref, () => {
    setElementWidth(ref.current.clientWidth);
  });

  return {
    elementWidth,
  };
};
