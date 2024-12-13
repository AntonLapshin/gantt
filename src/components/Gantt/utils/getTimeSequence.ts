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

const getIncrement = (unit: TimeUnit): number => {
  switch (unit) {
    case TimeUnit.Hour:
      return HOUR;
    case TimeUnit.Day:
      return DAY;
    case TimeUnit.Week:
      return WEEK;
    case TimeUnit.Month:
      return MONTH;
    default:
      throw new Error("Invalid time unit");
  }
};

export function getTimeSequence(
  timeRange: TimeRange,
  unit: TimeUnit
): number[] {
  const sequence: number[] = [];
  const increment = getIncrement(unit);

  let current = new Date(timeRange.start);
  const end = new Date(timeRange.end);

  while (current <= end) {
    sequence.push(current.getTime());
    current = new Date(current.getTime() + increment);
  }

  return sequence;
}
