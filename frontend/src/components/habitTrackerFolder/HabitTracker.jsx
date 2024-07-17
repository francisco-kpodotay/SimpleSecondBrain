import { useState } from "react";
import { monthsList } from "../other/lists";
import { Calendar } from "./Calendar";
import { WeekMonthSwitch } from "./WeekMonthSwitch";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MyChart from "./chart/MyChart";

export function HabitTracker() {
  const date = new Date();
  const months = monthsList();

  const [displayFormath, setDisplayFormath] = useState("week");

  function handleDisplay() {
    displayFormath === "week"
      ? setDisplayFormath("month")
      : setDisplayFormath("week");
  }

  return (
    <div className="section">
      <div id="habitTrackerContainer">
        <div id="habitTrackerHeadBar">
          <div id="habitTrackerHeadBarLine">
            <h2 id="habitTrackerTitle">Habit Tracker</h2>
            <WeekMonthSwitch
              displayFormath={displayFormath}
              doHandleDisplay={handleDisplay}
            />
          </div>
          <div id="habitTrackerHeadBarLine">
            <div id="habitTrackerDateTitle">
              <strong>
                {months[date.getMonth()]} {date.getFullYear()}
              </strong>
            </div>
            <div id="habitTrackerDateSwitcher">
              <FaChevronLeft />
              <FaChevronRight onClick={() => console.log("hellllo")} />
            </div>
          </div>
        </div>
        <Calendar isWeekView={displayFormath} />
      </div>
      <MyChart/>
    </div>
  );
}
