import { getTimeSequence, TimeRange, TimeUnit } from "./utils/getTimeSequence";
import classes from "./Gantt.module.scss";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import classNames from "classnames";
import { isCurrent } from "./utils/isCurrent";
import { TimeDisplay } from "./TimeDisplay";
import { useElementWidth } from "./hooks/useElementWidth";
import { roundTimeRange } from "./utils/roundTimeRange";
import { getSubrows } from "./utils/groupItemsWithNoOverlap";

export type GanttItem = {
  timeRange: TimeRange;
  type: string;
  value: string;
};

type GanttProps = {
  timeRange: TimeRange;
  items: GanttItem[];
  timeUnit: TimeUnit;
  unitWidth?: number;
  colWidth?: number;
};

export const Gantt = ({
  timeRange,
  items,
  timeUnit,
  colWidth = 80,
}: GanttProps) => {
  timeRange = roundTimeRange(timeRange, timeUnit);
  const ganttRef = useRef();
  const canvasRef = useRef();
  const { elementWidth: canvasWidth } = useElementWidth({ ref: canvasRef });
  const scale = (timeRange.end - timeRange.start) / canvasWidth;
  const { events: canvasDraggableEventHandlers } = useDraggable(
    ganttRef as any,
    {
      decayRate: 0,
    }
  );
  const timeSequence = getTimeSequence(timeRange, timeUnit);

  const toPx = (time: number) => {
    return (time - timeRange.start) / scale;
  };

  const groupedByType = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, GanttItem[]>);

  const timelineLeft = toPx(Date.now());

  return (
    <div
      ref={ganttRef as any}
      className={classes.grid}
      style={{
        gridTemplateColumns: `repeat(${
          timeSequence.length + 1
        }, ${colWidth}px)`,
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
            key={`rowHeader-${x}`}
            className={classNames(
              classes.rowHeader,
              isCurrent(time, timeUnit) && classes.now
            )}
            style={{
              gridArea: `1 / ${x + 2} / 1 / ${x + 2}`,
            }}
          >
            <TimeDisplay time={time} timeUnit={timeUnit} />
          </div>
        );
      })}

      {Object.keys(groupedByType).map((type, y) => {
        return (
          <div
            key={`colHeader-${type}`}
            className={classes.colHeader}
            style={{ gridArea: `${y + 2} / 1 / ${y + 2} / 1` }}
          >
            {type}
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
                  {subrow.map((item) => {
                    const start = toPx(item.timeRange.start);
                    const end = toPx(item.timeRange.end);

                    return (
                      <div
                        key={`item-${type}-${index}`}
                        className={classes.item}
                        style={{
                          left: start,
                          width: end - start,
                        }}
                      >
                        {item.value}
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
};
