import { createContext, useContext, useState, useEffect } from 'react';

const TimeCollectContext = createContext();

const TimeCollectProvider = ({ children }) => {
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

    const formatChartData = (dailyFocus) => {
        return Object.entries(dailyFocus).map(([date, focusTime]) => ({
            date,
            focusTime
        }));
    };
    
    const formattedChartData = formatChartData(dailyFocusTime);
    

    // Calculate total focus time per day
    const getDailyFocusArray = () => {
        return Object.keys(dailyFocusTime).map(date => ({
            date, 
            focusTime: dailyFocusTime[date] // Minutes spent focusing
        }));
    };

    return (
        <TimeCollectContext.Provider value={{
            sessionData,
            saveSession,
            dailyFocusTime,
            setDailyFocusTime,
            getDailyFocusArray,
            formattedChartData,
        }}>
            {children}
        </TimeCollectContext.Provider>
    )
}

const useTimeCollect = () => useContext(TimeCollectContext)

export { TimeCollectProvider, useTimeCollect };