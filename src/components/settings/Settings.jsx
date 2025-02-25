import { useEffect } from 'react';

const Settings = ({ setTheme, theme }) => {
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Store the correct new theme
      return newTheme; // Update state correctly
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, [setTheme]);

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
