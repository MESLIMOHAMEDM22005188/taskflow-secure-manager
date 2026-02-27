const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const userController = require("../controllers/user.controller");

/*
|--------------------------------------------------------------------------
| All routes below require authentication
|--------------------------------------------------------------------------
*/

router.use(authMiddleware);

/*
|--------------------------------------------------------------------------
| Profile routes
|--------------------------------------------------------------------------
*/

// GET current user profile
router.get("/me", userController.getProfile);

// Update username
router.patch("/username", userController.updateUsername);

// Update password
router.patch("/password", userController.updatePassword);

module.exports = router;
 