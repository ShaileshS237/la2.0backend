const express = require("express");
const router = express.Router();
const newsController = require("../controller/newsController");

router.get("/allNews/:id", newsController.getAllNews);
router.post("/create", newsController.createNews);
router.get("/todayBreaking", newsController.breakingNews);
router.get("/allBreaking", newsController.allBreakingNews);
router.get("/view/:id", newsController.getNews);
router.get("/addLike/:id/:uid", newsController.addLike);
router.get("/addShare/:id", newsController.addShare);
router.patch("/update/:id", newsController.updateNews);

module.exports = router;
