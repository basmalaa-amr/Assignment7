const express = require("express");
const controller = require("./collection.controller");

const router = express.Router();

router.post("/books", controller.createBooks);
router.post("/authors", controller.createAuthors);
router.post("/logs/capped", controller.createCappedLogs);
router.post("/books/index", controller.createBooksIndex);

module.exports = router;
