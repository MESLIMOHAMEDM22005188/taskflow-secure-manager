class TaskDTO {
  static fromEntity(task) {
    return {
      id: task.id,
      title: task.title,
      priority: task.priority,
      completed: task.completed,
      theme: task.theme
        ? {
            id: task.theme.id,
            name: task.theme.name,
            color: task.theme.color
          }
        : null,
      createdAt: task.createdAt
    };
  }

  static fromEntities(tasks) {
    return tasks.map((task) => this.fromEntity(task));
  }
}

module.exports = TaskDTO;