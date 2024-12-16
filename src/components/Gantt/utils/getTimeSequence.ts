import { TimeRange, TimeUnit } from "../types";

export function getTimeSequence(
  timeRange: TimeRange,
  timeUnit: TimeUnit
): number[] {
  const sequence: number[] = [];

  const roundToStart = (timestamp: number, unit: TimeUnit): number => {
    const date = new Date(timestamp);

    switch (unit) {
      case TimeUnit.Hour:
        date.setMinutes(0, 0, 0);
        break;
      case TimeUnit.Day:
        date.setHours(0, 0, 0, 0);
        break;
      case TimeUnit.Week:
        const day = date.getDay();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - day);
        break;
      case TimeUnit.Month:
        date.setHours(0, 0, 0, 0);
        date.setDate(1);
        break;
    }

    return date.getTime();
  };

  const getNextTimestamp = (timestamp: number, unit: TimeUnit): number => {
    const date = new Date(timestamp);

    switch (unit) {
      case TimeUnit.Hour:
        date.setHours(date.getHours() + 1);
        break;
      case TimeUnit.Day:
        date.setDate(date.getDate() + 1);
        break;
      case TimeUnit.Week:
        date.setDate(date.getDate() + 7);
        break;
      case TimeUnit.Month:
        date.setMonth(date.getMonth() + 1);
        break;
    }

    return roundToStart(date.getTime(), unit);
  };

  let currentTimestamp = roundToStart(timeRange.start, timeUnit);
  const endTimestamp = roundToStart(timeRange.end, timeUnit);

  while (currentTimestamp <= endTimestamp) {
    sequence.push(currentTimestamp);
    currentTimestamp = getNextTimestamp(currentTimestamp, timeUnit);
  }

  return sequence;
}
