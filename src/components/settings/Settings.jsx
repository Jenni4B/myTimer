import ThemeMode from "../hooks/themeMode";
import CustomTime from "./customTime";
import BreakTimeSettings from "./BreakTimeSettings";
import NotificationSystem from "../feedback/NotificationSystem";
import { useState, useEffect } from "react";

const Settings = ({ setTheme, theme }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // ✅ Load notification settings from localStorage on mount
  useEffect(() => {
    const savedSetting = localStorage.getItem("notificationsEnabled");
    if (savedSetting !== null) {
      setNotificationsEnabled(savedSetting === "true");
    }
  }, []);
  
  // ✅ Save notification settings whenever they change
  useEffect(() => {
    localStorage.setItem("notificationsEnabled", notificationsEnabled);
  }, [notificationsEnabled]);

  // ✅ Function to wipe all data
  const wipeAllData = () => {
    if (window.confirm("Are you sure you want to delete ALL data? This cannot be undone.")) {
      localStorage.clear(); // 🔥 Wipes EVERYTHING in localStorage
      window.location.reload(); // 🔄 Refresh the page for a clean reset
    }
  };

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

          {/* Wipe All Data Button */}
          <div className="p-4 border border-gray-700 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Danger Zone</h3>
            <button 
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition duration-300"
              onClick={wipeAllData}
            >
              Wipe All Data
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Settings;
