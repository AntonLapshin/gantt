import { GanttItem } from "../__Gantt";
import { TimeRange } from "./getTimeSequence";

export function isOverlapping(range1: TimeRange, range2: TimeRange): boolean {
  return !(range1.end <= range2.start || range1.start >= range2.end);
}

export function getSubrows<T extends GanttItem>(items: T[]): T[][] {
  const sortedItems = items.sort(
    (a, b) => a.timeRange.start - b.timeRange.start
  );

  const subrows: T[][] = [];

  for (const item of sortedItems) {
    let placed = false;

    for (const subrow of subrows) {
      if (
        subrow.length === 0 ||
        !isOverlapping(item.timeRange, subrow[subrow.length - 1].timeRange)
      ) {
        subrow.push(item);
        placed = true;
        break;
      }
    }

    if (!placed) {
      subrows.push([item]);
    }
  }

  return subrows;
}
