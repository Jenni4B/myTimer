import { createContext, useContext, useState, useEffect } from 'react';

const TimeCollectContext = createContext();

export const TimeCollectProvider = ({ children }) => {
    const [sessionData, setSessionData] = useState([]); // Stores all sessions
    const [dailyFocusTime, setDailyFocusTime] = useState({}); // An object that stores total focus time


    // Load data from local storage
    useEffect(() => {

        // If there's data in local storage, then this effect will retrieve the session data
        // If there's no data in local storage, then this effect will make an empty array
        // so that new session data will be collected and then later stored in local storage
        
        const storedSessions = JSON.parse(localStorage.getItem('sessions')) || [];
        setSessionData(storedSessions);
    }, []);

    // Saving a completed session 
    const saveSession = (duration) => {
        const session = {

            // unique ID for the session
            id: Date.now(),

            // ISO format is an international standard for representing dates and times
            timestamp: new Date().toISOString(),

            // Minutes completed, uses the floor operation because decimals are tedious
            duration: Math.floor(duration/60000), // Convert ms to mins
        };

        const existingSessions = JSON.parse(localStorage.getItem('sessions')) || [];
        const updatedSessions = [...existingSessions, session];

        setSessionData(updatedSessions);
        localStorage.setItem('sessions', JSON.stringify(updatedSessions));
    };


    // Calculate total focus time per day
    const updateDailyFocus = (sessions) => {
        const dailyStats = sessions.reduce((acc, session) => {
            if (!session.timestamp || !session.duration) return acc; // Skip invalid data
            const sessionDate = new Date(session.timestamp).toLocaleDateString();
            acc[sessionDate] = (acc[sessionDate] || 0) + session.duration;
            return acc;
        }, {});
        setDailyFocusTime(dailyStats);
    };
    

    // Run daily focus update when sessionData changes
    useEffect(() => {
        updateDailyFocus(sessionData);
    }, [sessionData]);

    return (
        <TimeCollectContext.Provider value={{
            sessionData,
            saveSession,
            dailyFocusTime,
        }}>
            {children}
        </TimeCollectContext.Provider>
    )
}

export const useTimeCollect = () => useContext(TimeCollectContext)