import { TimeRange, TimeUnit } from "./getTimeSequence";

export function roundTimeRange(
  timeRange: TimeRange,
  timeUnit: TimeUnit
): TimeRange {
  const { start, end } = timeRange;
  const startDate = new Date(start);
  const endDate = new Date(end);

  console.debug({
    start: startDate.toLocaleTimeString(),
    end: endDate.toLocaleTimeString(),
  });

  switch (timeUnit) {
    case TimeUnit.Hour:
      // Round start down to the current hour's beginning
      startDate.setMinutes(0, 0, 0);

      // Round end up to the current hour's end
      endDate.setMinutes(59, 59, 999);

      console.debug({
        start: startDate.toLocaleTimeString(),
        end: endDate.toLocaleTimeString(),
      });

      return {
        start: startDate.getTime(),
        end: endDate.getTime(),
      };

    case TimeUnit.Day:
      // Round start down to the beginning of the current day
      startDate.setHours(0, 0, 0, 0);

      // Round end up to the end of the current day
      endDate.setHours(23, 59, 59, 999);

      return {
        start: startDate.getTime(),
        end: endDate.getTime(),
      };

    case TimeUnit.Week:
      // Round start down to the beginning of the current week (Sunday)
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() - startDate.getDay());

      // Round end up to the end of the current week (Saturday)
      endDate.setHours(23, 59, 59, 999);
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

      return {
        start: startDate.getTime(),
        end: endDate.getTime(),
      };

    case TimeUnit.Month:
      // Round start down to the beginning of the current month
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(1);

      // Round end up to the end of the current month
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
