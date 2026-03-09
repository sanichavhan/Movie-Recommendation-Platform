const express = require("express");
const router = express.Router();
const discoverController = require("../controllers/discover.controller");

router.get("/", discoverController.discoverMovies);

module.exports = router;