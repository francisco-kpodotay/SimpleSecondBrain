import {
  dayOfMonthCalculator,
  dayOfWeekCalculator,
  lengthOfMonthCalculator,
} from "./progressBarFillers.js";

export function datesOfWeek() {
  const lengthOfMonth = lengthOfMonthCalculator();
  const lengthOfLastMonth = lengthOfMonthCalculator("last");
  const lengthOfWeek = 7;
  const dayOfMonth = dayOfMonthCalculator();
  const dayOfWeek = dayOfWeekCalculator();
  let datesOfMonth = [];
  let datesOfWeek = [];

  //dates of last month
  for (let i = lengthOfLastMonth - 6; i <= lengthOfLastMonth; i++) {
    datesOfMonth.push(i);
  }
  //dates of current month
  for (let k = 1; k <= lengthOfMonth; k++) {
    datesOfMonth.push(k);
  }
  //dates of next month
  for (let j = 1; j <= 7; j++) {
    datesOfMonth.push(j);
  }
  for (let p = 7; p < datesOfMonth.length; p++) {
    if (datesOfMonth[p] >= dayOfMonth - dayOfWeek + 1) {
      datesOfWeek.push(datesOfMonth[p]);
    }
  }
  datesOfWeek.length = lengthOfWeek;
  return datesOfWeek;
}
