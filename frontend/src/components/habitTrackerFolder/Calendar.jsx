/* eslint-disable react/prop-types */
import { CalendarHeadLine } from "./CalendarHeadLine";
import { Day } from "./Day";

export function Calendar({ dates, handleActionChange, showEditAction ,setShowEditAction, fetchDates}) {
  return (
    <div id="habitTrackerMainContent">
      <CalendarHeadLine />
      {dates.map((day, index) => (
        <Day 
          day={day} 
          key={index} 
          handleActionChange={handleActionChange} 
          showEditAction={showEditAction}
          setShowEditAction={setShowEditAction}
          fetchDates={fetchDates}
          />
      ))}
    </div>
  );
}
