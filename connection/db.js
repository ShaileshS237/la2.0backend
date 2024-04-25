const mongoose = require("mongoose");
// require("dotenv").config(); // to load environment variables from .env file

const uri = process.env.MONGODB_URL;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB database"))
	.catch((error) =>
		console.error("Error connecting to MongoDB database:", error)
	);
