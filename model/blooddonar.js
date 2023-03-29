const mongoose = require("mongoose");

let blooddonarSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	order: String,
	name: String,
	imgURL: String,
	bgColor: String,
	minPrice: Number,
	maxPrice: Number,
	lastUpdate: String,
});

module.exports = mongoose.model("bloodonar", blooddonarSchema);
