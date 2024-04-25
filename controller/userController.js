require("dotenv").config();
const bcrypt = require("bcrypt");
const axios = require("axios");
const { User, Otp } = require("../model/userModel");
const { sendOTP, verifyOTP } = require("otpless-node-js-auth-sdk");

// Registration route
exports.register = async (req, res, next) => {
	try {
		console.log(req.body);
		const user = new User({
			fname: req.body.fname,
			lname: req.body.lname,
			mobile: req.body.mobile,
			lastEdit: Date.now(),
			colorForAvatar: req.body.colorForAvatar,
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
	console.log(req.body);
	console.log(process.env.OTP_LESS_ClientID, process.env.OTP_LESS_ClientSecret);
	const response = await verifyOTP(
		undefined,
		"+91" + req.body.mobile,
		req.body.orderId,
		req.body.otp,
		process.env.OTP_LESS_ClientID,
		process.env.OTP_LESS_ClientSecret
	);

	console.log(response);
	if (response.isOTPVerified) {
		const user = await User.findOne({ mobile: req.body.mobile });
		if (user) {
			return res.status(200).json({
				isVerified: true,
				data: {
					fname: user.fname,
					lname: user.lname,
					colorForAvatar: user.colorForAvatar,
					_id: user._id,
					dateOfRegistration: user.dateOfRegistration,
					mobile: user.mobile,
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

// Login route
// exports.login = async (req, res) => {
// 	try {
// 		// Find user by mobile number
// 		const user = await User.findOne({
// 			mobile: req.body.mobile,
// 		});
// 		if (!user) {
// 			return res.status(400).send({
// 				message: "User not found",
// 			});
// 		}

// 		// Check password using bcrypt
// 		const isValidPassword = await user.isValidPassword(req.body.password);
// 		if (!isValidPassword) {
// 			return res.status(400).send({
// 				message: "Invalid password",
// 			});
// 		}

// 		// Send user details
// 		res.send({
// 			_id: user._id,
// 			name: user.name,
// 			mobile: user.mobile,
// 			dateOfRegistration: user.dateOfRegistration,
// 			colorForAvatar: user.colorForAvatar,
// 		});
// 	} catch (error) {
// 		console.error("Error logging in user:", error);
// 		res.status(500).send("Internal server error");
// 	}
// };

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
		user.colorForAvatar = req.body.colorForAvatar || user.colorForAvatar;

		// Save updated user to database
		const updatedUser = await user.save();

		res.status(200).send(updatedUser);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).send("Internal server error");
	}
};

// try {

// 	const { mobile, otp } = req.body;
// 	const existingOTP = await Otp.findOne({ mobile });
// 	if (existingOTP) {
// 		if (existingOTP.otp === otp) {
// 			return res.status(200).send({ message: "OTP verification successful" });
// 		} else {
// 			return res.status(400).send({ message: "Invalid OTP" });
// 		}
// 	} else {
// 		return res
// 			.status(404)
// 			.send({ message: "No OTP found for the provided mobile number" });
// 	}
// } catch (error) {
// 	console.log(error);
// 	return res.status(500).send("Internal Server Error");
// }

// try {
// 	const existingOTP = await Otp.findOne({ mobile: req.body.mobile });

// 	if (existingOTP) {
// 		if (existingOTP.otpCount >= 3) {
// 			return res
// 				.status(400)
// 				.send(
// 					"You have reached the maximum limit for OTP requests. Please try again later."
// 				);
// 		}

// 		const currentTime = Date.now();
// 		const lastSentTime = existingOTP.OtpSent.getTime(); // Convert last sent time to milliseconds
// 		const timeDifference = currentTime - lastSentTime;

// 		if (timeDifference < 50000) {
// 			// 50 seconds in milliseconds
// 			return res
// 				.status(400)
// 				.send("Please wait for 50 seconds before requesting another OTP.");
// 		}

// 		const otp = Math.floor(10000 + Math.random() * 90000);

// 		// Call Fast2SMS API to send OTP
// 		const response = await axios.get(
// 			`https://www.fast2sms.com/dev/bulkV2?authorization=nv94XeyFKq8TBWb5lHRfPMjz3EAIs1UgZVN76tCpkGDaLY0wcJgd26aPS8pLD9EcTRz3KJOMeqCUGW0u&route=otp&variables_values=${1485}&flash=0&numbers=${
// 				req.body.mobile
// 			}`
// 		);

// 		if (response.data && response.data.return === true) {
// 			existingOTP.otp = otp;
// 			existingOTP.OtpSent = currentTime;
// 			existingOTP.otpCount = existingOTP.otpCount + 1;
// 			const updatedOTP = await existingOTP.save();
// 			return res.status(200).send(updatedOTP);
// 		} else {
// 			return res
// 				.status(500)
// 				.send("Failed to send OTP. Please try again later.");
// 		}
// 	} else {
// 		const newOTP = new Otp({
// 			mobile: req.body.mobile,
// 			otp: otp,
// 			OtpSent: Date.now(),
// 			otpCount: 1,
// 		});
// 		const otp = Math.floor(10000 + Math.random() * 90000);

// 		const response = await axios.get(
// 			`https://www.fast2sms.com/dev/bulkV2?authorization=nv94XeyFKq8TBWb5lHRfPMjz3EAIs1UgZVN76tCpkGDaLY0wcJgd26aPS8pLD9EcTRz3KJOMeqCUGW0u&route=otp&variables_values=${otp}&flash=0&numbers=${req.body.mobile}`
// 		);

// 		if (response.data && response.data.return === true) {
// 			const savedOTP = await newOTP.save();
// 			return res.status(201).send(savedOTP);
// 		} else {
// 			return res
// 				.status(500)
// 				.send("Failed to send OTP. Please try again later.");
// 		}
// 	}
// } catch (error) {
// 	console.log(error);
// 	return res.status(500).send("Internal Server Error");
// }
// try {
// 	const message = `Hi, Your OTP is : 8488`;

// 	const params = {
// 		Message: message,
// 		PhoneNumber: "+919850092824",
// 		MessageAttributes: {
// 			"AWS.SNS.SMS.SenderID": {
// 				DataType: "String",
// 				StringValue: "String", //
// 			},
// 		},
// 	};

// 	const command = new PublishCommand(params);
// 	const response = await sns.send(command);

// 	console.log("OTP sent successfully:", response);
// 	res.status(200).send("OTP sent successfully"); // Send success response to the client
// } catch (error) {
// 	console.error("Error sending OTP:", error);
// 	res.status(500).send("Error sending OTP"); // Send error response to the client
// }
