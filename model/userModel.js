const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	accessToNotifications: {
		type: Boolean,
		default: true,
	},
	mobile: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: function (v) {
				return /^\d{10}$/.test(v);
			},
			message: (props) => `${props.value} is not a valid phone number!`,
		},
	},

	email: {
		type: String,
		required: false,
	},

	dateOfRegistration: {
		type: Date,
		default: Date.now,
	},
	lastEdit: {
		type: Date,
	},
	imageForAvatar: {
		type: String,
	},
	role: {
		type: String,
		default: "user",
	},
	isActive: {
		type: Boolean,
		default: true,
		required: false,
	},
});

const otpSchema = new mongoose.Schema({
	mobile: {
		type: String,
		unique: true,
		required: true,
	},
	otp: {
		type: String,
	},
	otpCount: {
		type: Number,
		default: 1,
	},
	OtpSent: {
		type: Date,
		default: Date.now(),
	},
});

userSchema.post("save", function (error, doc, next) {
	if (error.name === "MongoError" && error.code === 11000) {
		next(
			new Error("Mobile number already exists. Please use a different one.")
		);
	} else {
		next(error);
	}
});

// Hash password before saving to database
userSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) {
			return next();
		}

		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);

		return next();
	} catch (error) {
		return next(error);
	}
});

userSchema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	User: mongoose.model("User", userSchema),
	Otp: mongoose.model("Otp", otpSchema),
};
// module.exports = mongoose.model("User", otpSchema);
