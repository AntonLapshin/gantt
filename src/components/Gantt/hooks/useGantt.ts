import { useCallback, useMemo, useRef } from "react";
import { getTimeSequence } from "../utils/getTimeSequence";
import { useElementWidth } from "./useElementWidth";
import { roundTimeRange } from "../utils/roundTimeRange";
import { GanttApi, TimeRange, TimeUnit } from "../types";

type UseGanttProps = {
  timeRange: TimeRange;
  timeUnit: TimeUnit;
  leftHeaderWidth: number;
};

export const useGantt = ({
  timeRange,
  timeUnit,
  leftHeaderWidth,
}: UseGanttProps) => {
  const ganttRef = useRef<HTMLDivElement | undefined>();
  const canvasRef = useRef<HTMLDivElement | undefined>();
  const apiRef = useRef<GanttApi | undefined>();

  timeRange = useMemo(
    () => roundTimeRange(timeRange, timeUnit),
    [timeRange, timeUnit]
  );
  const { elementWidth: ganttWidth } = useElementWidth({ ref: ganttRef });
  const { elementWidth: canvasWidth } = useElementWidth({ ref: canvasRef });

  const scale = useMemo(
    () => (timeRange.end - timeRange.start) / canvasWidth,
    [canvasWidth, timeRange]
  );
  const timeSequence = useMemo(
    () => getTimeSequence(timeRange, timeUnit),
    [getTimeSequence, timeRange, timeUnit]
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

  const visibleCanvasWidth = useMemo(() => {
    return ganttWidth - leftHeaderWidth;
  }, [ganttWidth, leftHeaderWidth]);

  apiRef.current = useMemo(() => {
    return {
      scrollToNow: () => {
        (ganttRef.current as any).scrollLeft = Math.max(
          0,
          toPx(Date.now()) - visibleCanvasWidth / 2
        );
      },
    };
  }, [ganttRef, ganttWidth, leftHeaderWidth, toPx]);

  return {
    ganttRef,
    canvasRef,
    apiRef,
    timeSequence,
    toPx,
    toTime,
    canvasWidth,
    visibleCanvasWidth,
  };
};
