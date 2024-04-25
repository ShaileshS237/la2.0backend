const express = require("express");
const router = express.Router();
const documentController = require("../controller/documentController");

router.route("/getPresignedURL").get(documentController.getPresignedURL);

module.exports = router;
