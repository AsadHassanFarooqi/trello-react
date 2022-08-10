import React, { useState } from "react";

import Card from "../Cards/Card";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import "./Boards.css";

const Boards = (props) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}{" "}
          <span>{` ${
            props.board?.cards?.length > 0 ? props.board?.cards?.length : 0
          }`}</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setDropdown(true)}
        >
          <FontAwesomeIcon icon={faEllipsis} />
          {dropdown && (
            <Dropdown onClose={() => setDropdown(false)}>
              <div className="board_dropdown">
                <p onClick={() => props.removeBoard(props.board?.id)}>
                  Delete Board
                </p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            removeCard={props.removeCard}
            boardIndex={props.board?.id}
            handleDragEnter={props.handleDragEnter}
            handleDragEnd={props.handleDragEnd}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          placeholder="Enter card title..."
          text="Add Card"
          buttonText="Add Card"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
};

export default Boards;
