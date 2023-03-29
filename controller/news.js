const News = require("../model/news");

const getAllNews = async (req, res) => {
	News.find()
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

module.exports = { getAllNews };
