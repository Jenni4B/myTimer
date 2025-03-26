import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { useTimeCollect } from "../../context/TimeCollectContext";

export const barChart = () => {

    // Get data from TimeCollectContext 
    const {dailyFocusTime} = useTimeCollect(); // get data

    const chartData = Object.keys(dailyFocusTime).map(date => ({
        date,
        focusTime: dailyFocusTime[date] // minutes spent in the focus
    }));

    return (
        <div className="focusChartContainer">
            <h3>Focus Time</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="focusTime" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}