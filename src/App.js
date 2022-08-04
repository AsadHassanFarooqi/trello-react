import React, { useState } from "react";
import "./App.css";

// components Import
import Header from "./components/Header/Header";
import Boards from "./components/Boards/Boards";
import Editable from "./components/Editable/Editable";

// static data imports
import data from "./data/data";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [boards, setBoards] = useState(data);
  const [target, setTarget] = useState({
    cid: "",
    bid: "",
  });

  const handleAddCard = (bid, title) => {
    const card = {
      id: uuidv4(),
      title: title,
      labels: [],
      description: "",
    };


    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    let tempBoard = [...boards];
    tempBoard[index].cards.push(card);
    setBoards(tempBoard);
  };

  const handleRemoveCard = (boardIndex, cardIndex) => {
    const index = boards.findIndex((item) => item.id === boardIndex);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cIndex = cards.findIndex((item) => item.id === cardIndex);
    if (cIndex < 0) return;

    cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const handleAddBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: uuidv4(),
        title: title,
        cards: [],
      },
    ]);
  };

  const handleRemoveBoard = (bid) => {
    const tempBoards = boards.filter((item) => item.id !== bid);
    setBoards(tempBoards);
  };

  const handleDragEnter = (cid, bid) => {
    setTarget({
      bid: bid,
      cid: cid,
    });
  };

  const handleDragEnd = (cid, bid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === target.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);
  };

  return (
    <div className="App">
      <Header />
      <div className="app_outer">
        <div className="app_boards">
          {boards.map((item) => (
            <Boards
              key={item.id}
              board={item}
              removeBoard={handleRemoveBoard}
              addCard={handleAddCard}
              removeCard={handleRemoveCard}
              handleDragEnter={handleDragEnter}
              handleDragEnd={handleDragEnd}
            />
          ))}
          <Editable
            displayClass="app_boards_add-board"
            editClass="app_boards_add-board_edit"
            placeholder="Enter Board Name"
            text="Add Board"
            buttonText="Add Board"
            onSubmit={handleAddBoard}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
