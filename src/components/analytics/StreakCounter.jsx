const StreakCounter = ({ completedSessions, sessionStreak }) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Session Tracker</h2>
      <p className="text-lg">Completed Sessions: {completedSessions}</p>
      <p className="text-lg">Current Streak: {sessionStreak} 🔥</p>
    </div>
  );
};

export default StreakCounter;