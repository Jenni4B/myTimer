import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { useAchievements } from "./achievementsContext";
import showNotification from "../components/feedback/ShowNotification";
import playSessionCompleteSound from "../components/hooks/sessionCompleteSound";
import { useSaveSession } from "../components/hooks/useSaveSession";

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  // === TIMER STATE ===
  const [timerType, setTimerType] = useState("focus"); // "focus" or "break"
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const { saveSession } = useSaveSession();



  // === TRACKING STATE ===
  const [completedSessions, setCompletedSessions] = useState(
    Number(localStorage.getItem("completedSessions")) || 0
  );
  const [sessionStreak, setSessionStreak] = useState(
    Number(localStorage.getItem("sessionStreak")) || 0
  );
  const [sessionData, setSessionData] = useState([]);
  const [dailyFocusTime, setDailyFocusTime] = useState({});

  // === NOTIFICATIONS ===
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem("notificationsEnabled") === "true"
  );

  const { unlockAchievement } = useAchievements();
  const sessionStartTime = useRef(null);

  // === HELPERS ===
  const calculateDailyFocusTimes = (sessions) =>
    sessions.reduce((acc, { timestamp, duration }) => {
      const date = timestamp.split("T")[0];
      acc[date] = (acc[date] || 0) + duration;
      return acc;
    }, {});

  const loadTimerSettings = useCallback((type) => {
    const minutesKey = type === "focus" ? "focusMinutes" : "breakMinutes";
    const secondsKey = type === "focus" ? "focusSeconds" : "breakSeconds";
    const defaultMinutes = type === "focus" ? 25 : 5;

    const minutes = Number(localStorage.getItem(minutesKey)) || defaultMinutes;
    const seconds = Number(localStorage.getItem(secondsKey)) || 0;
    const total = minutes * 60 + seconds;

    setTotalSeconds(total);
    setInitialSeconds(total);
  }, []);

  const loadSessionData = useCallback(() => {
    try {
      const storedSessions = JSON.parse(localStorage.getItem("sessions")) || [];
      setSessionData(storedSessions);
      setDailyFocusTime(calculateDailyFocusTimes(storedSessions));
    } catch (error) {
      console.error("Error loading session data:", error);
      setSessionData([]);
      setDailyFocusTime({});
    }
  }, []);

  // === EFFECTS ===

  // On mount: load session data + timer settings
  useEffect(() => {
    loadTimerSettings(timerType);
    loadSessionData();
  }, [loadTimerSettings, loadSessionData]);

  // When switching timer type
  useEffect(() => {
    if (!isRunning) loadTimerSettings(timerType);
  }, [timerType, isRunning, loadTimerSettings]);

  // Track when focus session starts
  useEffect(() => {
    if (
      isRunning &&
      !isPaused &&
      timerType === "focus" &&
      !sessionStartTime.current
    ) {
      sessionStartTime.current = Date.now();
    }
  }, [isRunning, isPaused, timerType]);

  // Cross-tab sync
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
  }, [loadSessionData]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning || isPaused || totalSeconds <= 0) return;
    const timer = setInterval(() => setTotalSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning, isPaused, totalSeconds]);

  // Timer ends
  useEffect(() => {
    if (totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      handleSessionComplete();
    }
  }, [totalSeconds, isRunning]);

  // === TIMER COMPLETE ===
  const handleSessionComplete = useCallback(() => {
    if (timerType === "focus") {
      unlockAchievement("1");

      const sessionDuration = sessionStartTime.current
        ? Date.now() - sessionStartTime.current
        : initialSeconds * 1000;

      // TODO: Integrate your useSaveSession hook here
      // saveSession(sessionDuration);

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
        timerType === "focus"
          ? "Focus Session Complete!"
          : "Break Time Over!",
        timerType === "focus"
          ? "Time for a break!"
          : "Ready to focus again?",
        true
      );
      playSessionCompleteSound();
    }

    const nextType = timerType === "focus" ? "break" : "focus";
    setTimerType(nextType);
    loadTimerSettings(nextType);
    setIsRunning(false);
    setIsPaused(false);
  }, [timerType, initialSeconds, unlockAchievement, notificationsEnabled, loadTimerSettings]);

  // === CONTROLS ===
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