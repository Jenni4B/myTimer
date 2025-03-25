import { useState, useEffect } from "react";

const SelfCare = () => {
  // Suggested tasks users can add
  const suggestedTasks = ["Drink water", "Tidy Space", "Go for a walk"];

  // State for storing tasks
  const [tasks, setTasks] = useState([]);
  
  // State for handling input from the user
  const [newTask, setNewTask] = useState("");

  /* ----------------- Load & Save Tasks to Local Storage ----------------- */

  // Load tasks from local storage when component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("selfCareTasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("selfCareTasks", JSON.stringify(tasks));
  }, [tasks]);

  /* ----------------- Event Handlers ----------------- */

  // Add a custom task entered by the user
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  // Add a suggested task
  const handleAddSuggestedTask = (task) => {
    if (!tasks.includes(task)) {
      setTasks([...tasks, task]);
    }
  };

  // Delete a task from the list
  const handleDeleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
  };

  /* ----------------- Render UI ----------------- */
  return (
    <div className="self-care-container">
      <h3>Self Care (?)</h3>

      {/* Input Section */}
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
            <div key={index} className="task-item">
              <span>{task}</span>
              <button onClick={() => handleDeleteTask(task)}>❌</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SelfCare;
