import { PropsWithChildren, useContext } from "react";
import classes from "./Gantt.module.scss";
import { GanttContext } from "./Gantt";
import classNames from "classnames";
import { isCurrent } from "../utils/isCurrent";

type CellProps = {
  x: number;
  y: number;
  time: number;
  className?: string;
};

export const Cell = ({
  x,
  y,
  time,
  className,
  children,
}: PropsWithChildren<CellProps>) => {
  const { timeUnit } = useContext(GanttContext);

  return (
    <div
      className={classNames(classes.cell, className)}
      data-now={isCurrent(time, timeUnit)}
      style={{
        gridArea: `${y + 2} / ${x + 2} / ${y + 2} / ${x + 2}`,
      }}
    >
      {children}
    </div>
  );
};
