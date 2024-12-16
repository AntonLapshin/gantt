import { PropsWithChildren } from "react";
import classes from "./Gantt.module.scss";

type SubrowProps = {};

export const Subrow = ({ children }: PropsWithChildren<SubrowProps>) => {
  return <div className={classes.subrow}>{children}</div>;
};
