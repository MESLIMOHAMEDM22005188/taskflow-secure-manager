const prisma = require("../config/prisma");
const Task = require("../domain/Task");

class TaskService {
  async create(userId, data) {
    const task = new Task({ ...data });
    task.validate();

    return prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        userId
      }
    });
  }

  async list(userId) {
    return prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
  }

  async update(userId, id, data) {
    const existing = await prisma.task.findFirst({ where: { id: Number(id), userId } });
    if (!existing) throw new Error("NotFound");

    const task = new Task({ ...existing, ...data });
    task.validate();

    return prisma.task.update({
      where: { id: Number(id) },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority
      }
    });
  }

  async remove(userId, id) {
    const existing = await prisma.task.findFirst({ where: { id: Number(id), userId } });
    if (!existing) throw new Error("NotFound");
    await prisma.task.delete({ where: { id: Number(id) } });
  }
}

module.exports = new TaskService();
