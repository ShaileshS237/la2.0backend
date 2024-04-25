const mongoose = require("mongoose");

let codeRedSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	isActive: Number,
	message: String,
});

module.exports = mongoose.model("codered", codeRedSchema);