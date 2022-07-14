import React, { useState, useEffect } from "react";
import "./App.css";

// components Import
import Header from "./components/Header";
import Col from "./components/Col";
import Modal from "./components/Modal";
import styles from "./index.module.css";

// static data imports
import data from "./data/data";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowRestore, faList } from "@fortawesome/free-solid-svg-icons";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function App() {
  const saveBtnStyles = [styles.btn, styles.save].join(" ");
  const cancelBtnStyles = [styles.btn, styles.cancel].join(" ");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const [modalData, setModalData] = useState({
    cardData: "",
    title: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState("");

  const handleModalOpen = (cardData, title) => {
    setModalData({
      cardData: cardData,
      title: title,
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
    console.log("button worked");
  };

  const handleTextareaValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleValue = () => {
    setDescription(inputValue);
    setInputOpen(false);
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
      <div className="column-wrapper">
        {data.map((item) => (
          <Col
            key={item.id}
            title={item.title}
            handleModalOpen={handleModalOpen}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
