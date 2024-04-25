const mongoose = require("mongoose");

let blooddonarSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
		unique: true,
	},
	age: Number,
	bldGroup: String,
	gender: String,
	allergies: String,
	address: String,
	isAvailable: {
		type: Boolean,
		default: true,
	},
});

let reqBldSchema = new mongoose.Schema({
	userId: {
		type: String,
	},
	isEmergency: {
		type: Boolean,
		default: false,
	},
	bldGroup: String,
	address: String,
	message: String,
	date: {
		type: Date,
		default: Date.now,
	},
	isDelete: {
		type: Boolean,
		default: false,
	},
});

let bdCampSchema = new mongoose.Schema({
	title: String,
	campDate: String,
	campTimeFrom: String,
	campTimeTo: String,
	contactDet: String,
	address: String,
	date: {
		type: Date,
		default: Date.now,
	},
	organizedBy: String,
	description: String,
	image: String,
});

module.exports = {
	bloodonar: mongoose.model("bloodonar", blooddonarSchema),
	reqBld: mongoose.model("reqBld", reqBldSchema),
	bdCamp: mongoose.model("bdCamp", bdCampSchema),
};
