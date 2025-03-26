import { useState, useEffect } from "react";

const SelfCare = () => {
  // Suggested self-care tasks
  const suggestedTasks = [
    "Drink water",
    "Tidy Space",
    "Go for a walk",
    "Stretch for 5 mins",
    "Deep breathing exercise",
    "Write in a journal",
    "Listen to calming music",
    "Read a book for 10 mins"
  ];

  // State for user-added tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("selfCareTasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("selfCareTasks", JSON.stringify(tasks));
  }, [tasks]);

  /* ----------------- Event Handlers ----------------- */

  // Add a new custom task
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Add a suggested task
  const handleAddSuggestedTask = (task) => {
    if (!tasks.some((t) => t.text === task)) {
      setTasks([...tasks, { text: task, completed: false }]);
    }
  };

  // Mark task as completed
  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  /* ----------------- Render UI ----------------- */
  return (
    <div className="self-care-container">
      <h3>Self Care (?)</h3>

      {/* Task Input */}
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a self-care task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>➕ Add</button>
      </div>

      {/* Suggested Tasks */}
      <div className="suggested-tasks">
        <p>Quick Add:</p>
        {suggestedTasks.map((task, index) => (
          <button key={index} onClick={() => handleAddSuggestedTask(task)}>
            {task} ➕
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">You have no tasks</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className={`task-item ${task.completed ? "completed" : ""}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
              />
              <span>{task.text}</span>
              <button onClick={() => handleDeleteTask(index)}>❌</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SelfCare;
