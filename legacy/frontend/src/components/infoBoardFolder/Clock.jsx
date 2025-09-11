import { useState, useEffect } from "react";
import { daysList } from "../other/lists";

export function Clock() {
  const days = daysList();
  let time = new Date().toLocaleTimeString();
  const [ctime, setTime] = useState(time);
  const [day, setDay] = useState("");
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);

  useEffect(() => {
    const now = new Date();
    setDay(days[now.getDay()]);
  }, []);

  return (
    <div id="infoPanel">
      <div id="clockContainer">
        <h1 id="clockTime" >{ctime}</h1>
        <p id="clockText" >
          <strong>{day}</strong>
        </p>
      </div>
    </div>
  );
}
