// In src/components/timer/ProgressBar.jsx
import { useEffect, useState } from "react";

const ProgressBar = ({ totalSeconds, initialSeconds, timerType }) => {
  const [percentComplete, setPercentComplete] = useState(0);
  
  // Debug values
  console.log("ProgressBar values:", { totalSeconds, initialSeconds, timerType, percentComplete });
  
  // Update progress percentage when totalSeconds or initialSeconds change
  useEffect(() => {
    if (initialSeconds > 0) {
      const percent = 100 - (totalSeconds / initialSeconds) * 100;
      setPercentComplete(percent);
      console.log(`Calculated percent: ${percent}%`);
    } else {
      setPercentComplete(0);
    }
  }, [totalSeconds, initialSeconds]);
  
  // Determine color based on timer type
  const getBarColor = () => {
    return timerType === "focus" 
      ? "bg-amber-500" // Amber for focus sessions
      : "bg-teal-500"; // Teal for break sessions
  };

  // Force some minimum height and border to make sure it's visible
  return (
    <div className="w-full h-3 bg-gray-700 rounded-full my-3 overflow-hidden border border-white" style={{
      height: "12px", // Much taller progress bar
      border: "2px solid #ffffff", // White border to make it stand out
      boxShadow: "0 0 5px rgba(255,255,255,0.5)" // Glow effect
    }}
    >
      <div 
        className={`h-full ${getBarColor()} transition-all duration-1000 ease-linear`}
        style={{ 
          width: `${percentComplete}%`, 
          minHeight: '12px' // Force minimum height
        }}
        role="progressbar"
        aria-valuenow={percentComplete}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
};

export default ProgressBar;