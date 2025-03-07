import { useState, useEffect } from "react";

const CustomTime = ({ onTimeChange }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  // Load custom time from localStorage on mount
  useEffect(() => {
    const savedMinutes = localStorage.getItem("customMinutes");
    const savedSeconds = localStorage.getItem("customSeconds");

    if (savedMinutes) setMinutes(parseInt(savedMinutes, 10));
    if (savedSeconds) setSeconds(parseInt(savedSeconds, 10));
  }, []);

  // Save custom time to localStorage & notify parent
  const handleSave = () => {
    localStorage.setItem("customMinutes", minutes);
    localStorage.setItem("customSeconds", seconds);
    onTimeChange(minutes, seconds);
  };

  return (
    <div>
      <h3>Set Custom Pomodoro Time</h3>
      <div>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Seconds:
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
        </label>
      </div>
        <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default CustomTime;
