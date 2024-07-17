/* eslint-disable react/prop-types */
import { datesOfWeek } from "../other/calendarCalculation";
import { CalendarHeadLine } from "./CalendarHeadLine";
import { Day } from "./Day";

export function Calendar(props) {
  const weekView = props.isWeekView;
  const datesOfWeekList = datesOfWeek();

  if (weekView) {
    return (
      <div id="habitTrackerMainContent">
        <CalendarHeadLine />
        {datesOfWeekList.map((date, index) => <Day date={date} key={index} />)}
      </div>
    );
  } else {
    return (
      <div id="habitTrackerMainContent">
        <CalendarHeadLine />
        Hónap
      </div>
    );
  }
}
