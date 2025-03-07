import { useAchievements } from "../../context/achievementsContext";
const Achievements = () => {
    const { achievements, resetAchievements } = useAchievements();
  
    return (
      <div>
        <h2>Achievements</h2>
        <ul>
          {achievements.map((ach) => (
            <li key={ach.id} style={{ color: ach.unlocked ? "green" : "gray" }}>
              {ach.unlocked ? "✅" : "🔒"} {ach.title}
            </li>
          ))}
        </ul>
        <button onClick={resetAchievements}>Reset Achievements</button>
      </div>
    );
  };
  
  export default Achievements;