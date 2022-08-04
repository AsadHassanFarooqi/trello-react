import React from "react";
import Modal from "../../Modal/Modal";
import Editable from "../../Editable/Editable";

import "./CardInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faHeading, faList } from "@fortawesome/free-solid-svg-icons";

function CardInfo(props) {
  return (
    <Modal onClose={() => props.onClose()}>
      <button className="cardinfo_box_close" onClick={() => props.onClose()}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_body">
            <div className="cardinfo_box_title">
              <FontAwesomeIcon icon={faHeading} />
              <p>Title</p>
            </div>
            <div className="cardinfo_box_editable_container">
              <Editable
                defaultValue="Title"
                placeholder="Enter title"
                text={"Hello there"}
              />
            </div>
            <div className="cardinfo_box_title">
              <FontAwesomeIcon icon={faList} />
              <p>Description</p>
            </div>
            <div className="cardinfo_box_editable_container">
              <Editable
                defaultValue="Description"
                placeholder="Enter Description"
                text={"Your description here..."}
                isTextArea
              />
            </div>
          </div>
          <div className="cardinfo_box_sidebar"></div>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
