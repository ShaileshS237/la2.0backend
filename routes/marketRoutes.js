const express = require("express");
const router = express.Router();
const marketController = require("../controller/marketController");

router.get("/getMarketList", marketController.getAllList);
router.post("/addMarketInfo", marketController.addMarketInfo);
router.get("/getAllMarketInfo/:id", marketController.getAllMarketInfo);
router.get("/getShopInfo/:id", marketController.getShopInfo);
router.post("/addRating", marketController.addRating);
router.get("/getAllRating/:id", marketController.getAllRating);
router.get("/getAllCategory", marketController.getAllCategory);
router.post("/addBuyPost", marketController.addBuySellPost);
router.get("/getBuyPost", marketController.getBuySellPost);

module.exports = router;
