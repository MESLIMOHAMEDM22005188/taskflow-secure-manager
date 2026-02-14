const prisma = require("../config/prisma");

class ThemeService {
    async create(userId, data) {
        if (!data.name || !data.color) {
            throw new Error("Name and color are required");
        }
        const count = await prisma.theme.count({ where: { userId } });
        if (count >= 7) {
            throw new Error("Maximum of 7 themes allowed");
        }
        return prisma.theme.create({
            data: {
                name: data.name,
                color: data.color,
                userId
            }
        });
    }

    async list(userId) {
  return prisma.theme.findMany({
    where: { userId: String(userId) },
  });
}

    async remove(userId, id) {
        const existing = await prisma.theme.findFirst({
            where: { id, userId }
        });

        if (!existing) throw new Error("NotFound");

        return prisma.theme.delete({
            where: { id }
        });
    }
}

module.exports = new ThemeService();
    
