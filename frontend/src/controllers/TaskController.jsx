import { useEffect, useState } from "react";
import TaskModel from "../models/TaskModel";
import { TaskView } from "../views/TaskView";

export default function TaskController({ token, logout }) {

  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");

  const model = new TaskModel(token);

  const loadTasks = async () => {
    const data = await model.getTasks();
    setTasks(data);
  };

  const addTask = async (newTitle) => {
  if (!newTitle.trim()) return;

  const createdTask = await model.createTask({
    title: newTitle,
    priority,
    status: "todo"
  });

  setTasks(prev => [...prev, createdTask]);
};


  const deleteTask = async (id) => {
  await model.deleteTask(id);
  setTasks(prev => prev.filter(t => t.id !== id));
};


  const toggleStatus = async (task) => {
  const newStatus = task.status === "todo" ? "done" : "todo";

  await model.updateTask(task.id, { status: newStatus });

  setTasks(prev =>
    prev.map(t =>
      t.id === task.id ? { ...t, status: newStatus } : t
    )
  );
};


  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskView
      tasks={filteredTasks}
      addTask={addTask}
      deleteTask={deleteTask}
      toggleStatus={toggleStatus}
      logout={logout}
      priority={priority}
      setPriority={setPriority}
      filter={filter}
      setFilter={setFilter}
      totalTasks={tasks.length}
      completedTasks={tasks.filter(t => t.status === "done").length}
    />
  );
}
