import { useState, useEffect, useCallback } from "react";
import Button from "../common/Button";
import { useAchievements } from "../../context/AchievementsContext";
const TimerControls = () => {
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    const savedSessions = localStorage.getItem("completedSessions");
    const savedStreak = localStorage.getItem("sessionStreak");
    const savedMinutes = localStorage.getItem("customMinutes");
    const savedSeconds = localStorage.getItem("customSeconds");

    if (savedSessions) setCompletedSessions(parseInt(savedSessions, 10));
    if (savedStreak) setSessionStreak(parseInt(savedStreak, 10));
    
    // Load custom time if available
    const minutes = savedMinutes ? parseInt(savedMinutes, 10) : 25;
    const seconds = savedSeconds ? parseInt(savedSeconds, 10) : 0;
    setTotalSeconds(minutes * 60 + seconds);
  }, []);

  const handleSessionComplete = useCallback(() => {
    const newCompletedSessions = completedSessions + 1;
    setCompletedSessions(newCompletedSessions);
    setSessionStreak(sessionStreak + 1);

    // Unlock achievements
    if (newCompletedSessions === 1) unlockAchievement("1");
    if (sessionStreak + 1 === 3) unlockAchievement("2");
    if (newCompletedSessions === 10) unlockAchievement("3");
    if (newCompletedSessions === 25) unlockAchievement("4");
    if (newCompletedSessions * 25 >= 300) unlockAchievement("5");
  }, [completedSessions, sessionStreak, unlockAchievement]);

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
    
    const savedMinutes = localStorage.getItem("customMinutes") || 25;
    const savedSeconds = localStorage.getItem("customSeconds") || 0;
    setTotalSeconds(savedMinutes * 60 + savedSeconds);
    setSessionStreak(0); // Reset streak
  };

  return (
    <div className='timer-container'>
      <h2>
        {String(Math.floor(totalSeconds / 60)).padStart(2, "0")}:
        {String(totalSeconds % 60).padStart(2, "0")}
      </h2>

      <Button isRunning={isRunning} isPaused={isPaused} onStart={onStart} onPause={onPause} onResume={onResume} />

      <button className="controlButton" onClick={onReset} disabled={isRunning && !isPaused}>
        Reset
      </button>
    </div>
  );
};

export default TimerControls;
