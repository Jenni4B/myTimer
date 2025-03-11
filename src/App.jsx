import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Card from "./components/common/Card";
import Settings from './components/settings/Settings';
import Progress from "./components/analytics/Progress";

import Achievements from "./components/achievements/achievements";
import { AchievementsProvider } from "./context/achievementsContext";

function App() {
    // Load saved theme from localStorage (default to 'light')
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        // Apply theme to <body> and save to localStorage
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <AchievementsProvider> {/* Wrap the app for achievements */}
            <Router>
                <div className={`App ${theme}`}>
                    <nav className="navbar">
                        <h2 id='headerTimeWise'>Time Wise</h2>
                        <ul>
                            <li><Link to="/">Timer</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li><Link to="/progress">Progress</Link></li>
                            <li><Link to="/achievements">Achievements</Link></li> {/* ✅ New Link */}
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={<Card />} />
                        <Route path="/settings" element={<Settings setTheme={setTheme} theme={theme} />} />
                        <Route path="/progress" element={<Progress />} />
                        <Route path="/achievements" element={<Achievements />} /> {/* ✅ New Route */}
                    </Routes>
                </div>
            </Router>
        </AchievementsProvider>
    );
}

export default App;
