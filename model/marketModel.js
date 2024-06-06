const mongoose = require("mongoose");

let marketSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	image: {
		type: String,
		required: false,
	},
	title: {
		type: String,
		required: true,
	},
	title_marathi: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
});

let marketListSchema = new mongoose.Schema({
	image: {
		type: String,
		required: false,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	mobileNo: {
		type: String,
		required: true,
	},
	whatsAppNo: {
		type: String,
		required: true,
	},
	openTime: {
		type: String,
	},
	closeTime: {
		type: String,
	},
	address: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: false,
	},
	latitude: String,
	longitude: String,

	closedOnDay: {
		type: String,
	},
	categoryId: {
		type: String,
		required: true,
	},
	addedBy: {
		type: String,
		required: true,
	},
	addedOn: {
		type: Date,
		default: Date.now,
	},
});

let ratingSchema = new mongoose.Schema({
	storeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "MarketList",
	},
	userId: {
		type: String,
		ref: "User",
	},
	rating: Number,
	description: String,
	dateAdded: {
		type: Date,
		default: Date.now,
	},
});

let buySellSchema = new mongoose.Schema({
	image: {
		type: String,
		required: false,
	},
	category: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	whatsappno: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
		ref: "User",
	},
	addedOn: {
		type: Date,
		default: Date.now,
	},
});

let buynsellCategory = new mongoose.Schema({
	cid: Number,
	name: {
		type: String,
	},
});

// module.exports = mongoose.model("market", marketSchema);

module.exports = {
	Market: mongoose.model("Market", marketSchema),
	Buysell: mongoose.model("Buysell", buySellSchema),
	Buynsellcategory: mongoose.model("Buynsellcategory", buynsellCategory),
	MarketList: mongoose.model("MarketList", marketListSchema),
	Rating: mongoose.model("Rating", ratingSchema),
};
