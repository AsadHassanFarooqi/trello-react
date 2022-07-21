import React from "react";
import card from "../stylesheets/card.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Card = ({ cardTitle, cardDesc, cardOnClick, draggable, onDragStart, cardStyles, onDragEnter }) => {
    const movingStyles = [card.wrapper, card.moving].join(' ');
  return (
    <div className={cardStyles ? movingStyles : card.wrapper} onClick={cardOnClick} draggable={draggable} onDragStart={onDragStart} onDragEnter={onDragEnter}>
      <p className={card.title}>{cardTitle}</p>
      <div className={card.footer}>
        {cardDesc && (
          <span className={card.badge}>
            <FontAwesomeIcon icon={faBars} />
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
