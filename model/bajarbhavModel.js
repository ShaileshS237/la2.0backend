const mongoose = require("mongoose");

let bajarbhavSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	order: String,
	name: String,
	name_en: String,
	translation_key: String,
	imgURL: String,
	bgColor: String,
	minPrice: Number,
	maxPrice: Number,
	lastUpdate: String,
});

module.exports = mongoose.model("bajarbhav", bajarbhavSchema);
