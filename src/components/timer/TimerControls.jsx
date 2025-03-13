import { useTimer } from "../../context/TimerContext";
import Button from "../common/Button";
import TimerTypeSelector from "./TimerTypeSelector";

const TimerControls = () => {
  const { 
    timerType, setTimerType, totalSeconds, isRunning, isPaused, 
    startTimer, pauseTimer, resumeTimer, resetTimer 
  } = useTimer();

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

      <div className="flex space-x-4 justify-center mb-4">
        <Button 
          isRunning={isRunning} 
          isPaused={isPaused} 
          onStart={startTimer} 
          onPause={pauseTimer} 
          onResume={resumeTimer} 
        />

        <button 
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md"
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
