import { useState, useEffect } from "react";

const BreakTimeSettings = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  // Load break time settings from localStorage on mount
  useEffect(() => {
    const savedMinutes = localStorage.getItem("breakMinutes");
    const savedSeconds = localStorage.getItem("breakSeconds");

    if (savedMinutes) setMinutes(parseInt(savedMinutes, 10));
    if (savedSeconds) setSeconds(parseInt(savedSeconds, 10));
  }, []);

  // Save break time settings to localStorage
  const handleSave = () => {
    // Validate that the time isn't 0:00
    if (minutes === 0 && seconds === 0) {
      alert("Break time cannot be 0:00. Please set a valid time.");
      return;
    }

    localStorage.setItem("breakMinutes", minutes);
    localStorage.setItem("breakSeconds", seconds);
    alert("Break time settings saved!");
  };

  return (
    <div className="mt-6 p-4 border border-gray-700 rounded-lg">
      <h3 className="text-xl font-semibold mb-3">Set Break Time</h3>
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
        <button 
          onClick={handleSave}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Save Break Settings
        </button>
      </div>
    </div>
  );
};

export default BreakTimeSettings;