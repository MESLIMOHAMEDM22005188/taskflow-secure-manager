const express = require("express");
const cors = require("cors");

const authMiddleware = require("./src/middlewares/auth");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES PUBLIQUES
app.use("/api/auth", require("./src/routes/auth.routes"));

// ROUTES PROTÉGÉES
app.use("/api/tasks", authMiddleware, require("./src/routes/task.routes"));
app.use("/api/themes", authMiddleware, require("./src/routes/theme.routes"));
app.use("/api/users", authMiddleware, require("./src/routes/user.routes"));
app.use("/api/profile", authMiddleware, require("./src/routes/profile.routes"));
app.use(errorHandler);
const errorHandler = require("./src/middlewares/errorHandler");
module.exports = app;


