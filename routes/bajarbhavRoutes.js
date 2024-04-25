const express = require("express");
const router = express.Router();
const bajarbhavController = require("../controller/bajarbhavController");

router.route("/").get(bajarbhavController.getAllMarketPrice);
router.route("/update").post(bajarbhavController.updateMarketPrice);
module.exports = router;
