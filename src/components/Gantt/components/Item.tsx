import { TimeRange } from "../types";
import classNames from "classnames";
import { PropsWithChildren, useContext } from "react";

import { GanttContext } from "./Gantt";

import classes from "./Gantt.module.scss";

type ItemProps = {
  timeRange: TimeRange;
  className?: string;
};

export const Item = ({
  timeRange,
  className,
  children,
}: PropsWithChildren<ItemProps>) => {
  const { toPx } = useContext(GanttContext);
  const start = toPx(timeRange.start);
  const end = toPx(timeRange.end);

  return (
    <div
      className={classNames(classes.item, className)}
      style={{
        left: start,
        width: end - start,
      }}
    >
      {children}
    </div>
  );
};
