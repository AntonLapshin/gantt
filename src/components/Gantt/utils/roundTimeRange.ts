import { TimeRange, TimeUnit } from "./getTimeSequence";

export function roundTimeRange(
  timeRange: TimeRange,
  timeUnit: TimeUnit
): TimeRange {
  const { start, end } = timeRange;
  const startDate = new Date(start);
  const endDate = new Date(end);

  switch (timeUnit) {
    case TimeUnit.Hour:
      startDate.setMinutes(0, 0, 0);
      endDate.setMinutes(59, 59, 999);

      return {
        start: startDate.getTime(),
        end: endDate.getTime(),
      };

    case TimeUnit.Day:
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      return {
        start: startDate.getTime(),
        end: endDate.getTime(),
      };

    case TimeUnit.Week:
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() - startDate.getDay());

      endDate.setHours(23, 59, 59, 999);
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

      return {
        start: startDate.getTime(),
        end: endDate.getTime(),
      };

    case TimeUnit.Month:
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(1);

      endDate.setHours(23, 59, 59, 999);
      endDate.setMonth(endDate.getMonth() + 1, 0);

      return {
        start: startDate.getTime(),
        end: endDate.getTime(),
      };

    default:
      throw new Error("Invalid time unit");
  }
}
