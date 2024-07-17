import "./App.css";
import { BGimage } from "./components/BGimage";
import { HabitTracker } from "./components/habitTrackerFolder/HabitTracker";
import { InfoBoard } from "./components/infoBoardFolder/InfoBoard";

function App() {
  return (
    <>
      <BGimage />
      <div id="mainContainer">
        <InfoBoard />
        <HabitTracker />
      </div>
    </>
  );
}

export default App;
