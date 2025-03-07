import { useState } from "react";
import ThemeMode from "../hooks/themeMode";
import CustomTime from "./customTime";

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [customTime, setCustomTime] = useState({
    minutes: 25,
    seconds: 0,
  });

  // Function to handle time update
  const handleTimeChange = (minutes, seconds) => {
    setCustomTime({ minutes, seconds });
  };

  return (
    <div>
      <div className="settings-container">
        <h2>Settings</h2>

        {/* Theme Mode Component */}
        <ThemeMode setTheme={setTheme} theme={theme} />

        {/* Custom Time Component */}
        <CustomTime onTimeChange={handleTimeChange} />
      </div>
    </div>
  );
};

export default Settings;
