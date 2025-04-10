// STYYYYLES 💅🏼
// made these for easier access so I don't have to scroll through App.css like crazy
import './styles/app.css';
import './styles/buttons.css';
import './styles/focusHelp.css';
import './styles/navbar.css';
import './styles/progress.css';
import './styles/settings.css';
import './styles/theme.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import Card from "./components/common/Card";
import Progress from "./components/analytics/Progress";
import Settings from './components/settings/Settings';
import SelfCarePage from './components/selfCare/selfCarePage';
import FocusHelpPage from './components/focusVideos/focusHelpPage';

import Achievements from "./components/achievements/achievements";
import { AchievementsProvider } from "./context/achievementsContext";
import ErrorBoundary from './components/common/ErrorBoundary';

import { TimerProvider } from "./context/TimerContext";
import { TimeCollectProvider } from './context/TimeCollectContext';

function App() {
    // Load saved theme from localStorage (default to 'light')
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        // Apply theme to <body> and save to localStorage
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);
    return (
        // Wrapping everything in ErrorBoundary to catch errors in the app
        <ErrorBoundary>
            <AchievementsProvider>
                <TimerProvider>
                    <TimeCollectProvider>
                        <Router>
                            <div className={`App ${theme}`}>
                                <nav className="navbar">
                                    <h2 id='headerTimeWise'>Time Wise</h2>
                                    <ul>
                                        <li><Link to="/">Timer</Link></li>
                                        <li><Link to="/focusHelp">Focus Help</Link></li>
                                        <li><Link to="/selfCare">Self Care</Link></li>
                                        <li><Link to="/progress">Progress</Link></li>
                                        <li><Link to="/achievements">Achievements</Link></li>
                                        <li><Link to="/settings">Settings</Link></li>
                                    </ul>
                                </nav>

                                <Routes>
                                    <Route path="/" element={<Card />} />
                                    <Route path="/focusHelp" element={<FocusHelpPage />} />
                                    <Route path="/selfCare" element={<SelfCarePage />} />
                                    <Route path="/progress" element={<Progress />} />
                                    <Route path="/achievements" element={<Achievements />} />
                                    <Route path="/settings" element={<Settings setTheme={setTheme} theme={theme} />} />
                                </Routes>

                                <ToastContainer />
                            </div>
                        </Router>
                    </TimeCollectProvider>
                </TimerProvider>
            </AchievementsProvider>
        </ErrorBoundary>
    );
}

export default App;