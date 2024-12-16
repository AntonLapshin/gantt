import "./App.css";
import { generateRandomItems } from "./generateRandomItems";
import { DAY, HOUR, TimeUnit } from "./components/Gantt/utils/getTimeSequence";
import { TimeDisplay } from "./components/Gantt/headless/TimeDisplay";
import { useGantt } from "./components/Gantt/headless/useGantt";
import { GanttItem } from "./components/Gantt/__Gantt";
import { Gantt } from "./components/Gantt/headless/Gantt";
import { TopHeader } from "./components/Gantt/headless/TopHeader";
import { LeftHeader } from "./components/Gantt/headless/LeftHeader";
import { Row } from "./components/Gantt/headless/Row";
import { getSubrows } from "./components/Gantt/utils/getSubrows";
import { Subrow } from "./components/Gantt/headless/Subrow";
import { Item } from "./components/Gantt/headless/Item";

const timeRange = {
  start: new Date().getTime() - 1 * DAY,
  end: new Date().getTime() + 10 * DAY,
};

export type Item = GanttItem & {
  value: string;
};

const items: Item[] = generateRandomItems(timeRange, 45);

function App() {
  const { ganttRef, canvasRef, apiRef, timeSequence, toPx } = useGantt({
    timeRange,
    timeUnit: TimeUnit.Day,
    leftHeaderWidth: 120,
  });

  const groupedByType = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <div style={{ height: "700px" }}>
      <Gantt
        ganttRef={ganttRef as any}
        canvasRef={canvasRef as any}
        leftHeaderWidth={120}
        topHeaderWidth={120}
        timeSequence={timeSequence}
        timeUnit={TimeUnit.Day}
        leftHeaderCount={Object.keys(groupedByType).length}
        toPx={toPx}
      >
        {timeSequence.map((time, x) => {
          return (
            <TopHeader key={time} time={time} x={x}>
              <div style={{ padding: "0.5rem 1rem" }}>
                <TimeDisplay time={time} />
              </div>
            </TopHeader>
          );
        })}
        {Object.keys(groupedByType).map((type, y) => {
          return (
            <LeftHeader key={type} y={y}>
              {type}
            </LeftHeader>
          );
        })}
        {Object.keys(groupedByType).map((type, y) => {
          const subrows = getSubrows(groupedByType[type]);
          return (
            <Row key={type} y={y}>
              {subrows.map((subrow, index) => {
                return (
                  <Subrow key={index}>
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
      </Gantt>
      <button onClick={() => apiRef.current?.scrollToNow()}>To Now</button>
    </div>
  );
}

export default App;
