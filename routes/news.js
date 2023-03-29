const express = require("express");
const router = express.Router();
const { getAllNews } = require("../controller/news");

router.route("/").get(getAllNews);
router.route("/").get(getAllNews);

module.exports = router;
