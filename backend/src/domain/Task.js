class Task {
  constructor({ id, title, description = null, status = "todo", priority = "medium", dueDate = null }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.dueDate = dueDate;
  }

  validate() {
    if (!this.title || this.title.trim().length < 2) throw new Error("Title too short");
    const allowedStatus = ["todo", "in_progress", "done"];
    const allowedPriority = ["low", "medium", "high"];
    if (!allowedStatus.includes(this.status)) throw new Error("Invalid status");
    if (!allowedPriority.includes(this.priority)) throw new Error("Invalid priority");
  }
}

module.exports = Task;
