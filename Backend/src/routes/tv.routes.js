const express = require("express");
const router = express.Router();
const tvController = require("../controllers/tv.controller");

router.get("/trending", tvController.getTrendingTV);
router.get("/popular", tvController.getPopularTV);
router.get("/:id", tvController.getTVById);

module.exports = router;