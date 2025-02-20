import { useState } from "react";
import TimerControls from "../timer/TimerControls"; // Uses TimerControls component

const TimerCard = () => {
    // State variables for the timer
    const [customTime, setCustomTime] = useState(25); // User-set time (default 25 min)
    const [minutes, setMinutes] = useState(25);       // Timer minutes
    const [seconds, setSeconds] = useState(0);        // Timer seconds
    const [isRunning, setIsRunning] = useState(false); // Timer running state

    return (
        <section className="timerCard">
            {/* Timer Controls (handles Start, Stop, Reset, and custom time input) */}
            <TimerControls
                customTime={customTime} setCustomTime={setCustomTime}
                isRunning={isRunning} setIsRunning={setIsRunning}
                minutes={minutes} setMinutes={setMinutes}
                seconds={seconds} setSeconds={setSeconds}
            />
        </section>
    );
};

export default TimerCard;