import { PropsWithChildren, useContext } from "react";
import classes from "./Gantt.module.scss";
import { GanttContext } from "./Gantt";

type TimelineProps = {};

export const Timeline = ({ children }: PropsWithChildren<TimelineProps>) => {
  const { canvasRef, toPx, leftHeaderCount, timeSequence } =
    useContext(GanttContext);

  const timelineLeft = toPx(Date.now());

  return (
    <div
      ref={canvasRef as any}
      className={classes.area}
      style={{
        gridArea: `2 / 2 / ${leftHeaderCount + 2} / ${timeSequence.length + 2}`,
      }}
    >
      <div
        className={classes.timeline}
        style={{
          left: timelineLeft,
        }}
      >
        {children}
      </div>
    </div>
  );
};
