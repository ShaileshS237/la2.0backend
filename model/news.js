const mongoose = require("mongoose");

let newsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
});

module.exports = mongoose.model("news", newsSchema);
