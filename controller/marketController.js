const {
	Market,
	Buysell,
	Buynsellcategory,
	MarketList,
	Rating,
} = require("../model/marketModel");

exports.getAllList = async (req, res) => {
	Market.find({})
		.then((response) => {
			res.json({
				data: response,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

exports.addMarketInfo = async (req, res) => {
	const newList = new MarketList(req.body);
	newList
		.save()
		.then((response) => {
			res.json({
				data: response,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};
exports.getAllMarketInfo = async (req, res) => {
	const { id } = req.params;
	MarketList.find({ categoryId: id })
		.populate("rating")
		.then((response) => {
			res.json({
				data: response,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};
exports.getShopInfo = async (req, res) => {
	const { id } = req.params;
	MarketList.findById(id)
		.then((response) => {
			res.json({
				data: response,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

exports.addRating = async (req, res) => {
	const newRating = new Rating(req.body);
	newRating
		.save({})
		.then((response) => {
			res.json({
				data: response,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

exports.getAllRating = async (req, res) => {
	const { id } = req.params;
	Rating.find({ storeId: id })
		.then((response) => {
			res.json({
				data: response,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

exports.getAllCategory = async (req, res) => {
	Buynsellcategory.find({})
		.then((response) => {
			res.json({
				data: response,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};
