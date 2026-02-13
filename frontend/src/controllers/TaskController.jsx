// TaskController.jsx (English messages only: add title validation)

import { useEffect, useState } from "react";
import TaskModel from "../models/TaskModel";
import { TaskView } from "../views/TaskView";

export default function TaskController({ token, logout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const model = new TaskModel(token);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await model.getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Load tasks error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        if (typeof logout === "function") logout();
        else window.location.reload();
      } else {
        setError("Unable to load tasks.");
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setError(null);
      await model.createTask(title.trim());
      setTitle("");
      await loadTasks();
    } catch (err) {
      console.error("Create task error:", err);
      setError("Unable to create task.");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskView
      tasks={tasks}
      title={title}
      setTitle={setTitle}
      addTask={addTask}
      error={error}
      loading={loading}
      logout={logout}
    />
  );
}
