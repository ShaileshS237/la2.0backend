const Bloodonar = require("../model/blooddonar");

const getBloodDonar = async (req, res) => {
	let bd_id = req.params.id;

	if (bd_id == 8) {
		Bloodonar.find()
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
		Bloodonar.find({ blgroup: bd_id })
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

module.exports = { getBloodDonar };
