import React from "react";

export default function Tabs({ tabs, selected, setSelected }) {
  return (
    <ul className="nav nav-pills" id="pills-tab" role="tablist">
      {tabs?.map((tab, index) => (
        <li
          className="nav-item"
          role="presentation"
          onClick={() => {
            setSelected(index);
          }}
        >
          <a
            className={`nav-link ${selected === index ? "active" : ""}`}
            role="tab"
          >
            {tab}
          </a>
        </li>
      ))}
    </ul>
  );
}
