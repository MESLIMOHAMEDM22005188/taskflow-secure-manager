const prisma = require("../config/prisma");
const Task = require("../domain/Task");
const NotFoundError = require("../errors/NotFoundError");

class TaskService {

  async create(userId, data) {
    const task = new Task({ ...data });
    task.validate();

    return prisma.task.create({
      data: {
        title: task.title,
        priority: task.priority?.toUpperCase(),
        completed: false,
        userId: Number(userId),
        themeId: data.themeId || null
      },
select: {
  id: true,
  title: true,
  priority: true,
  completed: true,
  createdAt: true,
  theme: {
    select: {
      id: true,
      name: true,
      color: true
    }
  }
}    });
  }

  async list(userId) {
  return prisma.task.findMany({
    where: { userId: Number(userId) },
    select: {
      id: true,
      title: true,
      priority: true,
      completed: true,
      createdAt: true,
      theme: {
        select: {
          id: true,
          name: true,
          color: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

  async update(userId, id, data) {

  const existing = await prisma.task.findFirst({
    where: { id: Number(id), userId: Number(userId) }
  });

  if (!existing) {
    throw new NotFoundError("Task not found");
  }

  return prisma.task.update({
    where: { id: Number(id) },
    data: {
      completed: data.completed ?? existing.completed,
      title: data.title ?? existing.title,
      priority: data.priority
        ? data.priority.toUpperCase()
        : existing.priority,
      themeId: data.themeId ?? existing.themeId
    },
    include: {
      theme: {
        select: {
          id: true,
          name: true,
          color: true
        }
      }
    }
  });
}

  async remove(userId, id) {
    const existing = await prisma.task.findFirst({
      where: { id, userId: Number(userId) }
    });

    if (!existing) {
      throw new NotFoundError("Task not found");
    }

    await prisma.task.delete({
      where: { id }
    });
  }
}

module.exports = new TaskService();