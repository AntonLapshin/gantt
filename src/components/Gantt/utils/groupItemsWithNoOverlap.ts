import { GanttItem } from "../Gantt";
import { TimeRange } from "./getTimeSequence";

export function isOverlapping(range1: TimeRange, range2: TimeRange): boolean {
  return !(range1.end <= range2.start || range1.start >= range2.end);
}

export function getSubrows(items: GanttItem[]): GanttItem[][] {
  // Sort items by start time to ensure consistent processing
  const sortedItems = items.sort(
    (a, b) => a.timeRange.start - b.timeRange.start
  );

  // Initialize the first non-overlapping group
  const subrows: GanttItem[][] = [];

  for (const item of sortedItems) {
    let placed = false;

    // Try to place in existing non-overlapping groups
    for (const subrow of subrows) {
      // Check if the item can be added to this group
      if (
        subrow.length === 0 ||
        !isOverlapping(item.timeRange, subrow[subrow.length - 1].timeRange)
      ) {
        subrow.push(item);
        placed = true;
        break;
      }
    }

    // If not placed in existing groups, create a new group
    if (!placed) {
      subrows.push([item]);
    }
  }

  return subrows;
}
