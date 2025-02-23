import { useState, useEffect } from "react";

const TimerControls = () => {
  const [customTime, setCustomTime] = useState(25); // User-defined time (default: 25 minutes)
  const [totalSeconds, setTotalSeconds] = useState(25 * 60); // Total seconds for timer
  const [isRunning, setIsRunning] = useState(false); // Timer running state

  // the countdown logic
  useEffect(() => {
    let timer;
    if (isRunning && totalSeconds > 0) {
      timer = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);  // Decrement by 1 second
      }, 1000);
    } else if (totalSeconds === 0) {
      setIsRunning(false); // Auto-stop when timer hits 0
      clearInterval(timer);
    }
    return () => clearInterval(timer); // cleans up on unmount
  }, [isRunning, totalSeconds]);

  // totalSeconds → mm:ss for display
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // start timer
  const onStart = () => {
    if (!isRunning) {
      setTotalSeconds(customTime * 60); // Set based on user-defined customTime
      setIsRunning(true);
    }
  };

  // stop timer
  const onStop = () => setIsRunning(false);

  // reset timer
  const onReset = () => {
    setIsRunning(false);
    setTotalSeconds(customTime * 60); // resets to either the default or user-defined time if changed
  };

  // Handle custom time input change
  const handleCustomTimeChange = (e) => {
    const newTime = Math.max(0, Number(e.target.value));
    setCustomTime(newTime);
    setTotalSeconds(newTime * 60);
  };

  return (
    <div className="timer-container">
      <h2>
        ⏲ {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h2>

      {/* Custom Time Input */}
      <input
        type="number"
        value={customTime}
        onChange={handleCustomTimeChange} // Updates both customTime & totalSeconds
        disabled={isRunning} // Disable while timer is running
      />

      {/* Control Buttons */}
      <button className="controlButton" onClick={onStart} disabled={isRunning}>
        Start
      </button>
      <button className="controlButton" onClick={onStop} disabled={!isRunning}>
        Stop
      </button>
      <button className="controlButton" onClick={onReset} disabled={isRunning}>
        Reset
      </button>
    </div>
  );
};

export default TimerControls;
