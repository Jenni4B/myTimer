import { createContext, useContext, useState, useEffect } from "react"

const TimeCollectContext = createContext()

export const TimeCollectProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState([])
  const [dailyFocusTime, setDailyFocusTime] = useState({})
  const [focusStats, setFocusStats] = useState({
    todaysFocusTime: 0,
    dailyStreak: 0,
    completedSessions: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load and process data from local storage
  useEffect(() => {
    try {
      const storedSessions = JSON.parse(localStorage.getItem("sessions")) || []
      setSessionData(storedSessions)

      // Calculate daily focus times from stored sessions
      const dailyTotals = calculateDailyFocusTimes(storedSessions)
      setDailyFocusTime(dailyTotals)

      // Calculate focus stats for the quick stats chart
      updateFocusStats(storedSessions, dailyTotals)
    } catch (error) {
      console.error("Error loading focus data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Calculate daily focus times
  const calculateDailyFocusTimes = (sessions) => {
    return sessions.reduce((acc, session) => {
      // Extract date from timestamp (YYYY-MM-DD format)
      const date = session.timestamp.split("T")[0]

      // Accumulate focus time for each date
      if (!acc[date]) {
        acc[date] = 0
      }
      acc[date] += session.duration

      return acc
    }, {})
  }

  // Calculate focus stats for the quick stats chart
  const updateFocusStats = (sessions, dailyTotals) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]

    // Calculate today's focus time in seconds (convert from minutes)
    const todaysFocusTime = (dailyTotals[today] || 0) * 60

    // Calculate daily streak by checking consecutive days with focus sessions
    const dailyStreak = calculateDailyStreak(dailyTotals)

    // Count total completed sessions
    const completedSessions = sessions.length

    setFocusStats({
      todaysFocusTime,
      dailyStreak,
      completedSessions,
    })
  }

  // Calculate the current daily streak
  const calculateDailyStreak = (dailyTotals) => {
    const dates = Object.keys(dailyTotals).sort((a, b) => new Date(b) - new Date(a)) // Sort descending

    if (dates.length === 0) return 0

    let streak = 1 // Start with 1 for the most recent day
    const today = new Date().toISOString().split("T")[0]

    // Check if the most recent day is today or yesterday
    const mostRecentDate = dates[0]
    const mostRecentDay = new Date(mostRecentDate)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    if (mostRecentDate !== today && mostRecentDay < yesterday) {
      return 0 // Streak broken if no focus time today or yesterday
    }

    // Check consecutive days
    for (let i = 0; i < dates.length - 1; i++) {
      const currentDate = new Date(dates[i])
      const nextDate = new Date(dates[i + 1])

      // Calculate the difference in days
      const diffTime = currentDate - nextDate
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        // Consecutive day found
        streak++
      } else {
        // Break in the streak
        break
      }
    }

    return streak
  }

  // Saving a completed session
  const saveSession = (duration) => {
    const session = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      duration: Math.floor(duration / 60000), // Convert ms to mins
    }

    const existingSessions = JSON.parse(localStorage.getItem("sessions")) || []
    const updatedSessions = [...existingSessions, session]

    // Update localStorage
    localStorage.setItem("sessions", JSON.stringify(updatedSessions))

    // Update session data
    setSessionData(updatedSessions)

    // Recalculate daily focus times
    const updatedDailyFocusTimes = calculateDailyFocusTimes(updatedSessions)
    setDailyFocusTime(updatedDailyFocusTimes)

    // Update focus stats for the quick stats chart
    updateFocusStats(updatedSessions, updatedDailyFocusTimes)
  }

  // Get daily focus data as an array for charts
  const getDailyFocusArray = () => {
    return Object.entries(dailyFocusTime)
      .map(([date, focusTime]) => ({
        date,
        focusTime, // Minutes spent focusing
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort chronologically
  }

  // Get user data in the format expected by the chart components
  const getUserData = () => {
    return {
      focusStats,
      dailyFocusData: getDailyFocusArray(),
    }
  }

  return (
    <TimeCollectContext.Provider
      value={{
        sessionData,
        saveSession,
        dailyFocusTime,
        getDailyFocusArray,
        focusStats,
        getUserData,
        isLoading,
      }}
    >
      {children}
    </TimeCollectContext.Provider>
  )
}

export const useTimeCollect = () => useContext(TimeCollectContext)

