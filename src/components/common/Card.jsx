import TimerControls from "../timer/TimerControls";

const TimerCard = () => {
  return (
    <section className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
      <TimerControls />
    </section>
  );
};

export default TimerCard;
