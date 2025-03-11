import ErrorBoundary from "../common/ErrorBoundary";
import StreakCounter from "./StreakCounter";

const Progress = () => {
  const sessionsCompleted = 10;

  return (
    <div>
        <ErrorBoundary>

            <div className="progressBox">
            <StreakCounter sessionsCompleted={sessionsCompleted} />
            </div>

        </ErrorBoundary>
    </div>
  );
};

export default Progress;
