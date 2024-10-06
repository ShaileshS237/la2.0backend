const mongoose = require("mongoose");

let codeRedSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	isActive: Boolean,
	message: String,
	message_mr: String,
	dateAdded: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("codered", codeRedSchema);
