import { getTimeSequence, TimeRange, TimeUnit } from "./utils/getTimeSequence";
import classes from "./Gantt.module.scss";
import { MutableRefObject, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import classNames from "classnames";
import { isCurrent } from "./utils/isCurrent";
import { useElementWidth } from "./hooks/useElementWidth";
import { roundTimeRange } from "./utils/roundTimeRange";
import { getSubrows } from "./utils/getSubrows";

export type GanttItem = {
  timeRange: TimeRange;
  type: string;
};

type GanttProps<T extends GanttItem> = {
  apiRef: MutableRefObject<GanttApi | undefined>;
  timeRange: TimeRange;
  items: T[];
  timeUnit: TimeUnit;
  topHeaderWidth?: number;
  leftHeaderWidth?: number;
  ItemComponent: React.FC<{ item: T }>;
  TopHeaderComponent: React.FC<{ time: number; unit: TimeUnit }>;
  LeftHeaderComponent: React.FC<{ type: string }>;
};

export type GanttApi = {
  scrollToNow: () => void;
};

export function Gantt<T extends GanttItem>({
  apiRef = useRef<GanttApi | undefined>(),
  timeRange,
  items,
  timeUnit,
  topHeaderWidth = 120,
  leftHeaderWidth = 120,
  ItemComponent,
  TopHeaderComponent,
  LeftHeaderComponent,
}: GanttProps<T>) {
  timeRange = roundTimeRange(timeRange, timeUnit);

  const ganttRef = useRef();
  const canvasRef = useRef();
  const { elementWidth: ganttWidth } = useElementWidth({ ref: ganttRef });
  const { elementWidth: canvasWidth } = useElementWidth({ ref: canvasRef });
  const scale = (timeRange.end - timeRange.start) / canvasWidth;
  const { events: canvasDraggableEventHandlers } = useDraggable(
    ganttRef as any,
    {
      decayRate: 0,
    }
  );
  useDraggable(ganttRef as any);
  const timeSequence = getTimeSequence(timeRange, timeUnit);

  const toPx = (time: number) => {
    return (time - timeRange.start) / scale;
  };

  apiRef.current = {
    scrollToNow: () => {
      (ganttRef.current as any).scrollLeft = Math.max(
        0,
        toPx(Date.now()) - (ganttWidth - leftHeaderWidth) / 2
      );
    },
  };

  const groupedByType = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, T[]>);

  const timelineLeft = toPx(Date.now());

  return (
    <div
      ref={ganttRef as any}
      className={classes.gantt}
      style={{
        gridTemplateColumns: `${leftHeaderWidth}px repeat(${timeSequence.length}, ${topHeaderWidth}px)`,
      }}
      {...canvasDraggableEventHandlers}
    >
      <div
        className={classes.cell0}
        style={{ gridArea: "1 / 1 / 1 / 1" }}
      ></div>

      {timeSequence.map((time, x) => {
        return (
          <div
            key={`topHeader-${x}`}
            className={classNames(
              classes.topHeader,
              isCurrent(time, timeUnit) && classes.now
            )}
            style={{
              gridArea: `1 / ${x + 2} / 1 / ${x + 2}`,
            }}
          >
            <TopHeaderComponent time={time} unit={timeUnit} />
          </div>
        );
      })}

      {Object.keys(groupedByType).map((type, y) => {
        return (
          <div
            key={`leftHeader-${type}`}
            className={classes.leftHeader}
            style={{ gridArea: `${y + 2} / 1 / ${y + 2} / 1` }}
          >
            <LeftHeaderComponent type={type} />
          </div>
        );
      })}

      {timeSequence.map((time, x) => {
        return [
          ...Object.keys(groupedByType).map((_, y) => {
            return (
              <div
                key={`cell-${x}-${y}`}
                className={classNames(
                  classes.cell,
                  isCurrent(time, timeUnit) && classes.now
                )}
                style={{
                  gridArea: `${y + 2} / ${x + 2} / ${y + 2} / ${x + 2}`,
                }}
              ></div>
            );
          }),
        ];
      })}

      {Object.keys(groupedByType).map((type, y) => {
        const subrows = getSubrows(groupedByType[type]);

        return (
          <div
            key={`row-${type}`}
            className={classes.row}
            style={{
              gridArea: `${y + 2} / 2 / ${y + 2} / ${timeSequence.length + 2}`,
            }}
          >
            {subrows.map((subrow, index) => {
              return (
                <div key={`subrow-${index}`} className={classes.subrow}>
                  {subrow.map((item, subindex) => {
                    const start = toPx(item.timeRange.start);
                    const end = toPx(item.timeRange.end);

                    return (
                      <div
                        key={`item-${type}-${index}-${subindex}`}
                        className={classes.item}
                        style={{
                          left: start,
                          width: end - start,
                        }}
                      >
                        <ItemComponent item={item} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}

      <div
        ref={canvasRef as any}
        className={classes.area}
        style={{
          gridArea: `2 / 2 / ${Object.keys(groupedByType).length + 2} / ${
            timeSequence.length + 2
          }`,
        }}
      >
        <div
          className={classes.timeline}
          style={{
            left: timelineLeft,
          }}
        ></div>
      </div>
    </div>
  );
}
