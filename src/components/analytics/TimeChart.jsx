import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', focusTime: 120 },
  { day: 'Tue', focusTime: 150 },
  { day: 'Wed', focusTime: 180 },
  { day: 'Thu', focusTime: 90 },
  { day: 'Fri', focusTime: 210 },
];

const FocusTimeChart = () => {
  return (
    <ResponsiveContainer width={300} height={300}>
      <LineChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="focusTime" stroke="#7B1FA2" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FocusTimeChart;
