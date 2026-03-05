const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const task = require("../controllers/task.controller");

router.use(auth);
router.post("/", task.create);
router.get("/", task.list);
router.patch("/:id", task.update);
router.delete("/:id", task.remove);

module.exports = router;
