import React, { useRef, useEffect } from "react";
import styles from "../stylesheets/modal.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ children, show, onClose, backDropStyles, modalStyles }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(styles.visible);
    } else {
      modalRef.current.classList.remove(styles.visible);
    }
  }, [show]);
  return (
    <React.Fragment>
      <div ref={modalRef} style={backDropStyles} className={styles.modal}>
        <button onClick={onClose} className={styles.close_btn}>
          <FontAwesomeIcon icon={faTimes} size="1x" />
        </button>
        <div style={modalStyles} className={styles.modal__wrap}>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
