import { PropsWithChildren, useContext } from "react";
import { isCurrent } from "../utils/isCurrent";
import classes from "./Gantt.module.scss";
import classNames from "classnames";
import { GanttContext } from "./Gantt";

type TopHeaderProps = {
  time: number;
  x: number;
  className?: string;
};

export const TopHeader = ({
  time,
  x,
  className,
  children,
}: PropsWithChildren<TopHeaderProps>) => {
  const { timeUnit } = useContext(GanttContext);

  return (
    <div
      className={classNames(classes.topHeader, className)}
      data-now={isCurrent(time, timeUnit)}
      style={{
        gridArea: `1 / ${x + 2} / 1 / ${x + 2}`,
      }}
    >
      {children}
    </div>
  );
};