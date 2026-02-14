import { useState } from "react";
import "../assets/css/TaskHome.css";

export function TaskView({
  tasks,
  addTask,
  deleteTask,
  toggleStatus,
  logout,
  priority,
  setPriority,
  filter,
  setFilter,
  totalTasks,
  completedTasks
}) {

  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = () => {
    addTask(newTitle);
    setNewTitle("");
    setShowInput(false);
  };

  return (
    <div className="home">

      <header className="hero">
        <h1>TaskFlow</h1>

        <p>
          {completedTasks} / {totalTasks} tasks completed
        </p>

        <div className="hero-buttons">

          {!showInput && (
  <button 
    className="primary-btn"
    onClick={() => setShowInput(true)}
  >
    + Create Task
  </button>
)}


          {showInput && (
  <div className="create-task-box">

    <input
      className="create-input"
      placeholder="Enter task..."
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
    />

    <select
      className="create-select"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button 
      className="create-confirm"
      onClick={handleSubmit}
    >
      Add
    </button>

  </div>
)}


          <button onClick={logout}>Logout</button>
        </div>

        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("todo")}>Todo</button>
          <button onClick={() => setFilter("done")}>Done</button>
        </div>

      </header>

      <section className="products">
        {tasks.map(task => (
          <div key={task.id} className="product-card">

            <h2>{task.title}</h2>

            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>

            <button onClick={() => toggleStatus(task)}>
              Toggle
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>

          </div>
        ))}
      </section>

    </div>
  );


  
}

