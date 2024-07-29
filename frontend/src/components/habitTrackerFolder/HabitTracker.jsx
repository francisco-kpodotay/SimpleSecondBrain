import { useEffect, useState } from "react";
import { monthsList } from "../other/lists";
import { Calendar } from "./Calendar";
import { WeekMonthSwitch } from "./WeekMonthSwitch";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MyChart from "./chart/MyChart";

export function HabitTracker() {
  const date = new Date();
  const months = monthsList();

  const [displayFormat, setDisplayFormat] = useState("week");
  const [filledDates, setFilledDates] = useState([]);

  function handleChangeDisplay() {
    setDisplayFormat((prevFormat) =>
      prevFormat === "week" ? "month" : "week"
    );
  }

  async function fetchDays(publicId, startDate, endDate) {
    try {
      const response = await fetch(
        `/api/day/${publicId}?start=${startDate}&end=${endDate}`
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      const days = await response.json();
      return days;
    } catch (error) {
      console.error("Error fetching days:", error);
      return [];
    }
  }

  function getWeekStartEndDates() {
    const currentDay = date.getDay();
    const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;
    const daysToSunday = currentDay === 0 ? 0 : 7 - currentDay;

    const monday = new Date(date);
    const sunday = new Date(date);

    monday.setDate(date.getDate() - daysToMonday);
    sunday.setDate(date.getDate() + daysToSunday);

    const weekDates = [];
    for (let i = 0; i <= 6; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().slice(0, 10));
    }
    return weekDates;
  }

  function getMonthDates() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get the first and last day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Ensure the first day is Monday
    const firstMonday = new Date(firstDayOfMonth);
    while (firstMonday.getDay() !== 1) {
      firstMonday.setDate(firstMonday.getDate() + 1);
    }

    // Ensure the last day is Sunday
    let firstSundayAfterLastDay = new Date(lastDayOfMonth);
    while (firstSundayAfterLastDay.getDay() !== 0) {
      firstSundayAfterLastDay.setDate(firstSundayAfterLastDay.getDate() + 1);
    }

    const monthDates = [];
    let currentDay = new Date(firstMonday);
    currentDay.setDate(currentDay.getDate() + 1);
    firstSundayAfterLastDay.setDate(firstSundayAfterLastDay.getDate() + 1);

    // Iterate over all the days from the first Monday to the first Sunday after the last day of the month
    while (currentDay <= firstSundayAfterLastDay) {
      console.log(currentDay);
      monthDates.push(currentDay.toISOString().slice(0, 10));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return monthDates;
  }

  function fillDaysWithActions(weekDays, fetchedDays) {
    const filledDays = weekDays.map((day, index) => {
      return fetchedDays[index]
        ? fetchedDays[index]
        : { date: day, actions: [] };
    });
    return filledDays;
  }

  async function fetchDates() {
    const storedPublicId = JSON.parse(localStorage.getItem("publicId"));
    if (!storedPublicId) return;

    let dates = [];
    if (displayFormat === "week") {
      dates = getWeekStartEndDates();
    }
    if (displayFormat === "month") {
      dates = getMonthDates();
    }

    const days = await fetchDays(
      storedPublicId,
      dates[0],
      dates[dates.length - 1]
    );

    const filledDates = fillDaysWithActions(dates, days);
    setFilledDates(filledDates);
  }

  async function putAction(dayId, action) {
    const storedPublicId = JSON.parse(localStorage.getItem("publicId"));

    try {
      const response = await fetch(
        `/api/day/${storedPublicId}/${dayId}/${action.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: action.id,
            name: action.name,
            complete: !action.complete,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      fetchDates();
      console.log("Update successful:", result);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  useEffect(() => {
    fetchDates();
  }, [displayFormat]);

  return (
    <>
      <div className="section">
        <div id="habitTrackerContainer">
          <div id="habitTrackerHeadBar">
            <div id="habitTrackerHeadBarLine">
              <h2 id="habitTrackerTitle">Habit Tracker</h2>
              <WeekMonthSwitch
                displayFormath={displayFormat}
                changeDisplay={handleChangeDisplay}
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
          <Calendar
            isWeekView={displayFormat}
            dates={filledDates}
            handleActionChange={putAction}
          />
        </div>
      </div>
      <div className="section">
        <MyChart dates={filledDates} />
      </div>
    </>
  );
}
