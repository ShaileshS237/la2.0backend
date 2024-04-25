const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		maxlength: 100,
	},
	description: {
		type: String,
		required: true,
		trim: true,
		minlength: 10,
	},
	category: {
		type: String,
		required: true,
		trim: true,
	},
	image: {
		type: String,
		required: false,
		trim: true,
		// validate: {
		// 	validator: function (v) {
		// 		return /\.(gif|jpg|jpeg|tiff|png)$/i.test(v);
		// 	},
		// 	message: "Image URL must be valid",
		// },
	},
	isBreaking: {
		type: Boolean,
		required: true,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
	likes: {
		type: Number,
		default: 0,
	},
	share: {
		type: Number,
		default: 0,
	},
	view: {
		type: Number,
		default: 0,
	},
});

const likeSchema = new mongoose.Schema({
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

// module.exports = mongoose.model("News", newsSchema);

module.exports = {
	News: mongoose.model("News", newsSchema),
	Like: mongoose.model("Like", likeSchema),
};
