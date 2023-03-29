const express = require("express");
const router = express.Router();
const { getBloodDonar } = require("../controller/blooddonar");

router.route("/").get(getBloodDonar);
router.route("/:id").get(getBloodDonar);

module.exports = router;
