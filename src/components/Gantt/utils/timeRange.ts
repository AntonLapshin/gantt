import { TimeRange } from "../types";

export const isTimeOutsideOfTimeRange = (
  time: number,
  timeRange: TimeRange
) => {
  return time < timeRange.start || time > timeRange.end;
};

export const isItemOutsideOfTimeRange = (
  item: TimeRange,
  timeRange: TimeRange
) => {
  return item.start > timeRange.end || item.end < timeRange.start;
};
