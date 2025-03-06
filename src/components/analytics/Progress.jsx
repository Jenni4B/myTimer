import ErrorBoundary from "../common/ErrorBoundary";

const Progress = () => {
  const sessionsCompleted = 10;

  return (
    <div>
        <h2>Your Profile</h2>
        <ErrorBoundary>
            <div className="progressBox">
            <h2>Progress</h2>

            <p>Sessions completed: {sessionsCompleted}</p>
            <p>Time spent: 10 hours</p>

            {/* Achievements Section */}
            <h2>Achievements</h2>
            </div>
        </ErrorBoundary>
    </div>
  );
};

export default Progress;
