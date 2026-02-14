import { useEffect, useState } from "react";
import TaskModel from "../models/TaskModel";
import { TaskView } from "../views/TaskView";
import ThemeModel from "../api/themes/ThemeModel";

export default function TaskController({ token, logout }) {

  const model = new TaskModel();
  const themeModel = new ThemeModel(token);

  const [tasks, setTasks] = useState([]);
  const [themes, setThemes] = useState([]);
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [currentTheme, setCurrentTheme] = useState(null);

  useEffect(() => {
  console.log("🔵 CONTROLLER MOUNTED");
  console.log("TOKEN:", token);
  console.log("LOCAL STORAGE TOKEN:", localStorage.getItem("token"));

  loadTasks();
  loadThemes();
}, []);


  const loadTasks = async () => {
  console.log("🟡 loadTasks called");

  try {
    const data = await model.getTasks();
    console.log("🟢 DATA FROM API:", data);
    console.log("🟢 TYPE:", typeof data);
    console.log("🟢 IS ARRAY:", Array.isArray(data));

    setTasks(data);

  } catch (err) {
    console.error("🔴 LOAD TASKS ERROR:", err);
  }
};


  const loadThemes = async () => {
    try {
      const themes = await themeModel.getThemes();
      setThemes(themes);

      if (themes.length > 0) {
        setCurrentTheme(themes[0]);
      }
    } catch (err) {
      console.error("LOAD THEMES ERROR:", err);
    }
  };

  const createTheme = async (themeName, themeColor) => {
    try {
      const newTheme = await themeModel.createTheme({
        name: themeName,
        color: themeColor
      });

      setThemes(prev => [...prev, newTheme]);
    } catch (err) {
      alert(err.message);
    }
  };

  const addTask = async (newTitle, themeId) => {
    if (!newTitle.trim()) return;

    try {
      const createdTask = await model.createTask({
        title: newTitle,
        priority,
        status: "todo",
        themeId
      });

      setTasks(prev => [...prev, createdTask]);
    } catch (err) {
      console.error("CREATE TASK ERROR:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await model.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "todo" ? "done" : "todo";

    try {
      await model.updateTask(task.id, { status: newStatus });

      setTasks(prev =>
        prev.map(t =>
          t.id === task.id ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      console.error("TOGGLE ERROR:", err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

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
      themes={themes}
      createTheme={createTheme}
      currentTheme={currentTheme}
      setCurrentTheme={setCurrentTheme}
    />
  );
}
