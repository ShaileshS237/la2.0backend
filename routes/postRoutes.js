const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

router.get("/addLike/:postId/:userId", postController.addLike);
router.get("/getComment/:postId", postController.getCommetsById);
router.get("/:page/:limit/:userId", postController.getAllPosts);
router.post("/create", postController.createPost);
router.post("/addComment/:postId", postController.addComment);
router.get("/:id", postController.getPostById);
// router.get("/:postId", postController.getCommentsByPostId);

module.exports = router;
