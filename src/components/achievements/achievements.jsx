import { useAchievements } from "../../context/achievementsContext";
const Achievements = () => {
    const { achievements} = useAchievements();
  
    return (
      <div>
        <h2>Achievements</h2>
        <ul>
          {achievements.map((ach) => (
            <li key={ach.id} style={{ color: ach.unlocked ? "green" : "gray" }}>
              {ach.unlocked ? "✅" : "🔒"} {ach.title}
              {ach.description && <p>{ach.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Achievements;