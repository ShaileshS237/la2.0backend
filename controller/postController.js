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
			console.log(err);
			res.status(500).send("Internal server error");
		});
};

exports.addComment = async (req, res, next) => {
	const postId = req.params.postId;
	console.log(postId, req.body);

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
		console.log(newComment);

		const savedComment = await newComment.save();

		res.status(201).json({
			success: true,
			data: savedComment,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			error: "Server error",
		});
	}
};

// Add Like route /:postId/likes
exports.addLike = async (req, res) => {
	const { postId, userId } = req.params;
	console.log(req.params);
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
		console.log(like);
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
		const totalPost = await Post.find();
		const allPost = await Post.find()
			.skip(limit)
			.limit(10)
			.sort({ dateTime: -1 })
			.populate({ path: "userId", select: "fname lname" });

		for (const post of allPost) {
			const likes = await PostLike.findOne({
				postId: post._id,
				userId: userId,
			});
			post.likedByUser = !!likes;
		}
		res.status(200).json({
			status: "success",
			totalPages: totalPost.length,
			data: {
				allPost,
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
