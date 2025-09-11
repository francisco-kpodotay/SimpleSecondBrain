import { FaWindowClose } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useState } from "react";

export function EditAction({ doClose, day, sortByComplition,fetchDates }) {
  const [title, setTitle] = useState("Delete Action");
console.log(day);

  async function handleDelete(date, actionId) {
    const storedPublicId = JSON.parse(localStorage.getItem("publicId"));
    if (!storedPublicId) return;

    try {
      const response = await fetch(
        `/api/day/${storedPublicId}/${date}/${actionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Delete failed");
        setTitle("Delete action failed.");
        return;
      }

      setTitle("Delete action successful.");
      console.log("Action deleted successfully.");
      fetchDates()
    } catch (error) {
      console.error("Delete action error: ", error);
      setTitle("Delete action error. Try again!");
    }
  }


  return (
    <div id="modal-bg">
      <div id="modal">
        <div onClick={doClose}>
          <FaWindowClose />
        </div>
        <h2>{title}</h2>
        {day.actions.sort(sortByComplition).map((action, index) => (
          <div id="editActionLine" key={index}>
            <p>{action.name}</p>
            <div onClick={()=>handleDelete(day.date, action.id)}>
              <ImBin />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
