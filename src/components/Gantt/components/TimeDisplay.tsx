import React, { useContext, useMemo } from "react";
import { GanttContext } from "./Gantt";
import { formatTime } from "../utils/formatTime";

interface TimeDisplayProps {
  time: number;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => {
  const { timeUnit } = useContext(GanttContext);

  return useMemo(
    () => formatTime(new Date(time), timeUnit) ?? time,
    [time, timeUnit, formatTime]
  );
};
