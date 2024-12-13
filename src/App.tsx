import "./App.css";
import { generateRandomItems } from "./generateRandomItems";
import { Gantt, GanttApi, GanttItem } from "./components/Gantt/Gantt";
import { DAY, HOUR, TimeUnit } from "./components/Gantt/utils/getTimeSequence";
import { useRef } from "react";

const timeRange = {
  start: new Date().getTime() - 1 * DAY,
  end: new Date().getTime() + 1 * DAY,
};

export type Item = GanttItem & {
  value: string;
};

const items: Item[] = generateRandomItems(timeRange, 45);

type ItemComponentProps = {
  item: Item;
};

const ItemComponent = ({ item }: ItemComponentProps) => {
  return <div className="item">{item.value}</div>;
};

function App() {
  const controlRef = useRef<GanttApi | undefined>();

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <Gantt
        controlRef={controlRef}
        timeRange={timeRange}
        items={items}
        timeUnit={TimeUnit.Day}
        colWidth={120}
        ItemComponent={ItemComponent}
      />
      <button onClick={() => controlRef.current?.scrollToNow()}>To Now</button>
    </div>
  );
}

export default App;
