import { useMemo } from "react";
import { useScrollLeft } from "./useScrollLeft";

type UseVisibleTimeRangeProps = {
  toTime: (px: number) => number;
  ganttRef: React.RefObject<HTMLDivElement>;
  canvasWidth: number;
  visibleCanvasWidth: number;
  buffer?: number;
};

export const useVisibleTimeRange = ({
  toTime,
  canvasWidth,
  visibleCanvasWidth,
  ganttRef,
  buffer = 1000,
}: UseVisibleTimeRangeProps) => {
  const scrollLeft = useScrollLeft(ganttRef as any);

  const visibleTimeRange = useMemo(() => {
    return {
      start: toTime(Math.max(0, scrollLeft - buffer)),
      end: toTime(
        Math.min(scrollLeft + visibleCanvasWidth + buffer, canvasWidth)
      ),
    };
  }, [scrollLeft, visibleCanvasWidth, toTime]);

  return visibleTimeRange;
};
