import { useState, useEffect } from "react";

const SelfCareTasks = () => {
  // Suggested self-care tasks
  const suggestedTasks = [
    "Drink water",
    "Tidy Space",
    "Deep breathing exercise",
    "Write in a journal",
    "Read a book for 10 mins",
  ];

  // State for user-added tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  /* ----------------- Load & Save Tasks to Local Storage ----------------- */

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("selfCareTasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("selfCareTasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  /* ----------------- Event Handlers ----------------- */

  // Add a new custom task
  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = { id: Date.now(), text: newTask, completed: false };
      
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTaskObj];
        localStorage.setItem("selfCareTasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });

      setNewTask("");
    }
  };

  // Add a suggested task (prevents duplicates)
  const handleAddSuggestedTask = (task) => {
    if (!tasks.some((t) => t.text === task)) {
      const newTaskObj = { id: Date.now(), text: task, completed: false };
      
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTaskObj];
        localStorage.setItem("selfCareTasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
  };

  // Mark task as completed
  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("selfCareTasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      localStorage.setItem("selfCareTasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  /* ----------------- Render UI ----------------- */
  return (
    <div className="self-care-container">
      <h3>Personal Tasks</h3>

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
          tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <span>{task.text}</span>
              <button onClick={() => handleDeleteTask(task.id)}>❌</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SelfCareTasks;
