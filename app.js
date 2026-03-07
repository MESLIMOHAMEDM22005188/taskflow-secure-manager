const express = require("express");
const cors = require("cors");
const authMiddleware = require("./src/middlewares/auth");
const app = express();
const errorHandler = require("./src/middlewares/errorHandler");


app.use(cors());
app.use(express.json());

// ROUTES PUBLIQUES
app.use("/api/auth", require("./src/routes/public/auth.routes"));
app.use("/api/health", require("./src/routes/public/health.routes"));
// ROUTES PROTÉGÉES
app.use("/api/tasks", authMiddleware, require("./src/routes/private/task.routes"));
app.use("/api/themes", authMiddleware, require("./src/routes/private/theme.routes"));
app.use("/api/profile", authMiddleware, require("./src/routes/private/profile.routes"));
app.use(errorHandler);
module.exports = app;


