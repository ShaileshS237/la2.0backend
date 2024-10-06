const { blooddonar, reqBld, bdCamp } = require("../model/blooddonarModel");

exports.getBloodDonar = async (req, res) => {
	const id = req.params.id;
	const group = req.params.group;
	const emergency = req.params.emergency === "true";
	if (emergency) {
		emergencyStatus = [true];
	} else {
		emergencyStatus = [true, false];
	}
	if (group === "all") {
		bldGroup = ["A+", "B+", "A-", "B-", "AB+", "AB-", "O+", "O-"];
	} else {
		bldGroup = [group];
	}
	blooddonar
		.find({
			bldGroup: { $in: bldGroup },
			userId: { $ne: id },
			isAvailable: true,
			emergencyDonar: emergencyStatus,
		})
		.populate({ path: "userId", select: "fname lname imageForAvatar mobile " })
		.then((result) => {
			res.json({
				data: result,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

exports.addBloodDonar = async (req, res) => {
	const bloodDonar = blooddonar(req.body);
	bloodDonar
		.save()
		.then((result) => {
			res.json({
				code: 200,
				data: result,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

exports.getBdDonar = async (req, res) => {
	const id = req.params.id;
	blooddonar
		.find({ userId: id }) // Find entries where userId is not equal to the provided id
		.then((result) => {
			res.json({
				data: result,
			});
		})
		.catch((err) => {
			res.json({
				message: err.message || "An error occurred while fetching data.",
			});
		});
};

exports.requestBlood = async (req, res) => {
	const newReq = new reqBld(req.body);
	newReq
		.save()
		.then((result) => {
			res.json({
				data: result,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

exports.allBloodRequest = async (req, res) => {
	if (req.params.type === "all") {
		reqBld
			.find({ userId: { $ne: req.params.id } })
			.populate({
				path: "userId",
				select: "fname lname imageForAvatar mobile ",
			})
			.then((result) => {
				res.json({
					data: result,
				});
			})
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	} else {
		reqBld
			.find({ userId: req.params.id })
			.populate({
				path: "userId",
				select: "fname lname imageForAvatar mobile ",
			})
			.then((result) => {
				res.json({
					data: result,
				});
			})
			.catch((err) => {
				res.json({
					message: err,
				});
			});
	}
};

exports.addBloodCamp = async (req, res) => {
	const bloodCampDetails = new bdCamp(req.body);

	bloodCampDetails
		.save()
		.then((result) => {
			res.json({
				data: result,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

exports.getAllBdCamp = async (req, res) => {
	bdCamp
		.find()
		.then((result) => {
			res.json({
				data: result,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

exports.updateStatus = async (req, res) => {
	const { id, isAvailable } = req.body;
	try {
		if (!id) {
			return res.status(400).json({ message: "ID is required" });
		}
		const updatedData = await blooddonar.findOneAndUpdate(
			{ userId: id },
			{ isAvailable: isAvailable },
			{ new: true }
		);
		if (!updatedData) {
			return res
				.status(404)
				.json({ message: "No document found with this ID" });
		}
		res.json({ data: updatedData });
	} catch (err) {
		res.status(500).json({ message: "An error occurred", error: err.message });
	}
};

exports.deleteRequest = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await reqBld.findByIdAndDelete(id);
		if (!result) {
			return res.status(404).json({ message: "Record not found" });
		}
		res.status(200).json({ message: "Record deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.deleteDonar = async (req, res) => {
	try {
		const { userId } = req.params;
		const result = await blooddonar.findOneAndDelete({ userId });
		console.log(result);
		if (!result) {
			return res.status(404).json({ message: "Record not found" });
		}
		res.status(200).json({ message: "Record deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.getEmergencyBloodDonar = async (req, res) => {
	const id = req.params.id;

	try {
		const emergencyStatus = [true]; // Only fetch emergency donors

		const result = await reqBld
			.find({
				userId: { $ne: id },
				isEmergency: emergencyStatus,
			})
			.populate({
				path: "userId",
				select: "fname lname imageForAvatar mobile",
			});

		res.json({
			data: result,
		});
	} catch (err) {
		res.json({
			message:
				err.message || "An error occurred while fetching emergency donors.",
		});
	}
};
