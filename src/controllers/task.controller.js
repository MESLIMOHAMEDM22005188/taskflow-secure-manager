const taskService = require("../services/TaskService");

exports.create = async (req, res) => {
  try {
    console.log("CREATE TASK BODY:", req.body);
    const task = await taskService.create(req.user.userId, req.body);
    res.status(201).json({ message: "Task created", task });
  } catch (e) {
    console.error("CREATE TASK ERROR:", e);
    if (e.message === "NotFound") return res.status(404).json({ message: "Task not found" });
    return res.status(400).json({ message: e.message || "Bad request" });
  }
};

exports.list = async (req, res) => {

  try {

    console.log("📥 GET /api/tasks");
    console.log("👤 USER:", req.user);

    const tasks = await taskService.list(req.user.userId);

    console.log("📦 TASKS FOUND:", tasks.length);

    res.json(tasks);

  } catch (error) {

    console.error("🔥 TASK LIST ERROR");
    console.error("MESSAGE:", error.message);
    console.error("STACK:", error.stack);

    res.status(500).json({
      message: "Server error while loading tasks",
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    console.log("UPDATE TASK:", req.params.id, req.body);
    const task = await taskService.update(req.user.userId, req.params.id, req.body);
    res.json({ message: "Task updated", task });
  } catch (e) {
    console.error("UPDATE TASK ERROR:", e);
    if (e.message === "NotFound") return res.status(404).json({ message: "Task not found" });
    return res.status(400).json({ message: e.message || "Bad request" });
  }
};

exports.remove = async (req, res) => {
  try {
    console.log("DELETE TASK:", req.params.id);
    await taskService.remove(req.user.userId, req.params.id);
    res.json({ message: "Task deleted" });
  } catch (e) {
    console.error("DELETE TASK ERROR:", e);
    if (e.message === "NotFound") return res.status(404).json({ message: "Task not found" });
    return res.status(400).json({ message: e.message || "Bad request" });
  }
};