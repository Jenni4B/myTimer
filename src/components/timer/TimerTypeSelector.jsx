import React from "react";


const TimerTypeSelector = ({ activeType, onTypeChange }) => {
    return (
      <div className="timer-type-selector my-4">
        <div className="flex space-x-2 justify-center">
          <button
            className={`px-4 py-2 rounded-md font-semibold transition duration-300 ${
              activeType === "focus"
                ? "bg-amber-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => onTypeChange("focus")}
          >
            Focus
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold transition duration-300 ${
              activeType === "break"
                ? "bg-teal-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => onTypeChange("break")}
          >
            Break
          </button>
        </div>
      </div>
    );
  };
  
  export default TimerTypeSelector;