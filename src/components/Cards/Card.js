import React, { useState } from "react";

import Chip from "../Chip/Chip";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "./CardInfo/CardInfo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import "./Card.css";

const Card = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const handleDropdown = (e) => {
    e.stopPropagation();
    setDropdown(prevState => !prevState);
  }

  return (
    <>
      {showModal && (
        <CardInfo
          card={props.card}
          onClose={() => setShowModal(false)}
          updateCard={props.updateCard}
          boardIndex={props.boardIndex}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnter={() =>
          props.handleDragEnter(props.card?.id, props.boardIndex)
        }
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardIndex)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {props.card?.labels?.map((item, index) => (
              <Chip text={item.text} color={item.color} key={index} />
            ))}
          </div>
          <div className="card_top_more" onClick={(e) => handleDropdown(e)}>
            <FontAwesomeIcon icon={faEllipsis} />
            {dropdown && (
              <Dropdown onClose={() => setDropdown(false)}>
                <div className="card_dropdown">
                  <p
                    onClick={() =>
                      props.removeCard(props.boardIndex, props.card?.id)
                    }
                  >
                    Delete Card
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{props.card?.title}</div>
        <div className="card_footer">
          {props.card.description && (
            <FontAwesomeIcon icon={faMessage} className="card_footer_icon" />
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
