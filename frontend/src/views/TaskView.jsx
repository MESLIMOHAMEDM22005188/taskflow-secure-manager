import { useState } from "react";
import "../assets/css/TaskHome.css";

const DEFAULT_THEME_COLOR = "#1E3A8A";
const MAX_THEMES = 7;

export function TaskView({
  tasks = [],
  addTask,
  deleteTask,
  toggleStatus,
  logout,
  deleteTheme,
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
  const [newThemeColor, setNewThemeColor] = useState(DEFAULT_THEME_COLOR);
  const [selectedTheme, setSelectedTheme] = useState("");

  const accentColor = currentTheme?.color || DEFAULT_THEME_COLOR;

  const handleSubmit = () => {
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle,
      priority,
      themeId: selectedTheme || null
    });

    setNewTitle("");
    setShowInput(false);
  };

  const handleSaveTheme = async () => {
    if (!newThemeName.trim()) return;

    await createTheme(newThemeName, newThemeColor);
    setNewThemeName("");
    setNewThemeColor(DEFAULT_THEME_COLOR);
    setShowThemeModal(false);
  };

  const handleDeleteTheme = (themeId) => {
    deleteTheme(themeId);
  };

  const canAddMoreThemes = themes.length < MAX_THEMES;

  return (
    <div className="home">
      <header className="topbar">
        <div className="header-left">
          <button className="theme-btn" onClick={() => setShowThemeModal(true)}>
            My Themes
          </button>
          <button className="graph-btn">Chart</button>
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
              {themes.length === 0 && <p>No themes yet</p>}

              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className="theme-preview-item"
                  style={{ backgroundColor: theme.color }}
                >
                  <span>{theme.name}</span>
                  <button
                    className="delete-theme-btn"
                    onClick={() => handleDeleteTheme(theme.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {canAddMoreThemes && (
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
                disabled={!canAddMoreThemes}
              >
                {canAddMoreThemes ? "+ Create Theme" : `Max ${MAX_THEMES} Themes`}
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
            {["all", "todo", "done"].map((filterOption) => (
              <button
                key={filterOption}
                className={filter === filterOption ? "active-filter" : ""}
                onClick={() => setFilter(filterOption)}
                style={filter === filterOption ? { borderColor: accentColor } : undefined}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
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

              <select
                className="create-select"
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
              >
                <option value="">No Theme</option>
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>

              <button
                className="create-confirm"
                onClick={handleSubmit}
                style={{ backgroundColor: accentColor }}
              >
                Add
              </button>

              <button
                className="create-cancel"
                onClick={() => setShowInput(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="products">
        {tasks.length === 0 && <p className="empty-state">No tasks yet</p>}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="product-card"
            style={{
              borderLeft: task.theme?.color
                ? `6px solid ${task.theme.color}`
                : "6px solid #2f2f2f"
            }}
          >
            <h2>{task.title}</h2>

            {task.theme && (
              <p
                style={{
                  color: task.theme.color,
                  fontWeight: "500",
                  marginTop: "4px"
                }}
              >
                Theme: {task.theme.name}
              </p>
            )}

            <p>Status: {task.completed ? "Done" : "To Do"}</p>

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
