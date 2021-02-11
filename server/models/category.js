const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category: String,
  topics: [String],
});

module.exports = mongoose.model("category", CategorySchema);
