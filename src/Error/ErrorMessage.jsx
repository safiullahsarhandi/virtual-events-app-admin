import React, { useEffect } from "react";

import "./ErrorMessage.css";

export default function ErrorMessage({ children }) {
  return (
    <div className="error-message">
      <div id="loading-div-error" className="loading-error-boundry-message">
        <h1>500</h1>
        <h2>Unexpected Error</h2>
        <h2
          style={{
            transform: "rotate(140deg)",
          }}
        >
          <img src="assets/images/gears.gif" />
        </h2>
        <h2>{children}</h2>
      </div>
    </div>
  );
}
