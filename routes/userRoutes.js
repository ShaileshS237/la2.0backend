const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/resetPassword", userController.resetPassword);
router.get("/checkUser/:id", userController.checkUser);
router.post("/verifyOTP", userController.verifyOTP);
router.post("/register", userController.register);
router.post("/update", userController.updateUser);

// router.post("/login", userController.login);
router.put("/:id", userController.updateUser);

module.exports = router;
