import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import {
  dayOfMonthCalculator,
  dayOfWeekCalculator,
  dayOfYearCalculator,
  lengthOfMonthCalculator,
  workTimeCalculator,
} from "./progressBarFillers";

export function TimeProgress() {
  const yearInDays = 365;
  const weekInDays = 7;
  const [dayOfYear, setDayOfYear] = useState(null);
  const [dayOfMonth, setDayOfMonth] = useState(null);
  const [lenghtOfMonth, setLenghtOfMonth] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [workStartHour, setWorkStartHour] = useState(9);
  const [workFinishHour, setWorkFinishHour] = useState(15);
  const [workTimeProgress, setWorkTimeProgress] = useState(null);

  function percentageCalculator(part, whole) {
    console.log(part, whole);
    const correctionNumber = 2;
    //for CSS
    let percentage = (part * 100) / whole;
    if (percentage >= 95) {
      percentage = percentage - correctionNumber;
      console.log("correctid");
    }
    return percentage;
  }

  useEffect(() => {
    setDayOfYear(dayOfYearCalculator());
    setDayOfMonth(dayOfMonthCalculator());
    setLenghtOfMonth(lengthOfMonthCalculator());
    setDayOfWeek(dayOfWeekCalculator());
    setWorkTimeProgress(workTimeCalculator(workStartHour, workFinishHour));
  }, []);

  return (
    <>
      <div id="infoPanel">
        <div id="progressBarContainer">
          <ProgressBar
            completed={percentageCalculator(dayOfYear, yearInDays)}
          />
          <p>Year: {dayOfYear}/365</p>
          <ProgressBar
            completed={percentageCalculator(dayOfMonth, lenghtOfMonth)}
          />
          <p>
            Month: {dayOfMonth}/{lenghtOfMonth}
          </p>
          <ProgressBar
            completed={percentageCalculator(dayOfWeek, weekInDays)}
          />
          <p>Week: {dayOfWeek}/7</p>
          <ProgressBar
            completed={percentageCalculator(
              workTimeProgress,
              workFinishHour - workStartHour
            )}
          />
          <p>
            Work: {workTimeProgress}/{workFinishHour - workStartHour}
          </p>
        </div>
      </div>
    </>
  );
}
