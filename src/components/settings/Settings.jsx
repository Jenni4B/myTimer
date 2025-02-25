const Settings = ({ setTheme, theme }) => {
  const toggleTheme = () => {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
      <div className="settings-container">
          <h2>Settings</h2>
          <label>
              <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
              Dark Mode
          </label>
      </div>
  );
};

export default Settings;
