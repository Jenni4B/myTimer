import React from "react";

const ProgressBar = ({ totalSeconds, initialSeconds, timerType }) => {
  // Calculate percentage complete
  const percentComplete = 100 - (totalSeconds / initialSeconds) * 100;
  
  // Determine color based on timer type
  const getBarColor = () => {
    return timerType === "focus" 
      ? "bg-amber-500" // Amber for focus sessions
      : "bg-teal-500"; // Teal for break sessions
  };

  return (
    <div className="w-full h-3 bg-gray-700 rounded-full my-3 overflow-hidden">
      <div 
        className={`h-full ${getBarColor()} transition-all duration-1000 ease-linear`}
        style={{ width: `${percentComplete}%` }}
        role="progressbar"
        aria-valuenow={percentComplete}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
};

export default ProgressBar;