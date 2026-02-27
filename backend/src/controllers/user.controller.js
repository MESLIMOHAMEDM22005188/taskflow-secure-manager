const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");



exports.getProfile = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.userId) },
      select: {
        id: true,
        username: true,
        role: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateUsername = async (req, res) => {
  const { username } = req.body;

  if (!username || username.length < 3) {
    return res.status(400).json({ message: "Invalid username" });
  }

  const existing = await prisma.user.findUnique({
    where: { username }
  });

  if (existing) {
    return res.status(400).json({ message: "Username already taken" });
  }

  await prisma.user.update({
    where: { id: req.user.userId },
    data: { username }
  });

  res.json({ message: "Username updated" });
};



exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.userId }
  });

  const match = await bcrypt.compare(currentPassword, user.password);

  if (!match) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: req.user.userId },
    data: { password: hashed }
  });

  res.json({ message: "Password updated" });
};


exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User created",
      user: { id: user.id, email: user.email },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
