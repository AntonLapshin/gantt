export enum TimeUnit {
  Hour,
  Day,
  Week,
  Month,
}

export type TimeRange = {
  start: number;
  end: number;
};

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 30 * DAY;

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
