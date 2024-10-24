const express = require("express");
const router = express.Router();
const { createEvent } = require("../Controllers/eventController");

router.route("/").post(createEvent);

module.exports = router;
