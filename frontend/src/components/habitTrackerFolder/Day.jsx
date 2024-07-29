import { useEffect, useState } from "react";
import Action from "./Action";

export function Day({ day, handleActionChange }) {
  const [progress, setProgress] = useState(0);

  // Calculate the completion percentage
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
          {day.actions.map((action, index) => (
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
