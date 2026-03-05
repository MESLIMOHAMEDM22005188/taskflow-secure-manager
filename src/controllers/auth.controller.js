const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const existing = await prisma.user.findUnique({
      where: { username }
    });
    const { registerSchema } = require("../validators/authValidator");

const result = registerSchema.safeParse(req.body);

if (!result.success) {
  return res.status(400).json({ error: result.error.errors });
}

    if (existing) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword
      }
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Account created",
      token
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("===== LOGIN ATTEMPT =====");
    console.log("BODY:", req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "Missing fields" });
    }

    console.log("🔍 Searching user:", username);

    const user = await prisma.user.findUnique({
      where: { username }
    });

    console.log("USER FROM DB:", user);

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("🔐 Comparing passwords...");
    const ok = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", ok);

    if (!ok) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password correct, generating token");

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("TOKEN GENERATED");

    return res.json({
      message: "Login ok",
      token
    });

  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};