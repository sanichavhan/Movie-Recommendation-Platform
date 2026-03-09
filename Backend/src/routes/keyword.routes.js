const express = require("express");
const router = express.Router();
const keywordController = require("../controllers/keyword.controller");

router.get("/:id", keywordController.getMovieKeywords);

module.exports = router;