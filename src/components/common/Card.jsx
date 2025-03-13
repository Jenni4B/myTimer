// src/components/common/Card.jsx
import TimerControls from "../timer/TimerControls";
import ProgressBar from "../timer/ProgressBar";
import ErrorBoundary from "./ErrorBoundary";
import useTimer from "../hooks/useTimer";

const Card = () => {
  const { totalSeconds, initialSeconds, timerType } = useTimer();

  return (
    <section className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
      <ErrorBoundary>
        <TimerControls />
        
        {/* Move ProgressBar inside a div for better layout control */}
        <div className="w-full mt-4">
          <ProgressBar 
            totalSeconds={totalSeconds} 
            initialSeconds={initialSeconds} 
            timerType={timerType} 
          />
        </div>
      </ErrorBoundary>
    </section>
  );
};

export default Card;
