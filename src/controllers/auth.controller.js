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
const jwtConfig = require("../config/jwt");

jwt.sign(payload, jwtConfig.accessSecret, {
  expiresIn: jwtConfig.accessExpiresIn
});      { expiresIn: "1d" }
    );


    return res.json({
      message: "Login ok",
      token
    });

  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};