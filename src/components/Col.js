import React, { useState, useRef } from "react";
import col from "../stylesheets/columns.module.css";

import Card from "./Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuidv4 } from "uuid";

const Col = ({ title, handleModalOpen, itemIndex, description }) => {
  const [cards, setCards] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [showAddCard, setShowAddCard] = useState(true);
  const [actionItems, setActionItems] = useState(false);
  const [dragged, setDragged] = useState(false);

  // Dragging references
  const draggedItem = useRef();
  const draggedNode = useRef();

  const handleAddCard = (cardData) => {
    setCards([
      ...cards,
      {
        id: uuidv4(),
        title: cardData,
        description: "",
        labels: [],
        assignedUsers: "",
      },
    ]);
    setShowAddCard(true);
    setIsInputOpen(false);
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleCardCreate = (e) => {
    if (inputValue <= 0) {
      alert("Please enter title for card...");
    } else {
      handleAddCard(inputValue);
      setInputValue("");
      setActionItems(false);
      return;
    }
  };

  const handleUpdate = (desc) => {
    console.log(description);
    console.log(cards);
  };

  const handleAddCardClick = () => {
    setIsInputOpen(true);
    setShowAddCard(false);
    setActionItems(true);
  };

  const discardCardItem = () => {
    setIsInputOpen(false);
    setShowAddCard(true);
    setActionItems(false);
    setInputValue("");
  };

  const handleDragStart = (e, params) => {
    console.log("dragging started...", params);
    draggedItem.current = params;
    draggedNode.current = e.target;
    draggedNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragged(true);
    }, 0);
  };

  const handleDragEnd = () => {
    console.log("Drag ended...");
    setDragged(false);
    draggedNode.current.removeEventListener("dragend", handleDragEnd);
    draggedItem.current = null;
    draggedNode.current = null;
  };

  const handleDragging = (e, params) => {
      console.log('Dragging....', params);
      const currentItem = draggedItem.current;
      if (draggedItem.current !== e.target) {
        console.log('Target is NOT the same as dragged item')
        setCards(oldList => {
            let newList = JSON.parse(JSON.stringify(oldList))
            newList[params.itemIndex].cards.splice(params.cardIndex, 0, newList[currentItem.itemIndex].items.splice(currentItem.cardIndex,1)[0]);
            // console.log(newList[params.itemIndex]);
            draggedItem.current = params;
            return newList
        })
    }
  }

  const getStyles = (props) => {
    const currentItem = draggedItem.current;
    if (
      currentItem.itemIndex === props.itemIndex &&
      currentItem.cardIndex === props.cardIndex
    ) {
      return "card.wrapper card.moving";
    }
  };

  return (
    <div className={col.columns}>
      <h6 className={col.columnHeader}>{title}</h6>
      <div className={col.cardsWrapper}>
        {cards.map((card, cardIndex) => (
          <Card
            cardTitle={card.title}
            cardDes={card.description}
            cardOnClick={() => handleModalOpen(card, title, handleUpdate)}
            onDragStart={(e) => handleDragStart(e, { itemIndex, cardIndex })}
            draggable
            cardStyles={dragged ? getStyles({ itemIndex, cardIndex }) : ""}
            onDragEnter={dragged ? (e) => handleDragging(e, {itemIndex, cardIndex}) : null}
          />
        ))}
      </div>
      {isInputOpen && (
        <input
          onChange={handleInputValue}
          // onKeyDown={handleCardCreate}
          placeholder="Enter a title for this card..."
          className={col.addCardInput}
          value={inputValue}
          autoFocus
        />
      )}
      {showAddCard && (
        <div className={col.columnFooter}>
          <button className={col.addCard} onClick={handleAddCardClick}>
            <FontAwesomeIcon icon={faPlus} size="xs" />
            &nbsp; Add a card
          </button>
        </div>
      )}
      {actionItems && (
        <div className={col.actionItemsWrapper}>
          <button className={col.removeCardItem} onClick={discardCardItem}>
            <FontAwesomeIcon icon={faBan} size="lg" />
          </button>
          <button className={col.addCardItem} onClick={handleCardCreate}>
            <FontAwesomeIcon icon={faCheck} size="2x" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Col;
