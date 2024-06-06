const { Post, Comment, PostLike } = require("../model/postModel");
const { User } = require("../model/userModel");

// Create post route
exports.createPost = (req, res) => {
	const post = new Post({
		userId: req.body.userId,
		image: req.body.image,
		noOfLikes: req.body.noOfLikes || 0,
		noOfShares: req.body.noOfShares || 0,
		postDescription: req.body.postDescription,
		dateTime: req.body.dateTime || new Date(),
	});

	post
		.save()
		.then(() => {
			res.status(201).json({
				code: 201,
				message: "post created",
			});
		})
		.catch((err) => {
			res.status(500).send("Internal server error");
		});
};

exports.addComment = async (req, res, next) => {
	const postId = req.params.postId;

	try {
		const post = await Post.find({ postId: postId });

		if (!post) {
			return res.status(404).json({
				success: false,
				error: "Post not found",
			});
		}

		const { comment } = req.body;

		if (!comment) {
			return res.status(400).json({
				success: false,
				error: "Comment is required",
			});
		}

		const newComment = new Comment({
			postId: postId,
			comment: comment,
		});

		const savedComment = await newComment.save();

		res.status(201).json({
			success: true,
			data: savedComment,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error",
		});
	}
};

// Add Like route /:postId/likes
exports.addLike = async (req, res) => {
	const { postId, userId } = req.params;
	try {
		const alreadyLike = await PostLike.findOne({
			postId: postId,
			userId: userId,
		});
		if (alreadyLike) {
			return res
				.status(400)
				.json({ success: false, message: "You have already liked this post" });
		}

		const payLoad = {
			userId: userId,
			postId: postId,
		};
		const like = new PostLike(payLoad);
		await like.save();
		const post = await Post.findOneAndUpdate(
			{ _id: postId },
			{ $inc: { noOfLikes: 1 } },
			{ new: true, upsert: true }
		);
		if (!post) {
			return res.status(404).json({
				success: false,
				error: "Post not found",
			});
		}

		return res.json({
			success: true,
			data: "Like done",
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err,
		});
	}
};

exports.getAllPosts = async (req, res) => {
	try {
		const userId = req.params.userId;
		const limit = parseInt(req.params.limit);

		// Fetch all posts with necessary information in one query
		const allPost = await Post.find()
			.skip(limit)
			.limit(10)
			.sort({ dateTime: -1 })
			.populate({ path: "userId", select: "imageForAvatar fname lname" });

		// Fetch all likes by the user in one query
		const userLikes = await PostLike.find({ userId: userId });

		// Create a set of liked post IDs for quick lookup
		const likedPostIds = new Set(
			userLikes.map((like) => like.postId.toString())
		);

		// Add likedByUser property to each post
		const updatedPosts = allPost.map((post) => {
			post = post.toObject(); // Convert Mongoose document to plain object
			post.likedByUser = likedPostIds.has(post._id.toString());
			return post;
		});

		res.status(200).json({
			status: "success",
			totalPages: allPost.length,
			data: {
				allPost: updatedPosts,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.getCommetsById = async (req, res) => {
	const postId = req.params.postId;
	try {
		const post = await Comment.find({ postId: postId });
		if (!post) {
			return res.status(404).json({
				success: false,
				error: "Post not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: post,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.getPostById = async (req, res) => {
	const postId = req.params.id;

	try {
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({
				success: false,
				error: "Post not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: post,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.deletePostById = async (req, res) => {
	const postId = req.params.id;

	try {
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		await Comment.deleteMany({ postId: postId });
		await PostLike.deleteMany({ postId: postId });
		await Post.deleteOne({ _id: postId });
		return res.status(200).json({ message: "Post deleted successfully" });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

// View comment on post by Id route
exports.getCommentsByPostId = (req, res) => {
	const postId = req.params.postId;

	Comment.find(
		{
			postId: postId,
		},
		(err, comments) => {
			if (err) {
				return res.status(500).json({
					success: false,
					error: "Server error",
				});
			}

			if (!comments) {
				return res.status(404).json({
					success: false,
					error: "Comments not found",
				});
			}

			return res.status(200).json({
				success: true,
				data: comments,
			});
		}
	);
};

exports.dislikePost = async (req, res) => {
	try {
		const userId = req.params.userId;
		const postId = req.params.postId;

		// Remove the like from the PostLike collection
		const like = await PostLike.findOneAndDelete({ userId, postId });

		if (!like) {
			return res.status(404).json({
				status: "fail",
				message: "Like not found",
			});
		}

		// Decrease the like count in the Post collection
		await Post.findByIdAndUpdate(postId, { $inc: { noOfLikes: -1 } });

		res.status(200).json({
			status: "success",
			message: "Dislike successful and like count decremented",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};
