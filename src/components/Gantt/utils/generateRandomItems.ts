import { GanttItem } from "../Gantt";
import { TimeRange } from "./getTimeSequence";

const GANTT_TYPES = [
  "Everyone",
  "D0",
  "D1",
  "D2",
  "D0 5-10",
  "D0 20-50",
  "D0 50-100",
  "D1 5-10",
  "D1 20-50",
  "D1 50-100",
  "D2 5-10",
  "D2 20-50",
  "D2 50-100",
  "D3 5-10",
  "D3 20-50",
  "D3 50-100",
];

const generateValueForType = (type: string): string => {
  const prefixes = [
    "Project",
    "Task",
    "Sprint",
    "Initiative",
    "Module",
    "Phase",
    "Component",
    "Milestone",
    "Feature",
    "Workstream",
  ];
  const identifiers = [
    "Alpha",
    "Beta",
    "Core",
    "Advanced",
    "Primary",
    "Secondary",
    "Critical",
    "Major",
    "Minor",
    "Experimental",
  ];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const identifier =
    identifiers[Math.floor(Math.random() * identifiers.length)];

  return `${prefix} ${type} ${identifier}`;
};

export function generateRandomItems(
  timeRange: TimeRange,
  itemCount: number
): GanttItem[] {
  const ganttItems: GanttItem[] = [];
  const { start, end } = timeRange;

  for (let i = 0; i < itemCount; i++) {
    const type = GANTT_TYPES[Math.floor(Math.random() * GANTT_TYPES.length)];

    const itemDuration = Math.floor(Math.random() * (7 * 24 * 60 * 60 * 1000)); // Up to 7 days
    const maxStartTime = end - itemDuration;
    const itemStart = Math.floor(
      start + Math.random() * (maxStartTime - start)
    );
    const itemEnd = itemStart + itemDuration;

    ganttItems.push({
      timeRange: {
        start: itemStart,
        end: itemEnd,
      },
      type,
      value: generateValueForType(type),
    });
  }

  return ganttItems.sort((a, b) => a.timeRange.start - b.timeRange.start);
}
