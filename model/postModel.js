const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	noOfLikes: {
		type: Number,
		default: 0,
	},
	noOfShares: {
		type: Number,
		default: 0,
	},
	image: {
		type: String,
	},
	postDescription: {
		type: String,
		required: true,
	},
	dateTime: {
		type: Date,
		default: Date.now,
	},
});

const commentSchema = new mongoose.Schema({
	postId: {
		type: String,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	dateTime: {
		type: Date,
		default: Date.now,
	},
});

const postLikeSchema = new mongoose.Schema({
	postId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	dateTime: {
		type: Date,
		default: Date.now,
	},
});

module.exports = {
	Post: mongoose.model("Post", postSchema),
	PostLike: mongoose.model("postLike", postLikeSchema),
	Comment: mongoose.model("Comment", commentSchema),
};
