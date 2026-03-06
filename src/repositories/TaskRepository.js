const prisma = require("../config/prisma");

class TaskRepository {
  async findByUser(userId) {
    return prisma.task.findMany({
      where: { userId },
      include: { theme: true },
      orderBy: { createdAt: "desc" }
    });
  }

  async create(data) {
    return prisma.task.create({
      data,
      include: { theme: true }
    });
  }

  async delete(id) {
    return prisma.task.delete({
      where: { id }
    });
  }
}

module.exports = new TaskRepository();const prisma = require("../config/prisma");

class TaskRepository {
  async findByUser(userId) {
    return prisma.task.findMany({
      where: { userId },
      include: { theme: true },
      orderBy: { createdAt: "desc" }
    });
  }

  async create(data) {
    return prisma.task.create({
      data,
      include: { theme: true }
    });
  }

  async delete(id) {
    return prisma.task.delete({
      where: { id }
    });
  }
}

module.exports = new TaskRepository();