const { News, Like } = require("../model/newsModel");

// Create News route
exports.createNews = async (req, res) => {
	try {
		const news = new News(req.body);
		await news.save();
		res.status(201).json({
			status: "success",
			data: {
				news,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.addLike = async (req, res) => {
	const { id, uid } = req.params;
	console.log(req.params);
	try {
		const findLike = await Like.findOne({ postId: id, userId: uid });
		if (findLike) {
			return res
				.status(400)
				.json({ success: false, message: "You have already liked this post" });
		}
		const payLoad = {
			userId: uid,
			postId: id,
		};
		const like = new Like(payLoad);
		await like.save();

		if (like) {
			const news = await News.findOneAndUpdate(
				{ _id: id },
				{ $inc: { likes: 1 } },
				{ new: true, upsert: true }
			);
			if (!news) {
				return res.status(404).json({
					success: false,
					error: "News not found",
				});
			}

			return res.json({
				success: true,
				data: news,
			});
		} else {
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			error: err,
		});
	}
};

exports.addShare = async (req, res) => {
	const { id } = req.params;
	try {
		const news = await News.findOneAndUpdate(
			{ _id: id },
			{ $inc: { share: 1 } },
			{ new: true, upsert: true }
		);
		if (!news) {
			return res.status(404).json({
				success: false,
				error: "News not found",
			});
		}

		return res.json({
			success: true,
			data: news,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			error: err,
		});
	}
};

// View News route
exports.getNews = async (req, res) => {
	const newsId = req.params.id;
	try {
		const news = await News.findById(newsId);
		res.status(200).json({
			status: "success",
			results: news.length,
			data: {
				news,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

// Update News route
exports.updateNews = async (req, res) => {
	try {
		const news = await News.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!news) {
			return res.status(404).json({
				status: "fail",
				message: "News not found",
			});
		}
		res.status(200).json({
			status: "success",
			data: {
				news,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};

// View All News route
exports.getAllNews = async (req, res) => {
	const id = req.params.id;
	try {
		let categories;
		if (id == 1) {
			categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		} else {
			categories = [id];
		}
		const news = await News.find({
			isBreaking: false,
			category: { $in: categories },
		}).sort({ date: -1 });
		res.status(200).json({
			status: "success",
			results: news.length,
			data: {
				news,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.breakingNews = async (req, res) => {
	try {
		const today = new Date(); // Get today's date
		today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

		const news = await News.find({
			isBreaking: true,
			date: {
				$gte: today, // Greater than or equal to today
				$lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Less than tomorrow
			},
		});

		res.status(200).json({
			status: "success",
			results: news.length,
			data: {
				news,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.allBreakingNews = async (req, res) => {
	try {
		const today = new Date(); // Get today's date
		today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

		const news = await News.find({
			isBreaking: true,
		}).sort({ date: -1 });

		res.status(200).json({
			status: "success",
			results: news.length,
			data: {
				news,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};
