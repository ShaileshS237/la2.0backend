const express = require("express");
const router = express.Router();
const { getCodeRed } = require("../controller/codered");

router.route("/").get(getCodeRed);

module.exports = router;
