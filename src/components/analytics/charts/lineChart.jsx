import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"

const FocusLineChart = ({ data }) => {
  // Format date for display on x-axis
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // Custom tooltip to display focus time in minutes
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">{formatDate(label)}</p>
          <p className="text-blue-500">{`Focus Time: ${payload[0].value} minutes`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12, fill: "#666" }} tickMargin={10} />
        <YAxis
          label={{
            value: "Minutes",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fill: "#666", fontSize: 12 },
          }}
          tick={{ fontSize: 12, fill: "#666" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="focusTime"
          stroke="#3b82f6" // blue-500
          strokeWidth={2}
          dot={{
            stroke: "#3b82f6",
            strokeWidth: 2,
            r: 4,
            fill: "white",
          }}
          activeDot={{
            stroke: "#3b82f6",
            strokeWidth: 2,
            r: 6,
            fill: "white",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default FocusLineChart

