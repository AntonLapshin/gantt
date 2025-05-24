import { TimeUnit } from "../types";

export const formatTime = (date: Date, timeUnit: TimeUnit): string | undefined => {
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
      })} — ${endOfWeek.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      })}`;

    case TimeUnit.Month:
      return date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

    default:
      return undefined;
  }
};
