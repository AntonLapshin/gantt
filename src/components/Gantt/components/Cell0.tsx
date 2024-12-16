import { PropsWithChildren } from "react";
import classes from "./Gantt.module.scss";
import classNames from "classnames";

type Cell0Props = {
  className?: string;
};

export const Cell0 = ({
  className,
  children,
}: PropsWithChildren<Cell0Props>) => {
  return (
    <div
      className={classNames(classes.cell0, className)}
      style={{ gridArea: "1 / 1 / 1 / 1" }}
    >
      {children}
    </div>
  );
};
