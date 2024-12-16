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

export type GanttItem = {
  timeRange: TimeRange;
  type: string;
};

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 30 * DAY;

export type GanttApi = {
  scrollToNow: () => void;
};
