const express = require("express");
const controller = require("./books.controller");

const router = express.Router();

router.post("/batch", controller.addManyBooks);
router.get("/title", controller.findByTitle);
router.get("/year", controller.findByYearRange);
router.get("/genre", controller.findByGenre);
router.get("/skip-limit", controller.skipLimitBooks);
router.get("/year-integer", controller.findIntegerYears);
router.get("/exclude-genres", controller.excludeGenres);
router.delete("/before-year", controller.deleteBeforeYear);
router.get("/aggregate1", controller.aggregate1);
router.get("/aggregate2", controller.aggregate2);
router.get("/aggregate3", controller.aggregate3);
router.get("/aggregate4", controller.aggregate4);
router.patch("/:title", controller.updateFutureBook);
router.post("/", controller.addBook);

module.exports = router;
