import { useEffect, useState } from "react";
import Action from "./Action";
import { FaPenSquare } from "react-icons/fa";
import { EditAction } from "./EditAction";

export function Day({
  day,
  handleActionChange,
  fetchDates
}) {
  const [progress, setProgress] = useState(0);
  const [showEditAction, setShowEditAction] = useState(false);

  function sortByComplition(a, b) {
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
      <div id="dayHeadbar">
        <div
          id="editIcon"
          onClick={() => {
            setShowEditAction(true);
          }}
        >
          <FaPenSquare size={22} />
        </div>
        {showEditAction && (
          <EditAction
            day={day}
            doClose={() => setShowEditAction(false)}
            sortByComplition={sortByComplition}
            fetchDates={fetchDates}
          />
        )}
        <p id="toDoListDay">{day.date}</p>
      </div>
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
