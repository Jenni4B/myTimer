import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from "./components/common/Card";
import Settings from './components/settings/Settings';

function App() {
    // ✅ Load saved theme from localStorage (default to 'light')
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        // ✅ Apply theme to <body> and save to localStorage
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <Router>
            <div className={`App ${theme}`}>
                <nav className="navbar">
                    <h1 id='headerTimeWise'>Time Wise</h1>
                    <ul>
                        <li><Link to="/">Timer</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Card />} />
                    <Route path="/settings" element={<Settings setTheme={setTheme} theme={theme} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
