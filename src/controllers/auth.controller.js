const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log("📥 REGISTER REQUEST BODY:", req.body);

  try {

    const { username, email, password } = req.body;

    console.log("🔎 Extracted fields:", { username, email, password });

    const existingUser = await prisma.user.findFirst({
      where: { email }
    });

    console.log("👤 Existing user:", existingUser);

    if (existingUser) {
      console.log("❌ EMAIL ALREADY EXISTS");
      return res.status(400).json({
        message: "Email already used"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("🔐 Password hashed");

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    console.log("✅ USER CREATED:", user.id);

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("🎟 TOKEN GENERATED");

    res.json({ token });

  } catch (err) {

    console.error("🔥 REGISTER SERVER ERROR:", err);

    res.status(500).json({
      message: "Registration failed",
      error: err.message
    });
  }
};
exports.login = async (req, res) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }


    const user = await prisma.user.findUnique({
      where: { username }
    });


    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);


    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    const token = jwt.sign(
      { userId: user.id, role: user.role },
      { expiresIn: "1d" }
    );

    const jwtConfig = require("../config/jwt");

jwt.sign(payload, jwtConfig.accessSecret, {
  expiresIn: jwtConfig.accessExpiresIn
});

    return res.json({
      message: "Login ok",
      token
    });

  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};