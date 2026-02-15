const { equal } = require("node:assert");
const prisma = require("../config/prisma");

class ThemeService {
  async create(userId, data) {
  if (!data.name || !data.color) {
    throw new Error("Name and color are required");
  }

  const trimmedName = data.name.trim();

  if (!trimmedName) {
    throw new Error("Theme name cannot be empty");
  }

  const formattedName =
    trimmedName.charAt(0).toUpperCase() +
    trimmedName.slice(1).toLowerCase();

  const existing = await prisma.theme.findFirst({
  where: {
    userId: String(userId),
    name: formattedName
  }
});


  if (existing) {
    throw new Error("Theme with this name already exists");
  }

  const count = await prisma.theme.count({
    where: { userId: String(userId) }
  });

  if (count >= 7) {
    throw new Error("Maximum of 7 themes allowed");
  }

  return prisma.theme.create({
    data: {
      name: formattedName,
      color: data.color,
      userId: String(userId)
    }
  });
}

    async list(userId) {
  return prisma.theme.findMany({
    where: { userId: String(userId) }
  });
}

    async remove(userId, id) {
  const existing = await prisma.theme.findFirst({
    where: { 
      id,
      userId: String(userId)
    }
  });

  if (!existing) {
    throw new Error("NotFound");
  }

  // 🔥 Détacher les tasks liées avant suppression
  await prisma.task.updateMany({
    where: { themeId: id },
    data: { themeId: null }
  });

  return prisma.theme.delete({
    where: { id }
  });
}

}

module.exports = new ThemeService();
    
