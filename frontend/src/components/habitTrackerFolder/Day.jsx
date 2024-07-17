import { useEffect, useState } from "react";
import { dayOfMonthCalculator } from "../other/progressBarFillers";

export function Day(props) {
  const date = props.date;

  useEffect(() => {
  }, []);

  return (
    <div id="dayContainer">
      <p id="toDoListDay">{date}</p>
      <div id="toDoListOut">
        <div id="toDoListIn">
          <p>
            <strong>Title</strong>
          </p>
          <p>month 8, year</p>
          <input type="checkbox" />
          <label>💦Skin Care Routine</label>
          <br></br>
          <input type="checkbox" />
          <label>🧘🏽‍♂️Meditation</label>
          <br></br>
          <input type="checkbox" />
          <label>📕Journaling</label>
          <br></br>
          <input type="checkbox" />
          <label>🏃🏽‍♂️Workout</label>
          <br></br>
          <input type="checkbox" />
          <label>📚Read</label>
          <br></br>
          <input type="checkbox" />
          <label>💻Work On My Skill</label>
          <br></br>
          <input type="checkbox" />
          <label>🍀Go Outside</label>
          <br></br>
          <input type="checkbox" />
          <label>👨🏿‍👩🏻‍👦🏽‍👦🏾Family Time</label>
          <br></br>
          <progress value={0.45}></progress>
        </div>
      </div>
    </div>
  );
}


