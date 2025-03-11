import ThemeMode from "../hooks/themeMode";
import CustomTime from "./customTime";
import BreakTimeSettings from "./BreakTimeSettings";
import NotificationSystem from "../feedback/NotificationSystem";
import { useState, useEffect } from "react";

const Settings = ({ setTheme, theme }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // Load notification settings from localStorage on mount
  useEffect(() => {
    const savedSetting = localStorage.getItem("notificationsEnabled");
    if (savedSetting !== null) {
      setNotificationsEnabled(savedSetting === "true");
    }
  }, []);
  
  // Save notification settings whenever they change
  useEffect(() => {
    localStorage.setItem("notificationsEnabled", notificationsEnabled);
  }, [notificationsEnabled]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Theme Mode Component */}
          <div className="p-4 border border-gray-700 rounded-lg">
            <ThemeMode setTheme={setTheme} theme={theme} />
          </div>

          {/* Focus Time Component */}
          <CustomTime />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Break Time Component */}
          <BreakTimeSettings />
          
          {/* Notification Settings Component */}
          <NotificationSystem 
            enabled={notificationsEnabled} 
            setEnabled={setNotificationsEnabled} 
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;