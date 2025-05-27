import { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { defaultAchievements } from "./defaultAchievements";

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

  return (
    <AchievementsContext.Provider value={{ achievements, unlockAchievement}}>
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