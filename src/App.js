import React, { useState } from "react";

// components Import
import Header from "./components/Header";
import Col from "./components/Col";
import Main from "./components/Main";
import Modal from "./components/Modal";
import styles from "./index.module.css";

// static data imports
import data from "./data/data";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowRestore, faList } from "@fortawesome/free-solid-svg-icons";

function App() {
  const saveBtnStyles = [styles.btn, styles.save].join(" ");
  const cancelBtnStyles = [styles.btn, styles.cancel].join(" ");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const [modalData, setModalData] = useState({
    cardData: "",
    title: "",
    desc: ""
  });
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState("");

  const handleModalOpen = (cardData, title, descriptionUpdate) => {
    setModalData({
      cardData: cardData,
      title: title,
      desc: descriptionUpdate
    });
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setInputOpen(false);
    // setInputValue("");
  };

  const showInput = () => {
    setInputOpen(true);
  };

  const handleTextareaValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleValue = () => {
    setDescription(inputValue);
    setInputOpen(false);
    modalData.desc(inputValue);
  };

  const handleCancelEvent = () => {
    setInputOpen(false);
    setInputValue("");
  };

  let switchStatment;
  if (description && !inputOpen) {
    switchStatment = (
      <button className={styles.detailedDesc} onClick={showInput}>
        {description}
      </button>
    );
  } else if (!inputOpen) {
    switchStatment = (
      <button className={styles.detailDescription} onClick={showInput}>
        Add a more detailed description…
      </button>
    );
  } else {
    switchStatment = (
      <div className={styles.textareawrapper}>
        <textarea
          placeholder="😀 Say it with an emoji, just type ':'"
          onChange={handleTextareaValue}
          value={inputValue}
          rows="12"
          autoFocus
        />
        <button className={saveBtnStyles} onClick={handleValue}>
          Save
        </button>
        <button className={cancelBtnStyles} onClick={handleCancelEvent}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="App">
    <Main />
      <Modal show={modalIsOpen} onClose={handleModalClose}>
        <div className={styles.modalWrapper}>
          <React.Fragment>
            <h2 className={styles.modalHeader}>
              <FontAwesomeIcon icon={faWindowRestore} />
              &nbsp;&nbsp;
              {modalData.cardData.title}
            </h2>
          </React.Fragment>
          <span className={styles.modalState}>in list {modalData.title}</span>
        </div>
        <div className={styles.modalBodyWrapper}>
          <div className={styles.modalBody}>
            <h5 className={styles.descriptionWrapper}>
              <FontAwesomeIcon icon={faList} />
              &nbsp;&nbsp; Description
            </h5>
            {switchStatment}
          </div>
          <div className={styles.modalSidebar}></div>
        </div>
      </Modal>
      <Header />
      <div className={styles.columnWrapper}>
        {data.map((item, itemIndex) => (
          <Col
            key={item.id.toString()}
            title={item.title}
            handleModalOpen={handleModalOpen}
            description={description}
            columnName={item.title}
            itemIndex={itemIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
