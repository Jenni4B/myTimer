import { useState, useEffect, useCallback, useRef } from "react";
import Button from "../common/Button";
import { useAchievements } from "../../context/AchievementsContext";
import TimerTypeSelector from "./TimerTypeSelector";

const TimerControls = () => {
  const [timerType, setTimerType] = useState("focus"); // "focus" or "break"
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const { unlockAchievement } = useAchievements();

  // 🔥 Prevent useEffect from running twice in React 18 Strict Mode
  const didMount = useRef(false);

  // ✅ Load settings on first mount only
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      loadTimerSettings(timerType);
    }
  }, []);

  // ✅ Only reset timer when switching timer types (but not while running)
  useEffect(() => {
    if (!isRunning) {
      loadTimerSettings(timerType);
    }
  }, [timerType]);

  // ✅ Function to load the appropriate timer settings
  const loadTimerSettings = (type) => {
    if (type === "focus") {
      const savedMinutes = localStorage.getItem("focusMinutes") || localStorage.getItem("customMinutes") || 25;
      const savedSeconds = localStorage.getItem("focusSeconds") || localStorage.getItem("customSeconds") || 0;
      setTotalSeconds(parseInt(savedMinutes, 10) * 60 + parseInt(savedSeconds, 10));
    } else if (type === "break") {
      const savedMinutes = localStorage.getItem("breakMinutes") || 5;
      const savedSeconds = localStorage.getItem("breakSeconds") || 0;
      setTotalSeconds(parseInt(savedMinutes, 10) * 60 + parseInt(savedSeconds, 10));
    }
  };

  // ✅ Handle session completion and automatically switch timers
  const handleSessionComplete = useCallback(() => {
    setCompletedSessions(prev => {
      const newSessions = prev + 1;
      localStorage.setItem("completedSessions", newSessions);
      return newSessions;
    });

    setSessionStreak(prev => {
      const newStreak = prev + 1;
      localStorage.setItem("sessionStreak", newStreak);
      return newStreak;
    });

    // 🔥 Automatically switch to the next timer type
    if (timerType === "focus") {
      setTimerType("break");
      loadTimerSettings("break");
    } else {
      setTimerType("focus");
      loadTimerSettings("focus");
    }

    setIsRunning(false);
    setIsPaused(false);
  }, [timerType]);

  // ✅ Timer countdown logic
  useEffect(() => {
    let timer;
    if (isRunning && !isPaused && totalSeconds > 0) {
      timer = setInterval(() => setTotalSeconds(prev => prev - 1), 1000);
    } else if (totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      setIsPaused(false);
      handleSessionComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, totalSeconds, handleSessionComplete]);

  // ✅ Start timer
  const onStart = () => {
    console.log("Before start:", isRunning); // Debugging log
    setIsRunning(true);
    setIsPaused(false);
    console.log("After start:", isRunning); // Debugging log
  };

  // ✅ Pause and resume functions
  const onPause = () => setIsPaused(true);
  const onResume = () => setIsPaused(false);

  // ✅ Reset the timer to the current timer type's default settings
  const onReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    loadTimerSettings(timerType);
  };

  // ✅ Handle switching between Focus & Break mode
  const handleTypeChange = (newType) => {
    if (isRunning && !isPaused) {
      if (window.confirm(`Are you sure you want to switch to ${newType} timer? Your current timer will be reset.`)) {
        setTimerType(newType);
      }
    } else {
      setTimerType(newType);
    }
  };

  // ✅ Determine the text color based on the timer type
  const getTimerColor = () => {
    return timerType === "focus" ? "text-amber-400" : "text-teal-400";
  };

  return (
    <div className="timer-container">
      <TimerTypeSelector activeType={timerType} onTypeChange={handleTypeChange} />
      
      <h2 className={`text-4xl font-bold mb-4 ${getTimerColor()}`}>
        {String(Math.floor(totalSeconds / 60)).padStart(2, "0")}:
        {String(totalSeconds % 60).padStart(2, "0")}
      </h2>
      
      <div className="flex space-x-4 justify-center mb-4">
        <Button 
          isRunning={isRunning} 
          isPaused={isPaused} 
          onStart={onStart} 
          onPause={onPause} 
          onResume={onResume} 
        />

        <button 
          className={`px-4 py-2 rounded-md text-white font-semibold bg-gray-600 hover:bg-gray-500 transition duration-300 ${isRunning && !isPaused ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onReset} 
          disabled={isRunning && !isPaused}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerControls;
