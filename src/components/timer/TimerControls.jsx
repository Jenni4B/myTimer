import { useState, useEffect } from "react";
import Button from "../common/Button";

const TimerControls = () => {
  const [customMinutes, setCustomMinutes] = useState(25);
  const [customSeconds, setCustomSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && !isPaused && totalSeconds > 0) {
      timer = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    } else if (totalSeconds === 0) {
      setIsRunning(false);
      setIsPaused(false);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, totalSeconds]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const onStart = () => {
    setTotalSeconds(customMinutes * 60 + customSeconds);
    setIsRunning(true);
    setIsPaused(false);
  };

  const onPause = () => setIsPaused(true);

  const onResume = () => setIsPaused(false);

  const onReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTotalSeconds(customMinutes * 60 + customSeconds);
  };

  const handleCustomMinutesChange = (e) => {
    const newMinutes = Math.max(0, Number(e.target.value));
    setCustomMinutes(newMinutes);
    setTotalSeconds(newMinutes * 60 + customSeconds);
  };

  const handleCustomSecondsChange = (e) => {
    const newSeconds = Math.max(0, Math.min(59, Number(e.target.value)));
    setCustomSeconds(newSeconds);
    setTotalSeconds(customMinutes * 60 + newSeconds);
  };

  return (
    <div className="timer-container">
      <h2>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="number"
          value={customMinutes}
          onChange={handleCustomMinutesChange}
          disabled={isRunning}
          placeholder="Minutes"
        />
        <input
          type="number"
          max="59"
          value={customSeconds}
          onChange={handleCustomSecondsChange}
          disabled={isRunning}
          placeholder="Seconds"
        />
      </div>

      {/* Use the new Button component */}
      <Button
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={onStart}
        onPause={onPause}
        onResume={onResume}
      />

      <button className="controlButton" onClick={onReset} disabled={isRunning}>
        Reset
      </button>
    </div>
  );
};

export default TimerControls;
