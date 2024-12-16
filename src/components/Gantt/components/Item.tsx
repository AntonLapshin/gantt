import { PropsWithChildren, useContext } from "react";
import classes from "./Gantt.module.scss";
import { GanttContext } from "./Gantt";
import { TimeRange } from "../types";

type ItemProps = {
  timeRange: TimeRange;
};

export const Item = ({ timeRange, children }: PropsWithChildren<ItemProps>) => {
  const { toPx } = useContext(GanttContext);
  const start = toPx(timeRange.start);
  const end = toPx(timeRange.end);

  return (
    <div
      className={classes.item}
      style={{
        left: start,
        width: end - start,
      }}
    >
      {children}
    </div>
  );
};
