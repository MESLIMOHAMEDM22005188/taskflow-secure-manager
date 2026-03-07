const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth");
const validateBody = require("../../middlewares/validateBody");

const userController = require("../../controllers/user.controller");
const { updateUsernameSchema, updatePasswordSchema } = require("../../validators/userValidator");

// Profile
router.get("/me", auth, userController.getProfile);

// Update username
router.patch(
  "/username",
  auth,
  validateBody(updateUsernameSchema),
  userController.updateUsername
);

// Update password
router.patch(
  "/password",
  auth,
  validateBody(updatePasswordSchema),
  userController.updatePassword
);

module.exports = router;