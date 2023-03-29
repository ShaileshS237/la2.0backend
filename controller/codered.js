const CodeRed = require("../model/codered");

const getCodeRed = async (req, res) => {
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

module.exports = { getCodeRed };
