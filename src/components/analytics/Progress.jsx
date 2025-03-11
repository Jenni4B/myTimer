import ErrorBoundary from "../common/ErrorBoundary";
import StreakCounter from "./StreakCounter";

const Progress = () => {
  const sessionsCompleted = 10;

  return (
    <div>
        <h2>Your Profile</h2>
        <ErrorBoundary>

            <div className="progressBox">
            <h2>Progress</h2>
            <StreakCounter sessionsCompleted={sessionsCompleted} />
            </div>

        </ErrorBoundary>
    </div>
  );
};

export default Progress;
