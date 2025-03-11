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
    <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

      {/* Theme Mode Component */}
      <div className="mb-6">
        <ThemeMode setTheme={setTheme} theme={theme} />
      </div>

      {/* Timer Settings Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Timer Settings</h3>
        
        {/* Focus Time Component */}
        <CustomTime />
        
        {/* Break Time Component */}
        <BreakTimeSettings />
        
        {/* Notification Settings Component */}
        <NotificationSystem 
          enabled={notificationsEnabled} 
          setEnabled={setNotificationsEnabled} 
        />
      </div>
    </div>
  );
};

export default Settings;