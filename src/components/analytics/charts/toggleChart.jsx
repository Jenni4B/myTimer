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
    const data = getDailyFocusArray();
    console.log("Formatted Chart Data:", data); // Debug log
    return data;
  }, [getDailyFocusArray]);

  // Improved data filtering with more robust date handling
  const getFilteredData = useMemo(() => {
    const today = new Date();
    const filteredData = formattedChartData.filter(({ date }) => {
      const sessionDate = new Date(date);
      switch (timeFilter) {
        case "daily":
          return sessionDate.toDateString() === today.toDateString();
        case "weekly":
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);
          return sessionDate >= oneWeekAgo;
        case "monthly":
          const oneMonthAgo = new Date(today);
          oneMonthAgo.setMonth(today.getMonth() - 1);
          return sessionDate >= oneMonthAgo;
        default:
          return false;
      }
    });

    console.log("Filtered Data:", filteredData); // Debug log
    return filteredData;
  }, [formattedChartData, timeFilter]);

  // Comprehensive error handling
  if (!formattedChartData || formattedChartData.length === 0) {
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
        <button 
          onClick={() => setTimeFilter("daily")} 
          className={`btn ${timeFilter === "daily" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Daily
        </button>
        <button 
          onClick={() => setTimeFilter("weekly")} 
          className={`btn ${timeFilter === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Weekly
        </button>
        <button 
          onClick={() => setTimeFilter("monthly")} 
          className={`btn ${timeFilter === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Monthly
        </button>
      </div>

      {/* Chart Toggle Buttons */}
      <div className="chartTypeButtonContainer">
        <button 
          onClick={() => setChartType("bar")} 
          className={`btn ${chartType === "bar" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Bar Chart
        </button>
        <button 
          onClick={() => setChartType("line")} 
          className={`btn ${chartType === "line" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Line Chart
        </button>
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