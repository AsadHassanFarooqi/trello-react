import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="container">
      <h2 className="app_navbar">Trello App</h2>
      <button onClick={props.handleSave} className="btn-save">Save in database</button>
    </div>
  );
};

export default Header;
