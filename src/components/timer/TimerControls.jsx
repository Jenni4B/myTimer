import Button from "../common/Button";
import TimerTypeSelector from "./TimerTypeSelector";
import ProgressBar from "./ProgressBar";
import { useEffect, useRef } from "react";
import useTimer from "../hooks/useTimer";


const TimerControls = () => {
  const { 
    timerType, setTimerType, totalSeconds, isRunning, isPaused, 
    startTimer, pauseTimer, resumeTimer, resetTimer 
  } = useTimer();
  
  // Store the initial seconds for the progress bar
  const initialSeconds = useRef(totalSeconds);
  
  // Update initialSeconds when timer type changes or is reset
  useEffect(() => {
    if (!isRunning || isPaused) {
      initialSeconds.current = totalSeconds;
    }
  }, [timerType, totalSeconds, isRunning, isPaused]);

  const handleTypeChange = (newType) => {
    if (isRunning && !isPaused) {
      if (window.confirm(`Are you sure you want to switch to ${newType} timer? Your current timer will be reset.`)) {
        setTimerType(newType);
      }
    } else {
      setTimerType(newType);
    }
  };

  return (
    <div className="timer-container">
      <TimerTypeSelector activeType={timerType} onTypeChange={handleTypeChange} />

      <h2 className={`text-4xl font-bold mb-4 ${timerType === "focus" ? "text-amber-400" : "text-teal-400"}`}>
        {String(Math.floor(totalSeconds / 60)).padStart(2, "0")}:
        {String(totalSeconds % 60).padStart(2, "0")}
      </h2>

      {/* Add Progress Bar */}
      <ProgressBar 
        totalSeconds={totalSeconds} 
        initialSeconds={initialSeconds.current} 
        timerType={timerType} 
      />

      <div className="flex space-x-4 justify-center mb-4">
        <Button 
          isRunning={isRunning} 
          isPaused={isPaused} 
          onStart={startTimer} 
          onPause={pauseTimer} 
          onResume={resumeTimer} 
        />

        <button 
          className={`px-4 py-2 bg-gray-600 text-white font-semibold rounded-md transition duration-300 ${
            isRunning && !isPaused ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-500'
          }`}
          onClick={resetTimer} 
          disabled={isRunning && !isPaused}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerControls;