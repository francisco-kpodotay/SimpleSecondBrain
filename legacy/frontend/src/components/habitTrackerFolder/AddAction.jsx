import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

export function AddAction({ doClose }) {
  const [title, setTitle] = useState("Add Action");
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); 

  async function handleSubmit(e) {
    e.preventDefault();
    const storedPublicId = JSON.parse(localStorage.getItem("publicId"));
    if (!storedPublicId) return;

    try {
      const response = await fetch(`/api/day/${storedPublicId}?date=${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: text })
      });
      
      if (!response.ok) {
        console.error('Add failed');
        setTitle('Add action failed. Try again!');
        return;
      }

      const actionData = await response.json();
      setTitle('Add action successful');
      console.log('Action added successfully:', actionData);

      // Reset form fields after successful submission
      setText("");
      setDate(new Date().toISOString().slice(0, 10));

    } catch (error) {
      console.error('Add action error:', error);
      setTitle('Add action error. Try again!');
    }
  }

  return (
    <div id="modal-bg">
      <div id="modal">
        <div onClick={doClose}>
          <FaWindowClose />
        </div>
        <div>
          <h2>{title}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="text">Action: </label>
              <input
                type="text"
                id="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="date">Date: </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}
