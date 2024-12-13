import useResizeObserver from "@react-hook/resize-observer";
import { useLayoutEffect, useState } from "react";

const DEFAULT_ELEMENT_WIDTH = 1024;

interface UseElementWidthProps {
  ref: any;
  defaultElementWidth?: number;
}

export const useElementWidth = ({ ref, defaultElementWidth = DEFAULT_ELEMENT_WIDTH }: UseElementWidthProps) => {
  const [elementWidth, setElementWidth] = useState<number>(defaultElementWidth);

  useLayoutEffect(() => {
    setElementWidth(ref.current.clientWidth);
  }, [ref, setElementWidth]);

  useResizeObserver(ref.current, () => {
    setElementWidth(ref.current.clientWidth);
  });

  return {
    elementWidth,
  };
};
