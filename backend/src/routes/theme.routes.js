const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const themeController = require("../controllers/theme.controller");

router.use(auth);
router.post("/", themeController.create);
router.get("/", themeController.list);
router.delete("/:id", themeController.remove);

module.exports = router;
