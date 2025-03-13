import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useAchievements } from "./achievementsContext";
import showNotification from "../components/feedback/ShowNotification";


const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [timerType, setTimerType] = useState("focus"); // "focus" or "break"
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [initialSeconds, setInitialSeconds] = useState(25 * 60); // Added new state
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { unlockAchievement } = useAchievements();
  const didMount = useRef(false);

  // Load settings on first mount only
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      loadTimerSettings(timerType);
      
      // Load notification settings
      const savedNotificationSetting = localStorage.getItem("notificationsEnabled");
      if (savedNotificationSetting === "true")
        //  && 
        //   "Notification" in window && 
        //   Notification.permission === "granted") 
          {
        setNotificationsEnabled(true);
      } else {
        setNotificationsEnabled(false);
      }

      // Load completed sessions from localStorage
      const savedSessions = localStorage.getItem("completedSessions");
      if (savedSessions !== null) {
        setCompletedSessions(parseInt(savedSessions, 10));
      }
      
      // Load streak from localStorage
      const savedStreak = localStorage.getItem("sessionStreak");
      if (savedStreak !== null) {
        setSessionStreak(parseInt(savedStreak, 10));
      }
    }
  }, [timerType]);

  // Only reset timer when switching timer types (but not while running)
  useEffect(() => {
    if (!isRunning) {
      loadTimerSettings(timerType);
    }
  }, [timerType, isRunning]);

  // Function to load the appropriate timer settings
  const loadTimerSettings = (type) => {
    if (type === "focus") {
      const savedMinutes = localStorage.getItem("focusMinutes") || localStorage.getItem("customMinutes") || 25;
      const savedSeconds = localStorage.getItem("focusSeconds") || localStorage.getItem("customSeconds") || 0;
      const calculatedSeconds = parseInt(savedMinutes, 10) * 60 + parseInt(savedSeconds, 10);
      setTotalSeconds(calculatedSeconds);
      setInitialSeconds(calculatedSeconds); // Store the initial value
    } else if (type === "break") {
      const savedMinutes = localStorage.getItem("breakMinutes") || 5;
      const savedSeconds = localStorage.getItem("breakSeconds") || 0;
      const calculatedSeconds = parseInt(savedMinutes, 10) * 60 + parseInt(savedSeconds, 10);
      setTotalSeconds(calculatedSeconds);
      setInitialSeconds(calculatedSeconds); // Store the initial value
    }
  };

  // Handle session completion and automatically switch timers
  const handleSessionComplete = useCallback(() => {
    if (timerType === "focus") {
      unlockAchievement("1");
      setCompletedSessions(prev => {
        const newSessions = prev + 1;
        localStorage.setItem("completedSessions", newSessions);
        if (newSessions >= 10) unlockAchievement("3");
        if (newSessions >= 25) unlockAchievement("4");
        return newSessions;
      });

      setSessionStreak(prev => {
        const newStreak = prev + 1;
        localStorage.setItem("sessionStreak", newStreak);
        if (newStreak >= 3) unlockAchievement("2");
        return newStreak;
      });
    }

    if (notificationsEnabled && "Notification" in window && Notification.permission === "granted") {
        const title = timerType === "focus" ? "Focus Session Complete!" : "Break Time Over!";
        const message = timerType === "focus" ? "Time for a break!" : "Ready to focus again?";
        showNotification(title, message, true);
    }

    setTimerType(timerType === "focus" ? "break" : "focus");
    loadTimerSettings(timerType === "focus" ? "break" : "focus");
    setIsRunning(false);
    setIsPaused(false);
  }, [timerType, notificationsEnabled, unlockAchievement]);

  // Timer countdown logic
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

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => setIsPaused(true);
  const resumeTimer = () => setIsPaused(false);
  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    loadTimerSettings(timerType);
  };

  return (
    <TimerContext.Provider value={{ 
      timerType, setTimerType, totalSeconds, isRunning, isPaused, startTimer, 
      pauseTimer, resumeTimer, resetTimer, completedSessions, sessionStreak 
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export {TimerContext, TimerProvider};