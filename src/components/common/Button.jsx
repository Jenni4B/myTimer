import React from "react";

const Button = ({ isRunning, isPaused, onStart, onPause, onResume }) => {
  const getButtonClasses = () => {
    if (!isRunning) return "bg-green-500 hover:bg-green-600"; // Start
    if (isPaused) return "bg-blue-500 hover:bg-blue-600"; // Resume
    return "bg-red-500 hover:bg-red-600"; // Pause
  };

  return (
    <button
      className={`px-4 py-2 rounded-md text-white font-semibold transition duration-300 ${getButtonClasses()}`}
      onClick={() => {
        if (!isRunning) {
          onStart();
        } else if (isPaused) {
          onResume();
        } else {
          onPause();
        }
      }}
    >
      {isRunning ? (isPaused ? "Resume" : "Pause") : "Start"}
    </button>
  );
};

export default Button;
