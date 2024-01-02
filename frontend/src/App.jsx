import './App.css'
import { BGimage } from './components/BGimage'
import { HabitTracker } from './components/HabitTracker'
import { InfoBoard } from './components/InfoBoard'

function App() {

  return (
    <>
    <BGimage/>
    <div id="mainContainer">
    <InfoBoard/>
    <HabitTracker/>
    </div>
    </>
    //habit tracker, (headbar, lists, graph)
  )
}

export default App
