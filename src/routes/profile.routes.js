const express = require("express");
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = require("../config/prisma");
const router = express.Router();

router.get("/dashboard", auth, async (req, res) => {
  try {
    const userId = req.userId;

    // User basic info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Task stats
    const totalTasks = await prisma.task.count({
      where: { userId }
    });

    const completedTasks = await prisma.task.count({
      where: {
        userId,
        completed: true
      }
    });

    const completionRate =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    // Themes
    const themes = await prisma.theme.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        color: true
      }
    });

    res.json({
      user,
      stats: {
        totalTasks,
        completedTasks,
        completionRate
      },
      themes
    });

  } catch (err) {
    console.error("❌ PROFILE DASHBOARD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;