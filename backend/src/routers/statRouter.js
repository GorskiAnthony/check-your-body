const express = require("express");

const router = express.Router();

const statControllers = require("../controllers/statControllers");
const fileMiddleware = require("../middlewares/fileUpload");
const userMiddleware = require("../middlewares/userMiddleware");

router.get("/stats", userMiddleware, statControllers.getStats);
router.post("/stats", userMiddleware, fileMiddleware, statControllers.addStat);

module.exports = router;
