import { useState, useEffect, useCallback } from "react";
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

  // Load settings on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem("completedSessions");
    const savedStreak = localStorage.getItem("sessionStreak");
    
    if (savedSessions) setCompletedSessions(parseInt(savedSessions, 10));
    if (savedStreak) setSessionStreak(parseInt(savedStreak, 10));
    
    // Load the appropriate timer settings based on type
    loadTimerSettings(timerType);
  }, [timerType]);

  // Load timer settings whenever timer type changes
  useEffect(() => {
    loadTimerSettings(timerType);
    // Reset the timer if it's running
    if (isRunning) {
      setIsRunning(false);
      setIsPaused(false);
    }
  }, [isRunning, timerType]);

  // Function to load the appropriate timer settings
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

  const handleSessionComplete = useCallback(() => {
    // Only increment completed sessions for focus timers
    if (timerType === "focus") {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      setSessionStreak(sessionStreak + 1);
      
      // Store in localStorage
      localStorage.setItem("completedSessions", newCompletedSessions);
      localStorage.setItem("sessionStreak", sessionStreak + 1);

      // Unlock achievements
      if (newCompletedSessions === 1) unlockAchievement("1");
      if (sessionStreak + 1 === 3) unlockAchievement("2");
      if (newCompletedSessions === 10) unlockAchievement("3");
      if (newCompletedSessions === 25) unlockAchievement("4");
      if (newCompletedSessions * 25 >= 300) unlockAchievement("5");
    }
    
    // When a timer completes, suggest switching to the other type
    const nextType = timerType === "focus" ? "break" : "focus";
    
    // Show notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(`${timerType.charAt(0).toUpperCase() + timerType.slice(1)} timer completed!`, {
        body: `Time to switch to ${nextType} mode.`
      });
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
    
  }, [completedSessions, sessionStreak, timerType, unlockAchievement]);

  useEffect(() => {
    let timer;
    if (isRunning && !isPaused && totalSeconds > 0) {
      timer = setInterval(() => setTotalSeconds((prev) => prev - 1), 1000);
    } else if (totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      setIsPaused(false);
      handleSessionComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, isPaused, totalSeconds, handleSessionComplete]);

  const onStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const onPause = () => setIsPaused(true);
  const onResume = () => setIsPaused(false);
  
  const onReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    loadTimerSettings(timerType);
  };

  const handleTypeChange = (newType) => {
    if (isRunning && !isPaused) {
      if (window.confirm(`Are you sure you want to switch to ${newType} timer? Your current timer will be reset.`)) {
        setTimerType(newType);
      }
    } else {
      setTimerType(newType);
    }
  };

  // Get the appropriate timer color based on type
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