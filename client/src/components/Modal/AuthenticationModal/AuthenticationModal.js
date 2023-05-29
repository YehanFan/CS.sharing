import React, { useState } from "react";
import Modal from "react-modal";
import Register from "./Register/Register";
import Login from "./Login/Login";

function AuthenticationModal({ shouldShowLogin, ...rest }) {
  const [showLogin, setShowLogin] = useState(shouldShowLogin);
  const { onRequestClose } = rest;

  function handleShowLogin(e) {
    e.preventDefault()
    setShowLogin(!showLogin);
  }

  return (
    <Modal
      {...rest}
      aria={{
        labelledby: "heading",
        describedby: "description",
      }}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="ReactModal__Container">
        {showLogin ? (
          <Login
            handleShowLogin={handleShowLogin}
            onRequestClose={onRequestClose}

          />
        ) : (
          <Register
            handleShowLogin={handleShowLogin}
            onRequestClose={onRequestClose}
          />
        )}
      </div>
    </Modal>
  );
}

export default AuthenticationModal;
