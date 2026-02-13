// TaskView.jsx (English button label + disable if empty)

export function TaskView({
  tasks,
  title,
  setTitle,
  addTask,
  deleteTask,
  toggleStatus,
  error,
  loading,
  setFilter,
  logout
}) {
  const getStatusColor = (status) => (status === "done" ? "#16a34a" : "#f59e0b");
  const getPriorityColor = (priority) => {
    if (priority === "high") return "#dc2626";
    if (priority === "medium") return "#2563eb";
    return "#6b7280";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TaskFlow</h1>
      <button
        onClick={logout}
        style={{ ...styles.secondaryBtn, position: "absolute", top: "20px", right: "20px" }}
      >
        Logout
      </button>

      {error && <p style={styles.error}>{error}</p>}
      {loading && <p>Loading...</p>}

      <div style={styles.createBox}>
        <input
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={addTask}
          style={styles.primaryBtn}
          disabled={!title.trim()}
        >
          Add
        </button>
      </div>

      {setFilter && (
        <div style={styles.filterBox}>
          <button onClick={() => setFilter("all")} style={styles.filterBtn}>All</button>
          <button onClick={() => setFilter("todo")} style={styles.filterBtn}>Todo</button>
          <button onClick={() => setFilter("done")} style={styles.filterBtn}>Done</button>
        </div>
      )}

      <div>
        {tasks.map((task) => (
          <div key={task.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3>{task.title}</h3>
              <div>
                <span style={{ ...styles.badge, backgroundColor: getStatusColor(task.status) }}>
                  {task.status}
                </span>
                <span style={{ ...styles.badge, backgroundColor: getPriorityColor(task.priority) }}>
                  {task.priority}
                </span>
              </div>
            </div>

            <p style={styles.description}>{task.description || "No description"}</p>

            {(toggleStatus || deleteTask) && (
              <div style={styles.buttonRow}>
                {toggleStatus && (
                  <button onClick={() => toggleStatus(task)} style={styles.secondaryBtn}>
                    Toggle
                  </button>
                )}
                {deleteTask && (
                  <button onClick={() => deleteTask(task.id)} style={styles.deleteBtn}>
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
    header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    logoutBtn: { padding: "6px 12px", backgroundColor: "#e5e7eb", border: "none", borderRadius: "5px", cursor: "pointer" }, 
  container: { maxWidth: "800px", margin: "50px auto", fontFamily: "Arial, sans-serif" },
  title: { textAlign: "center", marginBottom: "30px" },
  createBox: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ddd" },
  primaryBtn: { padding: "10px 15px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  filterBox: { marginBottom: "20px", display: "flex", gap: "10px" },
  filterBtn: { padding: "6px 12px", borderRadius: "20px", border: "1px solid #ddd", cursor: "pointer" },
  card: { background: "#f9fafb", padding: "15px", borderRadius: "8px", marginBottom: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  description: { marginTop: "8px", color: "#555" },
  badge: { padding: "4px 8px", borderRadius: "20px", color: "white", fontSize: "12px", marginLeft: "8px" },
  buttonRow: { marginTop: "10px", display: "flex", gap: "10px" },
  secondaryBtn: { padding: "6px 12px", backgroundColor: "#e5e7eb", border: "none", borderRadius: "5px", cursor: "pointer" },
  deleteBtn: { padding: "6px 12px", backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  error: { color: "red", marginBottom: "10px" }
};
