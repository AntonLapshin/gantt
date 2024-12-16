import "./App.css";
import {
  DAY,
  TimeUnit,
  useGantt,
  useDraggableScroll,
  Gantt,
  Cell0,
  TopHeader,
  TimeDisplay,
  LeftHeader,
  getSubrows,
  Row,
  Subrow,
  Item,
  Cell,
  Timeline,
} from "./components/Gantt";
import { GanttItem } from "./components/Gantt/types";
import { generateRandomItems } from "./generateRandomItems";
import { useState } from "react";

const timeRange = {
  start: new Date().getTime() - 15 * DAY,
  end: new Date().getTime() + 15 * DAY,
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
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => apiRef.current?.scrollToNow()}>To Now</button>
        <div>
          <label>Choose time unit</label>
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
      <div style={{ overflow: "hidden" }}>
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
              style={{
                height: "100%",
                width: "2px",
                backgroundColor: "tomato",
              }}
            ></div>
          </Timeline>
        </Gantt>
      </div>
    </div>
  );
}

export default App;
