import ErrorBoundary from "../common/ErrorBoundary";
import StreakCounter from "./StreakCounter";
import ToggleChart from "./charts/toggleChart";
import useTimer from "../hooks/useTimer";

const Progress = () => {
  const { completedSessions, sessionStreak } = useTimer();


  return (
    <div className="progress-container">
      <ErrorBoundary>
        <h2 className="text-2xl font-bold">Your Progress</h2>

        {/* Streak Counter */}
        <div className="sessionTracker">
          <StreakCounter 
            completedSessions={completedSessions} 
            sessionStreak={sessionStreak} 
          />
        </div>

        {/* Focus Progress & Chart */}
        <div className="chart-container">
          <h2 className="text-xl font-bold">Focus Progress</h2>
          <ToggleChart/>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Progress;