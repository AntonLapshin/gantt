import { PropsWithChildren } from "react";
import classes from "./Gantt.module.scss";
import classNames from "classnames";

type LeftHeaderProps = {
  y: number;
  className?: string;
};

export const LeftHeader = ({
  y,
  className,
  children,
}: PropsWithChildren<LeftHeaderProps>) => {
  return (
    <div
      className={classNames(classes.leftHeader, className)}
      style={{ gridArea: `${y + 2} / 1 / ${y + 2} / 1` }}
    >
      {children}
    </div>
  );
};
