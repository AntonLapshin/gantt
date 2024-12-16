import "./App.css";
import { generateRandomItems } from "./generateRandomItems";
import { TimeDisplay } from "./components/Gantt/components/TimeDisplay";
import { useGantt } from "./components/Gantt/hooks/useGantt";
import { Gantt } from "./components/Gantt/components/Gantt";
import { TopHeader } from "./components/Gantt/components/TopHeader";
import { LeftHeader } from "./components/Gantt/components/LeftHeader";
import { Row } from "./components/Gantt/components/Row";
import { getSubrows } from "./components/Gantt/utils/getSubrows";
import { Subrow } from "./components/Gantt/components/Subrow";
import { Item } from "./components/Gantt/components/Item";
import { useDraggableScroll } from "./components/Gantt/hooks/useDraggableScroll";
import { DAY, GanttItem, TimeUnit } from "./components/Gantt/types";
import { Timeline } from "./components/Gantt/components/Timeline";
import { Cell0 } from "./components/Gantt/components/Cell0";
import { Cell } from "./components/Gantt/components/Cell";
import { useState } from "react";

const timeRange = {
  start: new Date().getTime() - 10 * DAY,
  end: new Date().getTime() + 10 * DAY,
};

export type Item = GanttItem & {
  value: string;
};

const items: Item[] = generateRandomItems(timeRange, 150);

function App() {
  const [selectedTimeUnit, setSelectedTimeUnit] = useState<TimeUnit>(
    TimeUnit.Day
  );
  const { ganttRef, canvasRef, apiRef, timeSequence, toPx } = useGantt({
    timeRange,
    timeUnit: selectedTimeUnit,
    leftHeaderWidth: 120,
  });

  useDraggableScroll(ganttRef as any);

  const groupedByType = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  const leftHeaders = Object.keys(groupedByType);

  return (
    <div style={{ height: "700px" }}>
      <Gantt
        ganttRef={ganttRef as any}
        canvasRef={canvasRef as any}
        leftHeaderWidth={120}
        topHeaderWidth={120}
        timeSequence={timeSequence}
        timeUnit={selectedTimeUnit}
        leftHeaderCount={leftHeaders.length}
        toPx={toPx}
      >
        <Cell0 className="cell0" />
        {timeSequence.map((time, x) => {
          return (
            <TopHeader key={time} time={time} x={x} className="topHeader">
              <div style={{ padding: "0.5rem 1rem" }}>
                <TimeDisplay time={time} />
              </div>
            </TopHeader>
          );
        })}
        {leftHeaders.map((type, y) => {
          return (
            <LeftHeader key={type} y={y} className="leftHeader">
              {type}
            </LeftHeader>
          );
        })}
        {leftHeaders.map((type, y) => {
          const subrows = getSubrows(groupedByType[type]);
          return (
            <Row key={type} y={y} className="row">
              {subrows.map((subrow, index) => {
                return (
                  <Subrow key={index} className="subrow">
                    {subrow.map((item, index) => {
                      return (
                        <Item key={index} timeRange={item.timeRange}>
                          <div className="item">{item.value}</div>
                        </Item>
                      );
                    })}
                  </Subrow>
                );
              })}
            </Row>
          );
        })}
        {timeSequence.map((time, x) => {
          return [
            ...new Array(leftHeaders.length).fill(0).map((_, y) => {
              return (
                <Cell
                  key={`cell-${x}-${y}`}
                  x={x}
                  y={y}
                  time={time}
                  className="cell"
                />
              );
            }),
          ];
        })}
        <Timeline>
          <div
            style={{ height: "100%", width: "2px", backgroundColor: "tomato" }}
          ></div>
        </Timeline>
      </Gantt>
      <button onClick={() => apiRef.current?.scrollToNow()}>To Now</button>
      <div>
        <select
          value={selectedTimeUnit}
          onChange={(e) => setSelectedTimeUnit(+e.target.value)}
        >
          <option value={TimeUnit.Hour}>Hour</option>
          <option value={TimeUnit.Day}>Day</option>
          <option value={TimeUnit.Week}>Week</option>
          <option value={TimeUnit.Month}>Month</option>
        </select>
      </div>
    </div>
  );
}

export default App;
