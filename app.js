require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const {
	S3Client,
	GetObjectCommand,
	PutObjectAclCommand,
	PutObjectCommand,
} = require("@aws-sdk/client-s3");
require("./connection/db.js");

const app = express();
app.use(express.json());

const bajarbhav_route = require("./routes/bajarbhavRoutes.js");
const news_route = require("./routes/newsRoutes.js");
const codered_route = require("./routes/coderedRoutes.js");
const blooddonar_route = require("./routes/blooddonarRoutes.js");
const gupshup_route = require("./routes/postRoutes.js");
const market_route = require("./routes/marketRoutes.js");
const user_route = require("./routes/userRoutes.js");
const document_route = require("./routes/documentRoutes.js");

var corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));

var transporter = nodemailer.createTransport({
	service: "gmail ",
	auth: {
		user: "shailesh_32113223@nitkkr.ac.in",
		pass: "bhptmdtrnybdbetv",
	},
});

app.get("/", (req, res) => {
	res.json({
		message: "Welcome to LOVE ❤️ AKOT ",
	});
});

app.use("/bajarbhav", bajarbhav_route);
app.use("/news", news_route);
app.use("/codered", codered_route);
app.use("/blooddonar", blooddonar_route);
app.use("/gupshup", gupshup_route);
app.use("/market", market_route);
app.use("/user", user_route);
app.use("/document", document_route);
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
