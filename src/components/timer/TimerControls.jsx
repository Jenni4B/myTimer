import { useState, useEffect } from "react";

// TimerControls component
const TimerControls = () => {
    // State variables
    const [customTime, setCustomTime] = useState(25); // User-defined time (default: 25 minutes)
    const [minutes, setMinutes] = useState(25); // Current minutes left
    const [seconds, setSeconds] = useState(0); // Current seconds left
    const [isRunning, setIsRunning] = useState(false); // Timer status (running or stopped)

    // 🕒 useEffect: Runs when timer state changes
    useEffect(() => {
        let timer; // Declare a timer variable

        if (isRunning && (minutes > 0 || seconds > 0)) {
            console.log("⏳ Timer is running →", minutes, "min", seconds, "sec");

            timer = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 0) {
                        if (minutes === 0) {
                            clearInterval(timer); // Stop timer at 00:00
                            setIsRunning(false);
                            return 0;
                        }
                        setMinutes((prevMinutes) => prevMinutes - 1); // Reduce minutes
                        return 59; // Reset seconds to 59
                    }
                    return prevSeconds - 1; // Decrease seconds
                });
            }, 1000);
        }

        return () => clearInterval(timer); // Cleanup when unmounting or stopping
    }, [isRunning, minutes, seconds]); // Dependency array

    // ▶️ Start Timer
    const onStart = () => {
        setIsRunning(true);
        setMinutes(customTime); // Set the timer to user-defined time
        setSeconds(0); // Reset seconds to 0
    };

    // ⏸ Stop Timer
    const onStop = () => setIsRunning(false);

    // 🔄 Reset Timer
    const onReset = () => {
        setIsRunning(false);
        setCustomTime(25); // Reset custom time to 25
        setMinutes(25); // Reset minutes
        setSeconds(0); // Reset seconds
    };

    return (
        <div className="timer-container">
            <h2>
                ⏲ {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
            </h2>

            {/* Custom Time Input */}
            <input
                type="number"
                value={customTime}
                onChange={(e) => setCustomTime(Number(e.target.value))} // Convert input to number
                disabled={isRunning} // Disable when running
            />

            {/* Control Buttons */}
            <button className="controlButton" onClick={onStart} disabled={isRunning}>Start</button>
            <button className="controlButton" onClick={onStop} disabled={!isRunning}>Stop</button>
            <button className="controlButton" onClick={onReset}>Reset</button>
        </div>
    );
};

export default TimerControls;