const express = require("express");
const router = express.Router();
const coderedController = require("../controller/coderedController");


router.route("/").get(coderedController.getCodeRed);

module.exports = router;
