// import calculateDailyStreak from "../../context/TimeCollectContext"

const StreakCounter = ({completedSessions}) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Session Tracker</h2>
      <p className="text-lg">Completed Sessions: {completedSessions}</p>
    </div>
  );
};

export default StreakCounter;

{/* <p className="text-lg">Current Streak: {sessionStreak} 🔥</p> */}