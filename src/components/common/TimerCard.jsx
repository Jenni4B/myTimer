// src/components/common/Card.jsx
import TimerControls from "../timer/TimerControls";
import ErrorBoundary from "./ErrorBoundary";

const TimerCard = () => {
  
  // Get initialSeconds from context instead of trying to access the ref
  
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center" style={{
      height: "160px", 
      border: "3px solid rgba(255, 255, 255, 0.7)", // White border
      boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)", // Glow effect
      padding: "40px"
    }}>
      <ErrorBoundary>
        <TimerControls />
      </ErrorBoundary>
    </div>
  );
};

export default TimerCard;