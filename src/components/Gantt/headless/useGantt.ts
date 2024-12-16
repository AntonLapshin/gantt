import { useRef } from "react";
import { getTimeSequence, TimeRange, TimeUnit } from "../utils/getTimeSequence";
import { useElementWidth } from "../hooks/useElementWidth";
import { GanttApi } from "../__Gantt";
import { roundTimeRange } from "../utils/roundTimeRange";

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
  timeRange = roundTimeRange(timeRange, timeUnit);
  const ganttRef = useRef<HTMLDivElement | undefined>();
  const canvasRef = useRef<HTMLDivElement | undefined>();
  const apiRef = useRef<GanttApi | undefined>();
  const { elementWidth: ganttWidth } = useElementWidth({ ref: ganttRef });
  const { elementWidth: canvasWidth } = useElementWidth({ ref: canvasRef });
  const scale = (timeRange.end - timeRange.start) / canvasWidth;
  const timeSequence = getTimeSequence(timeRange, timeUnit);

  const toPx = (time: number) => {
    return (time - timeRange.start) / scale;
  };

  apiRef.current = {
    scrollToNow: () => {
      (ganttRef.current as any).scrollLeft = Math.max(
        0,
        toPx(Date.now()) - (ganttWidth - leftHeaderWidth) / 2
      );
    },
  };

  return {
    ganttRef,
    canvasRef,
    apiRef,
    timeSequence,
    toPx,
  };
};
