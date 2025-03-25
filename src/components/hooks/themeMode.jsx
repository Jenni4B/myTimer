import { useEffect } from "react";

const ThemeMode = ({ setTheme, theme }) => {
  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, [setTheme]); // Runs when `setTheme` changes

  return (
    <div className="themeMode-container">
      <h3>Theme Mode</h3>
      <label>
        <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
        Midnight Mode
      </label>
    </div>
  );
};

export default ThemeMode;
