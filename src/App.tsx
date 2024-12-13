import './App.css';
import { generateRandomItems } from './components/Gantt/utils/generateRandomItems'
import { Gantt, GanttApi, GanttItem } from './components/Gantt/Gantt'
import { DAY, HOUR, TimeUnit } from './components/Gantt/utils/getTimeSequence'
import { useRef } from 'react';

const timeRange = { start: new Date().getTime() - 7 * DAY, end: new Date().getTime() + 7 * DAY }

const items: GanttItem[] = generateRandomItems(timeRange, 15)

function App() {
  const controlRef = useRef<GanttApi | undefined>();

  return (
    <div style={{ width: '100%', height: '700px'}}>
      <Gantt controlRef={controlRef} timeRange={timeRange} items={items} timeUnit={TimeUnit.Day} colWidth={120} />
      <button onClick={() => (controlRef.current)?.scrollToNow()}>To Now</button>
    </div>
  )
}

export default App
