import BreakTimeSettings from "./BreakTimeSettings";
import CustomTime from "./customTime";
import DataDownload from "../analytics/DownloadData";
import NotificationSystem from "../feedback/NotificationSystem";
import ThemeMode from "../hooks/themeMode";
import useTimer from "../hooks/useTimer";


const Settings = ({ setTheme, theme }) => {
  
  const { notificationsEnabled, setNotificationsEnabled } = useTimer();

  const wipeAllData = () => {
    if (window.confirm("Are you sure you want to delete ALL data? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-grid">
        {/* Left Column */}
        <div className="settings-column">
          <div className="settings-box">
            <ThemeMode setTheme={setTheme} theme={theme} />
          </div>
          <CustomTime />
          <DataDownload />
        </div>

        {/* Right Column */}
        <div className="settings-column">
          <BreakTimeSettings />
          <NotificationSystem enabled={notificationsEnabled} setEnabled={setNotificationsEnabled} />
          <div className="settings-box danger-zone">
            <h3>Danger Zone</h3>
            <button className="wipe-button" onClick={wipeAllData}>
              Wipe All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
