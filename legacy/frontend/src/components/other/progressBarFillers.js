export function dayOfYearCalculator() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
}

export function dayOfMonthCalculator() {
  const date = new Date();
  const day = date.getDate();
  return day;
}

export function lengthOfMonthCalculator(monthh="current") {
  const date = new Date();
  const year = date.getFullYear();
  let month;
  if (monthh === "current"){
    month = date.getMonth();
  }
  if (monthh === "last"){
    month = date.getMonth() - 1;
  }

  const numDays = new Date(year, month, 0).getDate();
  return numDays;
}

export function dayOfWeekCalculator() {
  const date = new Date();
  const day = date.getDay();
  if (day === 0) {
    return 7;
  }
  return day;
}

export function workTimeCalculator(startHour, finishHour) {
  const oneHourInMinutes = 60;
  const date = new Date();
  const currentHour = date.getHours();
  const currentMinutesInHour = date.getMinutes() / oneHourInMinutes;
  const currentTimeInHour = currentHour + currentMinutesInHour;
  const workTimeLength = finishHour - startHour;
  const workTimeProgress = currentTimeInHour - startHour;
  if (workTimeProgress <= 0) {
    return 0;
  }
  if (workTimeProgress > workTimeLength) {
    return workTimeLength.toFixed(2);
  }
  return workTimeProgress.toFixed(2);
}
