import { useEffect, useRef, useState } from "react";
import { monthsList } from "../other/lists";
import { Calendar } from "./Calendar";
import { WeekMonthSwitch } from "./WeekMonthSwitch";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import "./habitTracker.css";

import MyChart from "./chart/MyChart";
import { AddAction } from "./AddAction";

export function HabitTracker() {
  const currentDate = new Date();
  const months = monthsList();

  const [showAddAction, setShowAddAction] = useState(false);
  const [displayFormat, setDisplayFormat] = useState("week");
  const [filledDates, setFilledDates] = useState([]);
  const [weekDate, setWeekDate] = useState(currentDate);
  const [monthDate, setMonthDate] = useState(currentDate);

  const weekCorrectionNumber = useRef(0);
  const monthCorrectionNumber = useRef(0);

  function handleChangeDisplay() {
    if (displayFormat === "week") {
      setDisplayFormat("month");
      setWeekDate(currentDate);
    }
    if (displayFormat === "month") {
      setDisplayFormat("week");
      setMonthDate(currentDate);
    }
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
    const currentDay = weekDate.getDay();
    const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;
    const daysToSunday = currentDay === 0 ? 0 : 7 - currentDay;
    
    const monday = new Date(weekDate);
    const sunday = new Date(weekDate);

    monday.setDate(weekDate.getDate() - daysToMonday);
    sunday.setDate(weekDate.getDate() + daysToSunday);

    const weekDates = [];
    for (let i = 0; i <= 6; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().slice(0, 10));
    }
    return weekDates;
  }

  function getMonthDates() {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Find the first Monday before or on the first day of the month
    const firstMonday = new Date(firstDayOfMonth);
    while (firstMonday.getDay() !== 1) {
      firstMonday.setDate(firstMonday.getDate() - 1);
    }

    // Find the first Sunday after the last day of the month
    let firstSundayAfterLastDay = new Date(lastDayOfMonth);
    while (firstSundayAfterLastDay.getDay() !== 0) {
      firstSundayAfterLastDay.setDate(firstSundayAfterLastDay.getDate() + 1);
    }

    const monthDates = [];
    let currentDay = new Date(firstMonday);

    currentDay.setDate(currentDay.getDate() + 1);
    firstSundayAfterLastDay.setDate(firstSundayAfterLastDay.getDate() + 1);

    while (currentDay <= firstSundayAfterLastDay) {
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
    if (!storedPublicId) return;

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

  function handlePreviousButton() {
    if (displayFormat === "week") {
      weekCorrectionNumber.current -= 7;
      const newWeekDate = new Date();
      newWeekDate.setDate(currentDate.getDate() + weekCorrectionNumber.current);
      setWeekDate(newWeekDate);
    } else if (displayFormat === "month") {
      monthCorrectionNumber.current -= 1;
      const newMonthDate = new Date();
      newMonthDate.setMonth(
        currentDate.getMonth() + monthCorrectionNumber.current
      );
      setMonthDate(newMonthDate);
    }
  }

  function handleNextButton() {
    if (displayFormat === "week") {
      weekCorrectionNumber.current += 7;
      const newWeekDate = new Date();
      newWeekDate.setDate(currentDate.getDate() + weekCorrectionNumber.current);
      setWeekDate(newWeekDate);
    } else if (displayFormat === "month") {
      monthCorrectionNumber.current += 1;
      const newMonthDate = new Date();
      newMonthDate.setMonth(
        currentDate.getMonth() + monthCorrectionNumber.current
      );
      setMonthDate(newMonthDate);
    }
  }

  useEffect(() => {
    fetchDates();
  }, [displayFormat, showAddAction, weekDate, monthDate]);

  return (
    <>
      <div className="section">
        <div id="habitTrackerContainer">
          <div id="habitTrackerHeadBar">
            <div id="habitTrackerHeadBarLine">
              <h2 id="habitTrackerTitle">
                Habit Tracker - {months[currentDate.getMonth()]}{" "}
                {currentDate.getFullYear()}
              </h2>
              <WeekMonthSwitch
                displayFormath={displayFormat}
                changeDisplay={handleChangeDisplay}
              />
            </div>
            <div id="habitTrackerHeadBarLine">
              <div id="habitTrackerDateTitle">
                <div id="plus-icon" onClick={() => setShowAddAction(true)}>
                  <FaCirclePlus size={23} />
                </div>
                {showAddAction && (
                  <AddAction doClose={() => setShowAddAction(false)} />
                )}
              </div>
              <div id="arrow-icon">
                <FaChevronLeft
                  size={21}
                  onClick={() => handlePreviousButton()}
                />
                <FaChevronRight size={21} onClick={() => handleNextButton()} />
              </div>
            </div>
          </div>
          <Calendar
            dates={filledDates}
            handleActionChange={putAction}
            fetchDates={fetchDates}
          />
        </div>
      </div>
      <div className="section">
        <MyChart dates={filledDates} />
      </div>
    </>
  );
}
