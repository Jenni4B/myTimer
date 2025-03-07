import useThemeMode from "../hooks/themeMode";
import CustomTime from "./customTime";
import { useState } from "react";

const Settings = ({ setCustomTime }) => {
  const { theme, toggleTheme } = useThemeMode();
  
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      
      {/* Dark Mode Toggle */}
      <label>
        <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
        Dark Mode
      </label>

      {/* Custom Time Input */}
      <CustomTime setCustomTime={setCustomTime} />
    </div>
  );
};

export default Settings;
