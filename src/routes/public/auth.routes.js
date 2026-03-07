const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth.controller");

console.log("📡 AUTH ROUTES LOADED");

// REGISTER
router.post("/register", (req, res, next) => {
  console.log("📥 POST /api/auth/register");
  console.log("BODY:", req.body);
  next();
}, authController.register);

// LOGIN
router.post("/login", (req, res, next) => {
  console.log("📥 POST /api/auth/login");
  console.log("BODY:", req.body);
  next();
}, authController.login);

module.exports = router;