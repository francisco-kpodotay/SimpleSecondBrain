import { useState } from "react";
import "./WeekMonthSwitch.css"
import { FaCalendarAlt } from "react-icons/fa";

export function WeekMonthSwitch({displayFormath,changeDisplay}) {



  return (
    <div className="containerWeekMonth">
      <label className="switchWeekMonth">
        <input type="checkbox" />
        <span className="sliderWeekMonth" onClick={changeDisplay}>
          <span className="titleWeekMonth" >{displayFormath}</span>
          <span className="ballWeekMonth">
            <span className="iconWeekMonth">
            <FaCalendarAlt size={20}/>             
            </span>
          </span>
        </span>
      </label>
    </div>
  );
  
}
