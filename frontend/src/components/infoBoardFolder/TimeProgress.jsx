import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import {
  dayOfMonthCalculator,
  dayOfWeekCalculator,
  dayOfYearCalculator,
  lengthOfMonthCalculator,
  workTimeCalculator,
} from "../other/progressBarFillers";

export function TimeProgress({ workStartHour, workFinishHour }) {
  const yearInDays = 365;
  const weekInDays = 7;
  const [dayOfYear, setDayOfYear] = useState(null);
  const [dayOfMonth, setDayOfMonth] = useState(null);
  const [lenghtOfMonth, setLenghtOfMonth] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [workTimeProgress, setWorkTimeProgress] = useState(null);

  function percentageCalculator(part, whole) {
    const correctionNumber = 5; //for CSS
    let percentage = (part * 100) / whole;
    if (percentage >= 95) {
      percentage = percentage - correctionNumber;
    }
    return percentage;
  }

  function converTimeToHour(time) {
    const splitedTime = time.split(":");
    const result =
      Number(splitedTime[0]) +
      Number(splitedTime[1]) / 60 +
      Number(splitedTime[2]) / 60 / 60;

    return result;
  }

  useEffect(() => {
    setDayOfYear(dayOfYearCalculator());
    setDayOfMonth(dayOfMonthCalculator());
    setLenghtOfMonth(lengthOfMonthCalculator());
    setDayOfWeek(dayOfWeekCalculator());
  }, []);

  useEffect(() => {
    setWorkTimeProgress(
      workTimeCalculator(
        converTimeToHour(workStartHour),
        converTimeToHour(workFinishHour)
      )
    );
  }, [workStartHour, workFinishHour]);

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
              converTimeToHour(workFinishHour) - converTimeToHour(workStartHour)
            )}
          />
          <p>
            Work: {workTimeProgress}/{converTimeToHour(workFinishHour) - converTimeToHour(workStartHour)}
          </p>
        </div>
      </div>
    </>
  );
}
