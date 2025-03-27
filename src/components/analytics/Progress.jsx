import ErrorBoundary from "../common/ErrorBoundary";
import StreakCounter from "./StreakCounter";
import ToggleChart from "./charts/toggleChart";
import useTimer from "../hooks/useTimer";
import { useTimeCollect } from "../../context/TimeCollectContext";

const Progress = () => {
  const { completedSessions, sessionStreak } = useTimer();
  const { dailyFocusTime } = useTimeCollect();

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
      <ErrorBoundary>
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>

        <div className="progressBox">
          <StreakCounter 
            completedSessions={completedSessions} 
            sessionStreak={sessionStreak} 
          />
        </div>

        <div className="flex justify-between">
          <h2>Focus Progress</h2>
          <ToggleChart dailyFocusData={dailyFocusTime}/>
        </div>
      </ErrorBoundary>
      
    </div>
  );
};

export default Progress;