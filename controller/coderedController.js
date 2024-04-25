const CodeRed = require("../model/coderedModel");

exports.getCodeRed = async (req, res) => {
	CodeRed.find({ isActive: 1 })
		.then((responce) => {
			res.json({
				statusCode: 200,
				data: responce,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};