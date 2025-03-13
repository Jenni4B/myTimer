const ProgressBar = ({ totalSeconds, initialSeconds, timerType }) => {
  // Calculate percentage complete (now filling up instead of decreasing)
  const percentComplete = ((initialSeconds - totalSeconds) / initialSeconds) * 100;
  
  // Determine color based on timer type
  const getBarColor = () => {
    return timerType === "focus" 
      ? "bg-amber-500" // Solid color for focus sessions
      : "bg-teal-500";  // Solid color for break sessions
  };

  return (
    <div className="w-full bg-gray-700 h-1 mb-4 relative">
      <div 
        className={`h-full transition-all duration-1000 ease-linear ${getBarColor()}`}
        style={{ width: `${percentComplete}%` }}
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full shadow-md"></div>
      </div>
    </div>
  );
};

export default ProgressBar;