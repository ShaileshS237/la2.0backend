const { bloodonar, reqBld, bdCamp } = require("../model/blooddonarModel");

exports.getBloodDonar = async (req, res) => {
	const id = req.params.id;
	console.log(id);
	if (id === "all") {
		bldGroup = ["A+", "B+", "A-", "B-", "AB+", "AB-", "O+", "O-"];
	} else {
		bldGroup = [id];
	}
	bloodonar
		.find({ bldGroup: { $in: bldGroup } })
		.populate({ path: "userId", select: "fname lname mobile" })
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
	const blooddonar = bloodonar(req.body);

	blooddonar
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
	bloodonar
		.find({ userId: id })
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
	reqBld
		.find({ userId: { $ne: req.params.id } })
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
			console.log(err);
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
			console.log(err);
			res.json({
				message: err,
			});
		});
};

exports.updateStatus = async (req, res) => {
	const { id, isAvailable } = req.body;
	try {
		const updatedData = await bloodonar.findOneAndUpdate(
			{ _id: id },
			{ isAvailable: isAvailable },
			{ new: true }
		);
		res.json({ data: updatedData });
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
};
