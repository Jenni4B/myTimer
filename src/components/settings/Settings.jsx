import { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // If no preference, check system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    // Apply theme to the body
    document.body.classList.toggle('dark-mode', isDarkMode);
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <section className="settings-card">
      <h2>⚙️ Settings</h2>
      <div className="setting-item">
        <label htmlFor="theme-toggle">Theme:</label>
        <button 
          id="theme-toggle" 
          onClick={toggleTheme}
          className={`theme-toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
        >
          {isDarkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </section>
  );
};

export default Settings;