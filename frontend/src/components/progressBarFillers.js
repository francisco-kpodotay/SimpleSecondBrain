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
  let day = date.getDate();
  return day;
}

export function lengthOfMonthCalculator() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const numDays = new Date(year, month, 0).getDate();
  return numDays;
}

export function dayOfWeekCalculator() {
  const date = new Date();
  let day = date.getDay();
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
  if (workTimeProgress > workTimeLength) {
    return workTimeLength.toFixed(2);
  }
  return workTimeProgress.toFixed(2);
}
