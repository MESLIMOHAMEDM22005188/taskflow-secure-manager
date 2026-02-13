const taskService = require("../services/TaskService");

exports.create = async (req, res) => {
  try {
    const task = await taskService.create(req.user.userId, req.body);
    res.status(201).json({ message: "Task created", task });
  } catch (e) {
    if (e.message === "NotFound") return res.status(404).json({ message: "Task not found" });
    return res.status(400).json({ message: e.message || "Bad request" });
  }
};

exports.list = async (req, res) => {
  const tasks = await taskService.list(req.user.userId);
  res.json({ tasks });
};

exports.update = async (req, res) => {
  try {
    const task = await taskService.update(req.user.userId, req.params.id, req.body);
    res.json({ message: "Task updated", task });
  } catch (e) {
    if (e.message === "NotFound") return res.status(404).json({ message: "Task not found" });
    return res.status(400).json({ message: e.message || "Bad request" });
  }
};

exports.remove = async (req, res) => {
  try {
    await taskService.remove(req.user.userId, req.params.id);
    res.json({ message: "Task deleted" });
  } catch (e) {
    if (e.message === "NotFound") return res.status(404).json({ message: "Task not found" });
    return res.status(400).json({ message: e.message || "Bad request" });
  }
};
