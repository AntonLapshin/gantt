import { PropsWithChildren } from "react";
import classes from "./Gantt.module.scss";

type LeftHeaderProps = {
  y: number;
};

export const LeftHeader = ({
  children,
  y,
}: PropsWithChildren<LeftHeaderProps>) => {
  return (
    <div
      className={classes.leftHeader}
      style={{ gridArea: `${y + 2} / 1 / ${y + 2} / 1` }}
    >
      {children}
    </div>
  );
};
