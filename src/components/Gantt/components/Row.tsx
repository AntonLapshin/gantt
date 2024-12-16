import { PropsWithChildren, useContext } from "react";
import classes from "./Gantt.module.scss";
import { GanttContext } from "./Gantt";

type RowProps = {
  y: number;
};

export const Row = ({ y, children }: PropsWithChildren<RowProps>) => {
  const { timeSequence } = useContext(GanttContext);

  return (
    <div
      className={classes.row}
      style={{
        gridArea: `${y + 2} / 2 / ${y + 2} / ${timeSequence.length + 2}`,
      }}
    >
      {children}
    </div>
  );
};
