import { TimeUnit } from "../types";

export function isCurrent(time: number, timeUnit: TimeUnit): boolean {
  const inputDate = new Date(time);
  const now = new Date();

  switch (timeUnit) {
    case TimeUnit.Hour:
      return (
        inputDate.getFullYear() === now.getFullYear() &&
        inputDate.getMonth() === now.getMonth() &&
        inputDate.getDate() === now.getDate() &&
        inputDate.getHours() === now.getHours()
      );

    case TimeUnit.Day:
      return (
        inputDate.getFullYear() === now.getFullYear() &&
        inputDate.getMonth() === now.getMonth() &&
        inputDate.getDate() === now.getDate()
      );

    case TimeUnit.Week:
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      console.debug({ weekStart, weekEnd, inputDate });
      return inputDate >= weekStart && inputDate <= weekEnd;

    case TimeUnit.Month:
      return (
        inputDate.getFullYear() === now.getFullYear() &&
        inputDate.getMonth() === now.getMonth()
      );

    default:
      throw new Error("Invalid time unit");
  }
}
