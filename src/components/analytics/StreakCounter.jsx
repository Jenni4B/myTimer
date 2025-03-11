import { useState, useEffect } from "react";

const StreakCounter = () => {
  const [completedSessions, setCompletedSessions] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);

  // Load session data from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem("completedSessions");
    const savedStreak = localStorage.getItem("sessionStreak");

    if (savedSessions !== null) {
      setCompletedSessions(parseInt(savedSessions, 10));
    }
    if (savedStreak !== null) {
      setSessionStreak(parseInt(savedStreak, 10));
    }
  }, []);

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Session Tracker</h2>
      <p className="text-lg">Completed Sessions: {completedSessions}</p>
      <p className="text-lg">Current Streak: {sessionStreak} 🔥</p>
    </div>
  );
};

export default StreakCounter;
