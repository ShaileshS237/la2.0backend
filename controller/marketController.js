const {
	Market,
	Buysell,
	Buynsellcategory,
	MarketList,
	Rating,
	RequestCategory,
	BuySellComment,
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

exports.requestCategory = async (req, res) => {
	console.log(req.body);
	const newCategoryRequest = new RequestCategory(req.body);
	newCategoryRequest
		.save()
		.then((response) => {
			res.json({
				code: 200,
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
				code: 200,
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

	try {
		const marketInfo = await MarketList.aggregate([
			{ $match: { categoryId: id } },
			{
				$lookup: {
					from: "ratings", // The name of the Rating collection in MongoDB
					localField: "_id",
					foreignField: "storeId",
					as: "ratings",
				},
			},
		]);

		res.json({
			data: marketInfo,
		});
	} catch (err) {
		res.json({
			message: err.message,
		});
	}
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
		.populate({ path: "userId", select: "fname lname imageForAvatar" })
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

exports.addBuySellPost = async (req, res) => {
	const newBuynSell = new Buysell(req.body);
	newBuynSell
		.save({})
		.then((response) => {
			res.json({
				code: 200,
				data: response,
			});
		})
		.catch((err) => {
			res.json({
				message: err,
			});
		});
};

exports.getBuySellPost = async (req, res) => {
	Buysell.find({})
		.populate({ path: "userId", select: "fname lname imageForAvatar mobile" })
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

exports.addComment = async (req, res) => {
	const { comment, postId, userId } = req.body;

	console.log(postId, userId, comment);

	try {
		const post = await Buysell.find({ postId: postId });

		if (!post) {
			return res.status(404).json({
				success: false,
				error: "Post not found",
			});
		}

		const { comment } = req.body;

		if (!comment) {
			return res.status(400).json({
				success: false,
				error: "Comment is required",
			});
		}

		const newComment = new BuySellComment({
			postId: postId,
			comment: comment,
			userId: userId,
		});

		const savedComment = await newComment.save();

		res.status(201).json({
			success: true,
			data: savedComment,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: "Server error",
		});
	}
};

exports.getAllComments = async (req, res) => {
	const { postId } = req.params;
	BuySellComment.find({ postId: postId })
		.populate({ path: "userId", select: "fname lname imageForAvatar mobile" })
		.then((response) => {
			res.json({
				data: response,
			});
		});
};
