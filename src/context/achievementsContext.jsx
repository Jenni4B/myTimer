import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

// Default achievements list
const defaultAchievements = [
  { id: "1", title: "First Pomodoro", description: "Complete your first Pomodoro session.", unlocked: false },
  { id: "2", title: "Streak Starter", description: "Complete 3 Pomodoro sessions in a row.", unlocked: false },
  { id: "3", title: "Focus Master", description: "Complete 10 Pomodoro sessions in total.", unlocked: false },
  { id: "4", title: "Productivity Pro", description: "Complete 25 Pomodoro sessions in total.", unlocked: false },
  { id: "5", title: "Time Wizard", description: "Accumulate 5 hours of focus time.", unlocked: false },
];

const AchievementsContext = createContext(undefined);

export function AchievementsProvider({ children }) {
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [isClient, setIsClient] = useState(false);
  const unlockedAchievementRef = useRef(null);

  // Ensure React runs in client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load achievements from localStorage
  useEffect(() => {
    if (!isClient) return;

    try {
      const savedAchievements = localStorage.getItem("achievements");
      if (savedAchievements) {
        const parsedAchievements = JSON.parse(savedAchievements);

        // Merge default and saved achievements
        const mergedAchievements = defaultAchievements.map((defaultAch) => {
          const savedAch = parsedAchievements.find((a) => a.id === defaultAch.id);
          return savedAch || defaultAch;
        });

        setAchievements(mergedAchievements);
      }
    } catch (error) {
      console.error("Error loading achievements:", error);
      setAchievements(defaultAchievements);
    }
  }, [isClient]);

  // Save achievements to localStorage
  useEffect(() => {
    if (!isClient) return;

    try {
      localStorage.setItem("achievements", JSON.stringify(achievements));
    } catch (error) {
      console.error("Error saving achievements:", error);
    }
  }, [achievements, isClient]);

  // Show a notification when an achievement is unlocked
  useEffect(() => {
    if (unlockedAchievementRef.current) {
      const achievement = achievements.find((ach) => ach.id === unlockedAchievementRef.current);
      if (achievement && achievement.unlocked) {
        toast.success(`Achievement Unlocked: ${achievement.title}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      unlockedAchievementRef.current = null;
    }
  }, [achievements]);

  // Unlock an achievement by ID
  const unlockAchievement = (id) => {
    setAchievements((prev) => {
      const achievement = prev.find((ach) => ach.id === id);
      if (achievement && !achievement.unlocked) {
        unlockedAchievementRef.current = id;
        return prev.map((ach) => (ach.id === id ? { ...ach, unlocked: true } : ach));
      }
      return prev;
    });
  };

  // Reset all achievements
  const resetAchievements = () => {
    if (window.confirm("Are you sure you want to reset all achievements? This cannot be undone.")) {
      setAchievements(defaultAchievements);
      toast.info("All achievements have been reset", { position: "top-center", autoClose: 3000 });
    }
  };

  return (
    <AchievementsContext.Provider value={{ achievements, unlockAchievement, resetAchievements }}>
      {children}
    </AchievementsContext.Provider>
  );
}

// Custom hook to use the context
export function useAchievements() {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error("useAchievements must be used within an AchievementsProvider");
  }
  return context;
}
