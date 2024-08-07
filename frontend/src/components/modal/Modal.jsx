import "./modalStyle.css";
import { Login } from "./Login";
import { Register } from "./Register";
import { UpdateUser } from "./UpdateUser";
import { FaWindowClose } from "react-icons/fa";

export function Modal({ doClose }) {
  return (
    <div id="modal-bg">
      <div id="modal">
        <div onClick={doClose}>
          <FaWindowClose />
        </div>
        <Register />
        <Login />
        <UpdateUser />
      </div>
    </div>
  );
}
