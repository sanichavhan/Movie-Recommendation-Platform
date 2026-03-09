const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/media.controller");

router.get("/:id/images", mediaController.getMovieImages);
router.get("/:id/videos", mediaController.getMovieVideos);

module.exports = router;