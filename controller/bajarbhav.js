const Market = require("../model/bajarbhav");

const getAllMarketPrice = async (req, res) => {
	Market.find()
		.then((bajarbhav) => {
			res.json({
				data: bajarbhav,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

module.exports = { getAllMarketPrice };
