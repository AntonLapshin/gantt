import { useCallback, useMemo } from "react";
import { TimeRange } from "../types";

export const useTimeScale = (timeRange: TimeRange, canvasWidth: number) => {
  const scale = useMemo(
    () => (timeRange.end - timeRange.start) / canvasWidth,
    [canvasWidth, timeRange]
  );

  const toPx = useCallback(
    (time: number) => {
      return (time - timeRange.start) / scale;
    },
    [timeRange, scale]
  );

  const toTime = useCallback(
    (px: number) => {
      return px * scale + timeRange.start;
    },
    [timeRange, scale]
  );

  return { scale, toPx, toTime };
};
