import ProgressBar from "./ProgressBar";

const TimerDisplay = ({minutes, seconds}) => {
    const displayedMinutes = minutes.toString().padStart(2, '0');
    const displayedSeconds = seconds.toString().padStart(2, '0');

    return (
      <section>
        <ProgressBar />
        <h1>{displayedMinutes}:{displayedSeconds}</h1>
      </section>
    );
}

export default TimerDisplay;