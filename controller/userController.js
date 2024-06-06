require("dotenv").config();
const bcrypt = require("bcrypt");
const axios = require("axios");
const { User, Otp } = require("../model/userModel");
const { sendOTP, verifyOTP } = require("otpless-node-js-auth-sdk");

// Registration route
exports.register = async (req, res, next) => {
	try {
		const user = new User({
			fname: req.body.fname,
			lname: req.body.lname,
			mobile: req.body.mobile,
			lastEdit: Date.now(),
			imageForAvatar: req.body.imageForAvatar,
		});
		console.log(
			process.env.OTP_LESS_ClientID,
			process.env.OTP_LESS_ClientSecret
		);
		const savedUser = await user.save();
		if (savedUser) {
			const response = await sendOTP(
				"+91" + req.body.mobile,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				process.env.OTP_LESS_ClientID,
				process.env.OTP_LESS_ClientSecret
			);
			console.log(response);
			return res.status(200).json({
				orderId: response.orderId,
				message: "register successfully",
			});
		} else {
			return res.status(200).json({
				orderId: response.orderId,
				message: "something went wrong",
			});
		}
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.verifyOTP = async (req, res) => {
	const response = await verifyOTP(
		undefined,
		"+91" + req.body.mobile,
		req.body.orderId,
		req.body.otp,
		process.env.OTP_LESS_ClientID,
		process.env.OTP_LESS_ClientSecret
	);

	if (response.isOTPVerified) {
		const user = await User.findOne({ mobile: req.body.mobile });
		if (user) {
			return res.status(200).json({
				isVerified: true,
				data: {
					fname: user.fname,
					lname: user.lname,
					imageForAvatar: user.imageForAvatar,
					_id: user._id,
					dateOfRegistration: user.dateOfRegistration,
					mobile: user.mobile,
					accessToNotifications: user.accessToNotifications,
				},
			});
		} else {
			return res.status(200).json({
				msg: "user not found",
			});
		}
	} else {
		return res.status(200).json({
			isVerified: false,
			msg: response.reason || response.errorMessage,
		});
	}
};

exports.checkUser = async (req, res) => {
	function isMarathiNumber(numberString) {
		const marathiDigitRegex = /[\u0966-\u096F]/;
		return marathiDigitRegex.test(numberString);
	}

	function marathiToEnglishOrOriginal(numberString) {
		if (isMarathiNumber(numberString)) {
			const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
			const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
			let englishNumber = "";
			for (let i = 0; i < numberString.length; i++) {
				const index = marathiDigits.indexOf(numberString[i]);
				if (index !== -1) {
					englishNumber += englishDigits[index];
				} else {
					englishNumber += numberString[i];
				}
			}
			return englishNumber;
		} else {
			return numberString;
		}
	}
	const mobile = marathiToEnglishOrOriginal(req.params.id);
	try {
		const user = await User.findOne({
			mobile: mobile,
		});
		if (!user) {
			return res.status(200).json({
				orderId: "null",
				message: "user not found",
			});
		} else {
			const response = await sendOTP(
				"+91" + mobile,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				process.env.OTP_LESS_ClientID,
				process.env.OTP_LESS_ClientSecret
			);
			console.log(response);

			return res.status(200).json({
				orderId: response.orderId,
				message: "user found",
			});
		}
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).send("Internal server error");
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { mobile, newPassword, otp } = req.body;
		const user = await User.findOne({ mobile });
		if (!user) {
			return res.status(404).send({ message: "User not found." });
		}
		if (user.otp !== otp) {
			return res.status(400).send({ message: "Invalid OTP." });
		}
		user.password = newPassword;
		await user.save();
		return res.status(200).send({ message: "Password reset successful." });
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Internal Server Error" });
	}
};

// Update User route
exports.updateUser = async (req, res) => {
	try {
		// Find user by ID
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).send("User not found");
		}

		// Check if password matches
		const isPasswordMatch = await bcrypt.compare(
			req.body.currentPassword,
			user.password
		);

		if (!isPasswordMatch) {
			return res.status(401).send("Incorrect password");
		}

		// Hash new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

		// Update user fields
		user.name = req.body.name || user.name;
		user.mobile = req.body.mobile || user.mobile;
		user.gender = req.body.gender || user.gender;
		user.password = hashedPassword || user.password;
		user.lastEdit = Date.now();
		user.imageForAvatar = req.body.imageForAvatar || user.imageForAvatar;

		// Save updated user to database
		const updatedUser = await user.save();

		res.status(200).send(updatedUser);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).send("Internal server error");
	}
};

exports.updateUser = async (req, res) => {
	try {
		// Find user by ID
		const user = await User.findById(req.body.id);
		console.log(user);
		if (!user) {
			return res.status(404).send("User not found");
		}

		// Update user fields
		user.fname = req.body.fname || user.fname;
		user.lname = req.body.lname || user.lname;
		user.lastEdit = Date.now();
		user.imageForAvatar = req.body.imageForAvatar || user.imageForAvatar;

		// Save updated user to database
		const updatedUser = await user.save();

		res.status(200).send({ isActive: true, data: updatedUser });
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).send("Internal server error");
	}
};
