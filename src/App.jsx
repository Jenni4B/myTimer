import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Card from "./components/common/Card";
import Settings from './components/settings/Settings';
import Progress from "./components/analytics/Progress";
import FocusHelpPage from './components/selfCare/focusHelp';

import Achievements from "./components/achievements/achievements";
import { AchievementsProvider } from "./context/achievementsContext";
import { TimerProvider } from "./context/TimerContext";

function App() {
    // Load saved theme from localStorage (default to 'light')
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        // Apply theme to <body> and save to localStorage
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <AchievementsProvider>
            <TimerProvider> {/* Add TimerProvider to wrap the app */}
                <Router>
                    <div className={`App ${theme}`}>
                        <nav className="navbar">
                            <h2 id='headerTimeWise'>Time Wise</h2>
                            <ul>
                                <li><Link to="/">Timer</Link></li>
                                <li><Link to="/settings">Settings</Link></li>
                                <li><Link to="/progress">Progress</Link></li>
                                <li><Link to="/achievements">Achievements</Link></li>
                                <li><Link to="/focushelp">Focus Help</Link></li>
                            </ul>
                        </nav>

                        <Routes>
                            <Route path="/" element={<Card />} />
                            <Route path="/settings" element={<Settings setTheme={setTheme} theme={theme} />} />
                            <Route path="/progress" element={<Progress />} />
                            <Route path="/achievements" element={<Achievements />} />
                            <Route path="/focushelp" element={<FocusHelpPage />} />
                        </Routes>
                        
                        {/* Add ToastContainer for notifications */}
                        <ToastContainer />
                    </div>
                </Router>
            </TimerProvider>
        </AchievementsProvider>
    );
}

export default App;