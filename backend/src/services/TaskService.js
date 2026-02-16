const prisma = require("../config/prisma");
const Task = require("../domain/Task");

class TaskService {
  async create(userId, data) {
    const task = new Task({ ...data });
    task.validate();

    return prisma.task.create({
      data: {
        title: task.title,
        priority: task.priority,
        completed: false,
        userId: userId,
        themeId: data.themeId || null
      },
      include: {
        theme: true
      }
    });
  }

  async list(userId) {
    return prisma.task.findMany({
      where: { userId: String(userId) },
      include: { theme: true },
      orderBy: { createdAt: "desc" }
    });
  }

  async update(userId, id, data) {
    const existing = await prisma.task.findFirst({
      where: { id, userId: String(userId) }
    });

    if (!existing) throw new Error("NotFound");

    const task = new Task({ ...existing, ...data });
    task.validate();

    return prisma.task.update({
      where: { id },
      data: {
        completed: data.completed ?? existing.completed,
        title: task.title,
        priority: task.priority,
        themeId: data.themeId ?? existing.themeId
      },
      include: {
        theme: true
      }
    });
  }

  async remove(userId, id) {
    const existing = await prisma.task.findFirst({
    where: {id:id,  userId: userId }

    });

    if (!existing) throw new Error("NotFound");

    await prisma.task.delete({
      where: { id, userId: userId }
  
    });
  }
}

module.exports = new TaskService();
