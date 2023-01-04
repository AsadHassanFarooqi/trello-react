import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "./Toast.css";

const Toast = (props) => {
  const { position, show, onCloseToast } = props;

  return (
    <div
      className={`notification-container ${show ? "d-flex" : ""} ${position}`}
    >
      <button onClick={onCloseToast}>X</button>
      <div className="notification-image">
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <div>
        <p className="notification-title">Success</p>
        <p className="notification-message">Data saved successfully</p>
      </div>
    </div>
  );
};

export default Toast;
