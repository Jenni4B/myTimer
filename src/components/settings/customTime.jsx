import { useState, useEffect } from "react";

const CustomTime = ({ onTimeChange }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  // Load custom time from localStorage on mount
  useEffect(() => {
    const savedMinutes = localStorage.getItem("focusMinutes") || localStorage.getItem("customMinutes");
    const savedSeconds = localStorage.getItem("focusSeconds") || localStorage.getItem("customSeconds");

    if (savedMinutes) setMinutes(parseInt(savedMinutes, 10));
    if (savedSeconds) setSeconds(parseInt(savedSeconds, 10));
  }, []);

  // Save custom time to localStorage & notify parent
  const handleSave = () => {
    // Validate that the time isn't 0:00
    if (minutes === 0 && seconds === 0) {
      alert("Focus time cannot be 0:00. Please set a valid time.");
      return;
    }

    // Save to both old and new keys for backward compatibility
    localStorage.setItem("customMinutes", minutes);
    localStorage.setItem("customSeconds", seconds);
    localStorage.setItem("focusMinutes", minutes);
    localStorage.setItem("focusSeconds", seconds);
    
    if (onTimeChange) {
      onTimeChange(minutes, seconds);
    }
    
    alert("Focus time settings saved!");
  };

  return (
    <div className="customTime">
      <h3 className="text-xl font-semibold mb-3">Set Focus Time</h3>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <label className="w-24">Minutes:</label>
          <input
            type="number"
            min="0"
            max="60"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="ml-2 p-2 bg-gray-800 border border-gray-600 rounded"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24">Seconds:</label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            className="ml-2 p-2 bg-gray-800 border border-gray-600 rounded"
          />
        </div>

        <div>
          <button 
            onClick={handleSave}
            className="save-button bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Save Focus Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTime;