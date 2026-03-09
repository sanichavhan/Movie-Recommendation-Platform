const express = require("express");
const router = express.Router();
const peopleController = require("../controllers/people.controller");

router.get("/popular", peopleController.getPopularPeople);
router.get("/:id", peopleController.getPersonById);

module.exports = router;