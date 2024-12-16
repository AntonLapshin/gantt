import { PropsWithChildren } from "react";
import classes from "./Gantt.module.scss";
import classNames from "classnames";

type SubrowProps = { className?: string };

export const Subrow = ({
  className,
  children,
}: PropsWithChildren<SubrowProps>) => {
  return (
    <div className={classNames(classes.subrow, className)}>{children}</div>
  );
};
