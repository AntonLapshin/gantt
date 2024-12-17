import classes from "./Gantt.module.scss";
import { createContext, PropsWithChildren, useMemo } from "react";
import classNames from "classnames";
import { TimeUnit } from "../types";

type GanttProps = {
  ganttRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLDivElement>;
  leftHeaderWidth: number;
  topHeaderWidth: number;
  timeSequence: number[];
  timeUnit: TimeUnit;
  leftHeaderCount: number;
  toPx: (time: number) => number;
};

export const GanttContext = createContext({
  timeUnit: TimeUnit.Day,
  toPx: (_: number) => 0 as number,
  timeSequence: [] as number[],
  canvasRef: {} as React.RefObject<HTMLDivElement>,
  leftHeaderCount: 0,
});

export const Gantt = ({
  ganttRef,
  canvasRef,
  leftHeaderWidth,
  topHeaderWidth,
  timeSequence,
  timeUnit,
  leftHeaderCount,
  children,
  toPx,
}: PropsWithChildren<GanttProps>) => {
  return (
    <GanttContext.Provider
      value={useMemo(
        () => ({
          timeUnit,
          toPx,
          timeSequence,
          canvasRef,
          leftHeaderCount,
        }),
        [timeUnit, toPx, timeSequence, canvasRef, leftHeaderCount]
      )}
    >
      <div
        ref={ganttRef as any}
        className={classNames(classes.gantt)}
        style={{
          gridTemplateColumns: `${leftHeaderWidth}px repeat(${timeSequence.length}, ${topHeaderWidth}px)`,
        }}
      >
        {children}
      </div>
    </GanttContext.Provider>
  );
};
