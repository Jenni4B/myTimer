import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const FocusLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="focusTime" stroke="#FF5722" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FocusLineChart;
