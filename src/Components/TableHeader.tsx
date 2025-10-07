import React from "react";
import Button from "./Button";

import favicon from "../assets/images/favicon.png";

export default function TableHeader() {
  return (
    <div>
      <div className="table-header-wrapper flex items-center justify-between border-b-gray-200 pt-5 pb-10">
        <div className="heading flex items-center">
          <img src={favicon} alt="site__icon" />
          <h2 className="font-bold text-lg ml-3">My tasks</h2>
        </div>
        <div className="options-buttons">
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
