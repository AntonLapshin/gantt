import { useMemo, useRef } from "react";
import { GanttApi } from "../types";

export const useGanttApi = (
  ganttRef: React.RefObject<HTMLDivElement>,
  visibleCanvasWidth: number,
  toPx: (time: number) => number
) => {
  const apiRef = useRef<GanttApi | undefined>();

  apiRef.current = useMemo(
    () => ({
      scrollToNow: () => {
        if (!ganttRef.current) return;
        ganttRef.current.scrollLeft = Math.max(
          0,
          toPx(Date.now()) - visibleCanvasWidth / 2
        );
      },
    }),
    [ganttRef, visibleCanvasWidth, toPx]
  );

  return apiRef;
};
