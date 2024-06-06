const express = require("express");
const router = express.Router();
const blooddonarController = require("../controller/blooddonarController");

router.route("/getAllBdCamp").get(blooddonarController.getAllBdCamp);
router.route("/updateDonarStatus").post(blooddonarController.updateStatus);
router.route("/addBdDonar").post(blooddonarController.addBloodDonar);
router.route("/requestBld").post(blooddonarController.requestBlood);
router.route("/addBdCamp").post(blooddonarController.addBloodCamp);
router.route("/allBloodRequest/:id").get(blooddonarController.allBloodRequest);
router.route("/getBdDonar/:id").get(blooddonarController.getBdDonar);
router.route("/:id").get(blooddonarController.getBloodDonar);

module.exports = router;
