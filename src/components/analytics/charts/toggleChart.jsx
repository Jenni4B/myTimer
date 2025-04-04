import { useState, useMemo, useEffect } from "react"
import { useTimeCollect } from "../../hooks/useTimeCollect"
import FocusBarChart from "./barChart"
import FocusLineChart from "./lineChart"

const ToggleChart = () => {
  const { getDailyFocusArray, isLoading } = useTimeCollect()
  const [chartType, setChartType] = useState("bar")
  const [timeFilter, setTimeFilter] = useState("weekly")

  // Get formatted chart data from the context
  const formattedChartData = useMemo(() => {
    const data = getDailyFocusArray()
    console.log("Formatted Chart Data:", data) // Debugging log
    return data || []
  }, [getDailyFocusArray])

  // Filter the data based on the selected time range
  const filteredData = useMemo(() => {
    if (!formattedChartData.length) return []

    const now = new Date()

    return formattedChartData.filter(({ date }) => {
      const sessionDate = new Date(date)

      switch (timeFilter) {
        case "daily":
          return sessionDate.toDateString() === now.toDateString()
        case "weekly": {
          const weekAgo = new Date(now)
          weekAgo.setDate(now.getDate() - 7)
          return sessionDate >= weekAgo
        }
        case "monthly": {
          const monthAgo = new Date(now)
          monthAgo.setMonth(now.getMonth() - 1)
          return sessionDate >= monthAgo
        }
        default:
          return true
      }
    })
  }, [formattedChartData, timeFilter])

  // Debugging: Check if filtered data exists
  useEffect(() => {
    console.log("📊 Filtered Data:", filteredData)
  }, [filteredData])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center text-gray-500">
          <p>Loading focus data...</p>
        </div>
      </div>
    )
  }

  // Show message if no data is available
  if (!filteredData.length) {
    return (
      <div className="text-center text-gray-500 p-8 rounded-lg border border-gray-200">
        <p className="text-lg font-medium mb-2">Start a focus session to see your progress!</p>
      </div>
    )
  }

  return (
    <div className="focus-chart-container p-4 rounded-lg border border-gray-200">
      {/* Time Filter Buttons */}
      <div className="time-filter-buttons flex space-x-2 mb-4">
        {["daily", "weekly", "monthly"].map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`px-4 py-2 rounded-md transition-colors ${
              timeFilter === filter ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart Toggle Buttons */}
      <div className="chart-type-buttons flex space-x-2 mb-4">
        {["bar", "line"].map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            className={`px-4 py-2 rounded-md transition-colors ${
              chartType === type ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {type === "bar" ? "Bar Chart" : "Line Chart"}
          </button>
        ))}
      </div>

      {/* Chart Display */}
      <div className="chart-container h-64 mt-4">
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No data available for the selected time period.</p>
          </div>
        ) : chartType === "bar" ? (
          <FocusBarChart data={filteredData} />
        ) : (
          <FocusLineChart data={filteredData} />
        )}
      </div>
    </div>
  )
}

export default ToggleChart
