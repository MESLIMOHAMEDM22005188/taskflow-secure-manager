const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controller");

router.use(auth);

router.get("/me", userController.getProfile);
router.patch("/username", userController.updateUsername);
router.patch("/password", userController.updatePassword);

module.exports = router;
