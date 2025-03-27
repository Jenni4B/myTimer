import FocusBarChart from "./barChart";
import FocusLineChart from "./lineChart";
import { useState } from "react";
import { useTimeCollect } from "../../../context/TimeCollectContext";

const ToggleChart = () => {
    const { dailyFocusTime } = useTimeCollect();
    const [chartType, setChartType] = useState("bar");

    const formattedChartData = Object.entries(dailyFocusTime).map(([date, focusTime]) => ({
        date,
        focusTime
    }));

    return (
        <div className="chart-container">
            <div className="chart-buttons">
                <button onClick={() => setChartType("bar")}>📊 Bar Chart</button>
                <button onClick={() => setChartType("line")}>📈 Line Chart</button>
            </div>

            {chartType === "bar" ? (
                <FocusBarChart data={formattedChartData} />
            ) : (
                <FocusLineChart data={formattedChartData} />
            )}
        </div>
    );
};

export default ToggleChart;
