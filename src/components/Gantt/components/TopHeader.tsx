import { PropsWithChildren, useContext } from "react";
import { isCurrent } from "../utils/isCurrent";
import classes from "./Gantt.module.scss";
import classNames from "classnames";
import { GanttContext } from "./Gantt";

type TopHeaderProps = {
  time: number;
  x: number;
};

export const TopHeader = ({
  time,
  x,
  children,
}: PropsWithChildren<TopHeaderProps>) => {
  const { timeUnit } = useContext(GanttContext);

  return (
    <div
      className={classNames(
        classes.topHeader,
        isCurrent(time, timeUnit) && classes.now
      )}
      style={{
        gridArea: `1 / ${x + 2} / 1 / ${x + 2}`,
      }}
    >
      {children}
    </div>
  );
};
