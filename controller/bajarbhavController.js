const Market = require("../model/bajarbhavModel");

exports.getAllMarketPrice = async (req, res) => {
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

exports.updateMarketPrice = async (req, res) => {
	try {
		const marketData = req.body;

		// Loop through the market data and update each entry in the database
		for (const crop of marketData) {
			const filter = { _id: crop._id };
			const update = {
				minPrice: crop.minPrice,
				maxPrice: crop.maxPrice,
				lastUpdate: new Date(), // Update the lastUpdate field with current date
			};

			// Update the document in the Market collection
			await Market.findOneAndUpdate(filter, update);
		}

		// Send a success response
		res
			.status(200)
			.json({ status: 200, message: "Market prices updated successfully" });
	} catch (error) {
		// Handle errors
		console.error("Error updating market prices:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
