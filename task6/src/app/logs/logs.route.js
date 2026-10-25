const express = require("express");
const controller = require("./logs.controller");

const router = express.Router();
router.post("/", controller.addLog);

module.exports = router;
