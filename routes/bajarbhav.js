const express = require("express");
const router = express.Router();
const { getAllMarketPrice } = require("../controller/bajarbhav");

router.route("/").get(getAllMarketPrice);

module.exports = router;
