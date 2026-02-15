const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("\n========== AUTH CHECK ==========");

  const header = req.headers.authorization;
  console.log("Authorization header:", header);

  if (!header || !header.startsWith("Bearer ")) {
    console.log("❌ No Bearer token found");
    return res.status(401).json({ message: "Missing token" });
  }

  const token = header.split(" ")[1];
  console.log("Token extracted:", token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token valid");
    console.log("Payload:", payload);

    req.user = { ...payload, userId: String(payload.userId) };
    next();

  } catch (err) {
    console.log("❌ JWT ERROR:", err.name);
    console.log("Error message:", err.message);

    if (err.name === "TokenExpiredError") {
      console.log("⚠️ TOKEN EXPIRED");
      return res.status(401).json({
        message: "Session expired. Please login again."
      });
    }

    return res.status(401).json({
      message: "Invalid token"
    });
  }
};
