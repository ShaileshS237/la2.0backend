const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

router.get("/addLike/:postId/:userId", postController.addLike);
router.get("/disLike/:postId/:userId", postController.dislikePost);
router.get("/getComment/:postId", postController.getCommetsById);
router.get("/:userId", postController.getAllPosts);
router.post("/create", postController.createPost);
router.post("/addComment/:postId/:userId", postController.addComment);
router.get("/:id", postController.getPostById);
router.delete("/deletePost/:id", postController.deletePostById);
// router.get("/:postId", postController.getCommentsByPostId);

module.exports = router;
