import ErrorBoundary from "../common/ErrorBoundary";
import StreakCounter from "./StreakCounter";
import { useTimer } from "../../context/TimerContext";

const Progress = () => {
  const { completedSessions, sessionStreak } = useTimer();

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      <ErrorBoundary>
        <div className="progressBox">
          <StreakCounter 
            completedSessions={completedSessions} 
            sessionStreak={sessionStreak} 
          />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Progress;