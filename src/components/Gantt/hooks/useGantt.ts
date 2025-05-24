import { useMemo, useRef } from "react";
import { getTimeSequence } from "../utils/getTimeSequence";
import { useElementWidth } from "./useElementWidth";
import { roundTimeRange } from "../utils/roundTimeRange";
import { TimeRange, TimeUnit } from "../types";
import { useTimeScale } from "./useTimeScale";
import { useGanttApi } from "./useGanttApi";

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

  timeRange = useMemo(
    () => roundTimeRange(timeRange, timeUnit),
    [timeRange, timeUnit]
  );
  const { elementWidth: ganttWidth } = useElementWidth({ ref: ganttRef });
  const { elementWidth: canvasWidth } = useElementWidth({ ref: canvasRef });

  const { toPx, toTime } = useTimeScale(timeRange, canvasWidth);
  const timeSequence = useMemo(
    () => getTimeSequence(timeRange, timeUnit),
    [timeRange, timeUnit]
  );

  const visibleCanvasWidth = useMemo(() => {
    return ganttWidth - leftHeaderWidth;
  }, [ganttWidth, leftHeaderWidth]);

  const apiRef = useGanttApi(ganttRef as any, visibleCanvasWidth, toPx);

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
