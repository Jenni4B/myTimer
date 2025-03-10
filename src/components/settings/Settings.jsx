import ThemeMode from "../hooks/themeMode";
import CustomTime from "./customTime";
import BreakTimeSettings from "./BreakTimeSettings";

const Settings = ({ setTheme, theme }) => {
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
      </div>
    </div>
  );
};

export default Settings;