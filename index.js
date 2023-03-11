const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const News = require("./model/news");
const Market = require("./model/bajarbhav");
require("./connection/db.js");

const app = express();
app.use(express.json());

const bajarbhav_route = require("./routes/bajarbhav");
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

var transporter = nodemailer.createTransport({
  service: "gmail",
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

// app.get("/news", (req, res) => {
//   News.find()
//     .then((news) => {
//       res.json({
//         message: news,
//       });
//     })
//     .catch((err) => {
//       res.json({
//         message: err,
//       });
//     });
// });

app.use("/bajarbhav", bajarbhav_route);

// app.get("/bajarbhav", (req, res) => {});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
