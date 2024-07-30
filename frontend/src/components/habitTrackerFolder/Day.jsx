import { useEffect, useState } from "react";
import Action from "./Action";

export function Day({ day, handleActionChange }) {
  const [progress, setProgress] = useState(0);

  function sortByComplition(a,b){
    if (a.complete === b.complete) {
      return 0; // No change in order if both are the same
    } else if (a.complete && !b.complete) {
      return 1; // Completed actions move down the list
    } else {
      return -1; // Incomplete actions move up the list
    }
  }

  useEffect(() => {
    const totalActions = day.actions.length;
    const completedActions = day.actions.filter(
      (action) => action.complete
    ).length;
    const progressPercentage = totalActions
      ? (completedActions / totalActions) * 100
      : 0;
    setProgress(progressPercentage);
  }, []);

  return (
    <div id="dayContainer">
      <p id="toDoListDay">{day.date}</p>
      <div id="toDoListOut">
        <div id="toDoListIn">
          {day.actions.sort(sortByComplition).map((action, index) => (
            <Action
              title={action.name}
              complete={action.complete}
              handleChange={() => handleActionChange(day.id, action)}
              key={index}
            />
          ))}
          {day.actions.length > 0 ? (
            <progress value={progress} max={100}></progress>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
