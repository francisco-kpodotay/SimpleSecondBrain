import { useEffect, useState } from "react";
import { monthsList } from "../other/lists";
import { Calendar } from "./Calendar";
import { WeekMonthSwitch } from "./WeekMonthSwitch";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MyChart from "./chart/MyChart";

export function HabitTracker() {
  const date = new Date();
  const months = monthsList();

  const [displayFormath, setDisplayFormath] = useState("week");
  const [publicId, setPublicId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleDisplay() {
    displayFormath === "week"
      ? setDisplayFormath("month")
      : setDisplayFormath("week");
  }

  async function fetchDays(publicId, startDate, endDate) {
    const respons = await fetch(
      `/api/day/${publicId}?start=${startDate}&end=${endDate}`
    );
    const days = await respons.json();
    console.log(days);
    return days;
  }

  function getWeekStartEndDates() {
    let currentDate = new Date();
    let currentDay = currentDate.getDay();
    let daysToMonday = currentDay === 0 ? 6 : currentDay - 1;
    let daysToSunday = currentDay === 0 ? 0 : 7 - currentDay;
    let monday = new Date(currentDate);
    let sunday = new Date(currentDate);

    monday.setDate(currentDate.getDate() - daysToMonday);
    sunday.setDate(currentDate.getDate() + daysToSunday);

    // Format the dates to "YYYY-MM-DD"
    let mondayFormatted = monday.toISOString().slice(0, 10);
    let sundayFormatted = sunday.toISOString().slice(0, 10);

    return {
      monday: mondayFormatted,
      sunday: sundayFormatted,
    };
  }

  useEffect(() => {
    const storedPublicId = JSON.parse(localStorage.getItem("publicId"));
    console.log(storedPublicId);
    if (!storedPublicId) return;
    setPublicId(storedPublicId);

    let weekDates = getWeekStartEndDates();
    setStartDate(weekDates.monday)
    setEndDate(weekDates.sunday)

    console.log(publicId);
    console.log(startDate);
    console.log(endDate);

    fetchDays(publicId, startDate, endDate)
  }, [publicId, startDate, endDate]);

  return (
    <>
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
      </div>
      <div className="section">
        <MyChart />
      </div>
    </>
  );
}
