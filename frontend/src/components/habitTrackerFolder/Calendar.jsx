/* eslint-disable react/prop-types */
import { CalendarHeadLine } from "./CalendarHeadLine";
import { Day } from "./Day";

export function Calendar({ isWeekView, dates, handleActionChange }) {
  return (
    <div id="habitTrackerMainContent">
      <CalendarHeadLine />
      {dates.map((day, index) => (
        <Day day={day} key={index} handleActionChange={handleActionChange} />
      ))}
    </div>
  );
}
