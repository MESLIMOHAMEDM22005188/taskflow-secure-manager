import { useState } from "react";
import "../assets/css/TaskHome.css";

export function TaskView({
  tasks = [],
  addTask,
  deleteTask,
  toggleStatus,
  logout,
  priority,
  setPriority,
  filter,
  setFilter,
  totalTasks,
  completedTasks,
  createTheme,
  themes = [],
  currentTheme
}) {
  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const [showThemeModal, setShowThemeModal] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const [newThemeColor, setNewThemeColor] = useState("#1E3A8A");

  // Couleur de thème = ACCENT uniquement (pas fond)
  const accentColor = currentTheme?.color || "#1E3A8A";

  const handleSubmit = () => {
    if (!newTitle.trim()) return;

    addTask(newTitle);
    setNewTitle("");
    setShowInput(false);
  };

  const handleSaveTheme = async () => {
    if (!newThemeName.trim()) return;

    await createTheme(newThemeName, newThemeColor);
    setNewThemeName("");
    setNewThemeColor("#1E3A8A");
    setShowThemeModal(false);
  };

  return (
    <div className="home">
      <header className="topbar">
        <div className="header-left">
          <button className="theme-btn" onClick={() => setShowThemeModal(true)}>
            Mes thèmes
          </button>
          <button className="graph-btn">Graphique</button>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      {showThemeModal && (
        <div className="modal-backdrop" onClick={() => setShowThemeModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Manage Themes</h2>

            <div className="theme-previews">
              {themes.length === 0 && <p>Aucun thème pour le moment</p>}

              {themes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className="theme-preview-item"
                  style={{ backgroundColor: theme.color }}
                  // Ici tu peux sélectionner le thème si tu passes une prop setCurrentTheme
                  // onClick={() => setCurrentTheme(theme)}
                >
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>

            {themes.length < 7 && (
              <div className="theme-form">
                <input
                  type="text"
                  placeholder="Theme name"
                  value={newThemeName}
                  onChange={(e) => setNewThemeName(e.target.value)}
                />

                <input
                  type="color"
                  value={newThemeColor}
                  onChange={(e) => setNewThemeColor(e.target.value)}
                />

                <button className="save-theme-btn" onClick={handleSaveTheme}>
                  Save Theme
                </button>
              </div>
            )}

            <button className="modal-close" onClick={() => setShowThemeModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <section className="hero">
        <h1>TaskFlow</h1>

        <p>
          {completedTasks} / {totalTasks} tasks completed
        </p>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: totalTasks === 0 ? "0%" : `${(completedTasks / totalTasks) * 100}%`,
              backgroundColor: accentColor
            }}
          />
        </div>

        <div className="hero-buttons">
          {!showInput && (
            <>
              <button
                className="primary-btn"
                onClick={() => setShowInput(true)}
                style={{ borderColor: accentColor }}
              >
                + Create Task
              </button>

              <button
                className="create-theme-btn"
                onClick={() => setShowThemeModal(true)}
                disabled={themes.length >= 7}
              >
                {themes.length >= 7 ? "Max 7 Themes" : "+ Create Theme"}
              </button>

              {themes.length > 0 && (
                <div className="theme-quick-list">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      className="theme-pill"
                      style={{ backgroundColor: theme.color }}
                      type="button"
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="filter-group">
            <button
              className={filter === "all" ? "active-filter" : ""}
              onClick={() => setFilter("all")}
              style={filter === "all" ? { borderColor: accentColor } : undefined}
            >
              All
            </button>

            <button
              className={filter === "todo" ? "active-filter" : ""}
              onClick={() => setFilter("todo")}
              style={filter === "todo" ? { borderColor: accentColor } : undefined}
            >
              Todo
            </button>

            <button
              className={filter === "done" ? "active-filter" : ""}
              onClick={() => setFilter("done")}
              style={filter === "done" ? { borderColor: accentColor } : undefined}
            >
              Done
            </button>
          </div>

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

              <button className="create-confirm" onClick={handleSubmit} style={{ backgroundColor: accentColor }}>
                Add
              </button>

              <button className="create-cancel" onClick={() => setShowInput(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="products">
        {tasks.length === 0 && <p className="empty-state">No tasks yet</p>}

        {tasks.map((task) => (
          <div key={task.id} className="product-card">
            <h2>{task.title}</h2>
            <p>Status: {task.status}</p>

            <span className={`priority-badge priority-${task.priority}`}>
              {task.priority.toUpperCase()}
            </span>

            <div className="card-actions">
              <button onClick={() => toggleStatus(task)}>Toggle</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
