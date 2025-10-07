import React, { useState } from "react";

export default function Button({ onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="cursor-pointer p-[12px] duration-300 ease-in-out bg-green-400 hover:bg-green-500 text-white text-[12px] w-[100%]"
      >
        ADD TO DO
      </button>
    </div>
  );
}
