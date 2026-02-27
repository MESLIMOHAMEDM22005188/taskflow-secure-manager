import { useCallback, useEffect, useMemo, useState } from "react";
import TaskModel from "../models/TaskModel";
import { TaskView } from "../views/TaskView";
import ThemeModel from "../api/themes/ThemeModel";
import ProfileView from "../views/ProfileView";

export default function TaskController({ token, logout }) {
  const model = useMemo(() => new TaskModel(), []);
  const themeModel = useMemo(() => new ThemeModel(token), [token]);

  const [tasks, setTasks] = useState([]);
  const [themes, setThemes] = useState([]);
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [currentTheme, setCurrentTheme] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const data = await model.getTasks();
      setTasks(data);
    } catch (err) {
      console.error("LOAD TASKS ERROR:", err);
    }
  }, [model]);

  const loadThemes = useCallback(async () => {
    try {
      const loadedThemes = await themeModel.getThemes();
      setThemes(loadedThemes);

      if (loadedThemes.length > 0) {
        setCurrentTheme(loadedThemes[0]);
      }
    } catch (err) {
      console.error("LOAD THEMES ERROR:", err);
    }
  }, [themeModel]);

  useEffect(() => {
    if (!token) return;

    const timer = setTimeout(() => {
      loadTasks();
      loadThemes();
    }, 0);

    return () => clearTimeout(timer);
  }, [token, loadTasks, loadThemes]);

  const createTheme = async (themeName, themeColor) => {
    try {
      const newTheme = await themeModel.createTheme({
        name: themeName,
        color: themeColor
      });

      setThemes((prev) => [...prev, newTheme]);
    } catch (err) {
      alert(err.message);
    }
  };

  const addTask = async (taskData) => {
    try {
      const createdTask = await model.createTask(taskData);
      setTasks((prev) => [...prev, createdTask]);
    } catch (err) {
      console.error("CREATE TASK ERROR:", err);
    }
  };

  const deleteTheme = async (themeId) => {
    try {
      await themeModel.deleteTheme(themeId);
      setThemes((prev) => prev.filter((t) => t.id !== themeId));
      await loadTasks();
    } catch (err) {
      console.error("DELETE THEME ERROR:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await model.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  const toggleStatus = async (task) => {
    try {
      await model.updateTask(task.id, {
        completed: !task.completed
      });

      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      console.error("TOGGLE ERROR:", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "done") return task.completed;
    if (filter === "todo") return !task.completed;

    return task.theme?.id === filter;
  });

  if (showProfile) {
    return <ProfileView goBack={() => setShowProfile(false)} logout={logout} />;
  }

  return (
    <TaskView
      tasks={filteredTasks}
      addTask={addTask}
      deleteTask={deleteTask}
      toggleStatus={toggleStatus}
      logout={logout}
      deleteTheme={deleteTheme}
      priority={priority}
      setPriority={setPriority}
      filter={filter}
      setFilter={setFilter}
      totalTasks={tasks.length}
      completedTasks={tasks.filter((t) => t.completed).length}
      themes={themes}
      createTheme={createTheme}
      currentTheme={currentTheme}
      setCurrentTheme={setCurrentTheme}
      onProfile={() => setShowProfile(true)}
    />
  );
}
