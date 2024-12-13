import './App.css';
import { generateRandomItems } from './components/Gantt/utils/generateRandomItems'
import { Gantt, GanttItem } from './components/Gantt/Gantt'
import { DAY, HOUR, TimeUnit } from './components/Gantt/utils/getTimeSequence'

const timeRange = { start: new Date().getTime() - 1 * DAY, end: new Date().getTime() + 1 * DAY }

const items: GanttItem[] = generateRandomItems(timeRange, 3)

function App() {
  return (
    <div style={{ width: '100%', height: '700px'}}>
      <Gantt timeRange={timeRange} items={items} timeUnit={TimeUnit.Day} colWidth={120} />
    </div>
  )
}

export default App
