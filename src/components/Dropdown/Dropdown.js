import React, { useEffect, useRef } from "react";
import './Dropdown.css';

function Dropdown(props) {
  const dropdownRef = useRef();

  const handleClick = (e) => {
    if (dropdownRef && dropdownRef.current?.contains(e.target) && props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div ref={dropdownRef} className="dropdown">
      {props.children}
    </div>
  );
}

export default Dropdown;
