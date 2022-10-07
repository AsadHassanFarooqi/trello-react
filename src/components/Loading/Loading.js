import React from "react";
import "./Loading.css";

const Loading = (props) => {
  return (
    <div className={`loading__wrapper ${props.show ? "d-flex" : ''}`}>
      <div class="loadingio-spinner-bean-eater-s8vdwqifnh">
        <div class="ldio-5isgbi6pj0p">
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
