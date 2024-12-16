import classes from "./Gantt.module.scss";
import { createContext, PropsWithChildren } from "react";
import { isCurrent } from "../utils/isCurrent";
import classNames from "classnames";
import { TimeUnit } from "../utils/getTimeSequence";

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
  const timelineLeft = toPx(Date.now());

  return (
    <GanttContext.Provider
      value={{
        timeUnit,
        toPx,
        timeSequence,
      }}
    >
      <div
        ref={ganttRef as any}
        className={classes.gantt}
        style={{
          gridTemplateColumns: `${leftHeaderWidth}px repeat(${timeSequence.length}, ${topHeaderWidth}px)`,
        }}
      >
        <div
          className={classes.cell0}
          style={{ gridArea: "1 / 1 / 1 / 1" }}
        ></div>

        {children}

        {timeSequence.map((time, x) => {
          return [
            ...new Array(leftHeaderCount).fill(0).map((_, y) => {
              return (
                <div
                  key={`cell-${x}-${y}`}
                  className={classNames(
                    classes.cell,
                    isCurrent(time, timeUnit) && classes.now
                  )}
                  style={{
                    gridArea: `${y + 2} / ${x + 2} / ${y + 2} / ${x + 2}`,
                  }}
                ></div>
              );
            }),
          ];
        })}

        <div
          ref={canvasRef as any}
          className={classes.area}
          style={{
            gridArea: `2 / 2 / ${leftHeaderCount + 2} / ${
              timeSequence.length + 2
            }`,
          }}
        >
          <div
            className={classes.timeline}
            style={{
              left: timelineLeft,
            }}
          ></div>
        </div>
      </div>
    </GanttContext.Provider>
  );
};
