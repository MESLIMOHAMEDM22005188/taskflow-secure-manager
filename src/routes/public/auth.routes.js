const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth");
const validateBody = require("../../middlewares/validateBody");

const userController = require("../../controllers/user.controller");
const { updateUsernameSchema, updatePasswordSchema } = require("../../validators/userValidator");

router.use(auth);

router.get("/me", userController.getProfile);

router.patch(
  "/username",
  validateBody(updateUsernameSchema),
  userController.updateUsername
);

router.patch(
  "/password",
  validateBody(updatePasswordSchema),
  userController.updatePassword
);

module.exports = router;