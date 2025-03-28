import { createContext, useContext, useState, useEffect } from 'react';

const TimeCollectContext = createContext();

export const TimeCollectProvider = ({ children }) => {
    const [sessionData, setSessionData] = useState([]); 
    const [dailyFocusTime, setDailyFocusTime] = useState({});

    // Load and process data from local storage
    useEffect(() => {
        const storedSessions = JSON.parse(localStorage.getItem('sessions')) || [];
        setSessionData(storedSessions);
        
        // Calculate daily focus times from stored sessions
        const dailyTotals = calculateDailyFocusTimes(storedSessions);
        setDailyFocusTime(dailyTotals);
    }, []);

    // Calculate daily focus times
    const calculateDailyFocusTimes = (sessions) => {
        return sessions.reduce((acc, session) => {
            // Extract date from timestamp (YYYY-MM-DD format)
            const date = session.timestamp.split('T')[0];
            
            // Accumulate focus time for each date
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += session.duration;
            
            return acc;
        }, {});
    };

    // Saving a completed session 
    const saveSession = (duration) => {
        const session = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            duration: Math.floor(duration/60000), // Convert ms to mins
        };

        const existingSessions = JSON.parse(localStorage.getItem('sessions')) || [];
        const updatedSessions = [...existingSessions, session];

        // Update localStorage
        localStorage.setItem('sessions', JSON.stringify(updatedSessions));
        
        // Update session data
        setSessionData(updatedSessions);

        // Recalculate daily focus times
        const updatedDailyFocusTimes = calculateDailyFocusTimes(updatedSessions);
        setDailyFocusTime(updatedDailyFocusTimes);
    };

    // Get daily focus data as an array for charts
    const getDailyFocusArray = () => {
        return Object.entries(dailyFocusTime)
            .map(([date, focusTime]) => ({
                date, 
                focusTime // Minutes spent focusing
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort chronologically
    };

    return (
        <TimeCollectContext.Provider value={{
            sessionData,
            saveSession,
            dailyFocusTime,
            setDailyFocusTime,
            getDailyFocusArray,
        }}>
            {children}
        </TimeCollectContext.Provider>
    )
}

export const useTimeCollect = () => useContext(TimeCollectContext)