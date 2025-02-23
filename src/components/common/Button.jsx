// the state of the button; either says "Start", "Pause", or "Resume"
// depending on the state of the timer itself.
// if the timer is paused and the button is clicked, the timer should resume.
// if the timer is running and the button is clicked, the timer should pause.
// if the timer hasn't started yet and the button is clicked, the timer should start.

import { useState } from "react";


const [buttonText, setButtonText] = useState("Start");

// Button component

const Button = ({ onClick }) => {

    // Change button text based on the current state



    // Button text
    return (
        <button onClick={onClick}>{buttonText}</button>
    );

};

export default Button;