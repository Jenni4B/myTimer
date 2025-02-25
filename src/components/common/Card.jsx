import TimerControls from "../timer/TimerControls";
import ErrorBoundary from "./ErrorBoundary";
const Card = () => {
  return (
    <section className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
      {/* Added the Error Bounday to the Card component */}
      <ErrorBoundary>
        <TimerControls />
      </ErrorBoundary>
    </section>
  );
};

export default Card;
