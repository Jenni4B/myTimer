import { useState } from "react";
import { useTimeCollect } from "../../../context/TimeCollectContext";
import FocusBarChart from "./barChart";
import FocusLineChart from "./lineChart";

const ToggleChart = () => {
  const { dailyFocusTime } = useTimeCollect();
  const [chartType, setChartType] = useState("bar");
  const [timeFilter, setTimeFilter] = useState("daily");

  // Format Data for Recharts
  const formattedChartData = Object.entries(dailyFocusTime).map(([date, focusTime]) => ({
    date,
    focusTime,
  }));

  // Function to filter the data based on timeFilter
  const getFilteredData = () => {
    const today = new Date();
    const filteredData = formattedChartData.filter(({ date }) => {
      const sessionDate = new Date(date);
      if (timeFilter === "daily") {
        return sessionDate.toDateString() === today.toDateString();
      } else if (timeFilter === "weekly") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        return sessionDate >= oneWeekAgo;
      } else if (timeFilter === "monthly") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        return sessionDate >= oneMonthAgo;
      }
      return false;
    });

    return filteredData;
  };

  return (
    <div className="mainProgressBox">
      {/* Time Filter Buttons */}
      <div className="timeFilterContainer">
        <button onClick={() => setTimeFilter("daily")} className="btn">
          Daily
        </button>
        <button onClick={() => setTimeFilter("weekly")} className="btn">
          Weekly
        </button>
        <button onClick={() => setTimeFilter("monthly")} className="btn">
          Monthly
        </button>
      </div>

      {/* Chart Toggle Buttons */}
      <div className="chartTypeButtonContainer">
        <button onClick={() => setChartType("bar")} className="btn">
          Bar Chart
        </button>
        <button onClick={() => setChartType("line")} className="btn">
          Line Chart
        </button>
      </div>

      {/* Chart Display */}
      <div className="chart">
        {chartType === "bar" ? (
          <FocusBarChart data={getFilteredData()} />
        ) : (
          <FocusLineChart data={getFilteredData()} />
        )}
      </div>
    </div>
  );
};

export default ToggleChart;
