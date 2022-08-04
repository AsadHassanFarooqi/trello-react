import React, { useState } from "react";
import "./Editable.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Editable(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || "");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText("");
      props.onSubmit(inputText);
    }
    setIsEditable(false);
  };

  return (
    <div className="editable">
      {isEditable ? (
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ""}`}
          onSubmit={submission}
        >
          {props.isTextArea ? (
            <textarea
              rows="5"
              cols="8"
              value={inputText}
              placeholder={props.placeholder || props.text}
              onChange={(e) => setInputText(e.target.value)}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={inputText}
              placeholder={props.placeholder || props.text}
              onChange={(event) => setInputText(event.target.value)}
              autoFocus
            />
          )}
          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || "Add"}</button>
            <FontAwesomeIcon
              icon={faClose}
              onClick={() => setIsEditable(false)}
              className="closeIcon"
            />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${
            props.displayClass ? props.displayClass : ""
          }`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </div>
  );
}

export default Editable;
