import { PropsWithChildren, useContext } from "react";
import classes from "./Gantt.module.scss";
import { GanttContext } from "./Gantt";
import classNames from "classnames";

type RowProps = {
  y: number;
  className?: string;
};

export const Row = ({
  y,
  className,
  children,
}: PropsWithChildren<RowProps>) => {
  const { timeSequence } = useContext(GanttContext);

  return (
    <div
      className={classNames(classes.row, className)}
      style={{
        gridArea: `${y + 2} / 2 / ${y + 2} / ${timeSequence.length + 2}`,
      }}
    >
      {children}
    </div>
  );
};
