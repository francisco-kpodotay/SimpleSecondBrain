import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

export function AddAction({ doClose }) {
  const [title, setTitle] = useState("Add Action");
  const [text, setText] = useState("");
  const [date, setDate] = useState( Date.now());

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/day/${publicId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(text)
      });

      if (!response.ok) {
        console.error('Login failed');
        setTitle('Login failed. Try again!')
        return;
      }

      const userData = await response.json();
      localStorage.setItem("publicId", JSON.stringify(userData.publicId))
      setTitle('Logged in successfully')
      console.log('Logged in successfully:', userData);

    } catch (error) {
      console.error('Error logging in:', error);
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
