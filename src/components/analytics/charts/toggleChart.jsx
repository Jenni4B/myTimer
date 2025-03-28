import { useState, useMemo } from "react";
import { useTimeCollect } from "../../../context/TimeCollectContext";
import FocusBarChart from "./barChart";
import FocusLineChart from "./lineChart";

const ToggleChart = () => {
  const { getDailyFocusArray } = useTimeCollect();
  const [chartType, setChartType] = useState("bar");
  const [timeFilter, setTimeFilter] = useState("weekly");

  // Get formatted chart data
  const formattedChartData = useMemo(() => {
    const data = getDailyFocusArray() || []; // Ensure data is always an array
    console.log("Formatted Chart Data:", data); // Debug log
    return data;
  }, [getDailyFocusArray]);

  // Function to filter data based on selected time range
  const getFilteredData = useMemo(() => {
    if (!formattedChartData.length) return [];

    const today = new Date();
    return formattedChartData.filter(({ date }) => {
      const sessionDate = new Date(date);
      switch (timeFilter) {
        case "daily":
          return sessionDate.toDateString() === today.toDateString();
        case "weekly":
          return sessionDate >= new Date(today.setDate(today.getDate() - 7));
        case "monthly":
          return sessionDate >= new Date(today.setMonth(today.getMonth() - 1));
        default:
          return false;
      }
    });
  }, [formattedChartData, timeFilter]);

  // Show message if no data is available
  if (!formattedChartData.length) {
    return (
      <div className="text-center text-gray-500 p-4">
        <p>No focus time data available yet.</p>
        <p>Start a focus session to see your progress!</p>
      </div>
    );
  }

  return (
    <div className="mainProgressBox">
      {/* Time Filter Buttons */}
      <div className="timeFilterContainer">
        {["daily", "weekly", "monthly"].map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`btn ${timeFilter === filter ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart Toggle Buttons */}
      <div className="chartTypeButtonContainer">
        {["bar", "line"].map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            className={`btn ${chartType === type ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {type === "bar" ? "Bar Chart" : "Line Chart"}
          </button>
        ))}
      </div>

      {/* Chart Display */}
      <div className="chart">
        {chartType === "bar" ? (
          <FocusBarChart data={getFilteredData} />
        ) : (
          <FocusLineChart data={getFilteredData} />
        )}
      </div>
    </div>
  );
};

export default ToggleChart;
