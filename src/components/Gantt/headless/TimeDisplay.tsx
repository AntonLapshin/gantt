import React, { useContext } from "react";
import { TimeUnit } from "../utils/getTimeSequence";
import { GanttContext } from "./Gantt";

interface TimeDisplayProps {
  time: number;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => {
  const { timeUnit } = useContext(GanttContext);

  const formatTime = (date: Date) => {
    switch (timeUnit) {
      case TimeUnit.Hour:
        return date
          .toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toLowerCase();

      case TimeUnit.Day:
        return date.toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
        });

      case TimeUnit.Week:
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return `${startOfWeek.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        })} - ${endOfWeek.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        })}`;

      case TimeUnit.Month:
        return date.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        });

      default:
        return time;
    }
  };

  return <div className="time-display">{formatTime(new Date(time))}</div>;
};
