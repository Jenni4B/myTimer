import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useAchievements } from "./achievementsContext";
import showNotification from "../components/feedback/ShowNotification";
import playSessionCompleteSound from "../components/hooks/sessionCompleteSound";

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  // Timer states
  const [timerType, setTimerType] = useState("focus"); // "focus" or "break"
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Progress tracking
  const [completedSessions, setCompletedSessions] = useState(
    Number(localStorage.getItem("completedSessions")) || 0
  );
  const [sessionStreak, setSessionStreak] = useState(
    Number(localStorage.getItem("sessionStreak")) || 0
  );
  const [sessionData, setSessionData] = useState([]);
  const [dailyFocusTime, setDailyFocusTime] = useState({});

  // Notifications
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem("notificationsEnabled") === "true"
  );

  const { unlockAchievement } = useAchievements();
  const sessionStartTime = useRef(null);

  /* ----------------- Load & Save Data ----------------- */

  // Load timer settings (focus/break durations)
  const loadTimerSettings = (type) => {
    const minutesKey = type === "focus" ? "focusMinutes" : "breakMinutes";
    const secondsKey = type === "focus" ? "focusSeconds" : "breakSeconds";
    const defaultMinutes = type === "focus" ? 25 : 5;
    
    const minutes = Number(localStorage.getItem(minutesKey)) || defaultMinutes;
    const seconds = Number(localStorage.getItem(secondsKey)) || 0;
    const total = minutes * 60 + seconds;

    setTotalSeconds(total);
    setInitialSeconds(total);
  };

  // Load session data from localStorage
  const loadSessionData = () => {
    try {
      const storedSessions = JSON.parse(localStorage.getItem("sessions")) || [];
      setSessionData(storedSessions);
      setDailyFocusTime(calculateDailyFocusTimes(storedSessions));
    } catch (error) {
      console.error("Error loading session data:", error);
      setSessionData([]);
      setDailyFocusTime({});
    }
  };

  // Calculate daily focus times from session history
  const calculateDailyFocusTimes = (sessions) =>
    sessions.reduce((acc, { timestamp, duration }) => {
      const date = timestamp.split("T")[0];
      acc[date] = (acc[date] || 0) + duration;
      return acc;
    }, {});

  // Save a completed session
  const saveSession = (duration) => {
    const session = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      duration: Math.floor(duration / 60000), // Convert ms to minutes
    };

    const updatedSessions = [...sessionData, session];
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
    setSessionData(updatedSessions);
    setDailyFocusTime(calculateDailyFocusTimes(updatedSessions));
  };

  /* ----------------- Effects ----------------- */

  // Load timer settings & session data on mount
  useEffect(() => {
    loadTimerSettings(timerType);
    loadSessionData();
  }, []);

  // Sync timer settings when switching between focus/break modes
  useEffect(() => {
    if (!isRunning) loadTimerSettings(timerType);
  }, [timerType, isRunning]);

  // Track session start time for focus sessions
  useEffect(() => {
    if (isRunning && !isPaused && timerType === "focus" && !sessionStartTime.current) {
      sessionStartTime.current = Date.now();
    }
  }, [isRunning, isPaused, timerType]);

  // Listen for localStorage changes (cross-tab syncing)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "notificationsEnabled") {
        setNotificationsEnabled(e.newValue === "true");
      } else if (e.key === "sessions") {
        loadSessionData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /* ----------------- Timer Logic ----------------- */

  useEffect(() => {
    if (!isRunning || isPaused || totalSeconds <= 0) return;

    const timer = setInterval(() => setTotalSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning, isPaused, totalSeconds]);

  useEffect(() => {
    if (totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      handleSessionComplete();
    }
  }, [totalSeconds, isRunning]);

  const handleSessionComplete = useCallback(() => {
    if (timerType === "focus") {
      unlockAchievement("1");

      const sessionDuration = sessionStartTime.current
        ? Date.now() - sessionStartTime.current
        : initialSeconds * 1000; // Fallback if start time is missing

      saveSession(sessionDuration);
      sessionStartTime.current = null;

      setCompletedSessions((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("completedSessions", newCount);
        if (newCount >= 10) unlockAchievement("3");
        if (newCount >= 25) unlockAchievement("4");
        return newCount;
      });

      setSessionStreak((prev) => {
        const newStreak = prev + 1;
        localStorage.setItem("sessionStreak", newStreak);
        if (newStreak >= 3) unlockAchievement("2");
        return newStreak;
      });
    }

    if (notificationsEnabled && Notification.permission === "granted") {
      showNotification(
        timerType === "focus" ? "Focus Session Complete!" : "Break Time Over!",
        timerType === "focus" ? "Time for a break!" : "Ready to focus again?",
        true
      );
      playSessionCompleteSound();
    }

    setTimerType(timerType === "focus" ? "break" : "focus");
    loadTimerSettings(timerType === "focus" ? "break" : "focus");
    setIsRunning(false);
    setIsPaused(false);
  });

  /* ----------------- Controls ----------------- */

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    if (timerType === "focus") sessionStartTime.current = Date.now();
  };

  const pauseTimer = () => setIsPaused(true);
  const resumeTimer = () => setIsPaused(false);
  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    loadTimerSettings(timerType);
    sessionStartTime.current = null;
  };

  return (
    <TimerContext.Provider
      value={{
        timerType,
        setTimerType,
        totalSeconds,
        initialSeconds,
        isRunning,
        isPaused,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        completedSessions,
        sessionStreak,
        notificationsEnabled,
        setNotificationsEnabled,
        sessionData,
        dailyFocusTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };