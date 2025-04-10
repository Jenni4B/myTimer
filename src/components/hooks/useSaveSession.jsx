// hooks/useSaveSession.js
import { useTimeCollect } from "./useTimeCollect";

export const useSaveSession = () => {
  const { sessionData, setSessionData, setDailyFocusTime } = useTimeCollect();

  const calculateDailyFocusTimes = (sessions) =>
    sessions.reduce((acc, { timestamp, duration }) => {
      const date = timestamp.split("T")[0];
      acc[date] = (acc[date] || 0) + duration;
      return acc;
    }, {});

  const saveSession = (duration) => {
    const session = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      duration: Math.floor(duration / 60000), // ms to mins
    };

    const updatedSessions = [...sessionData, session];
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
    setSessionData(updatedSessions);
    setDailyFocusTime(calculateDailyFocusTimes(updatedSessions));
  };

  return saveSession;
};
