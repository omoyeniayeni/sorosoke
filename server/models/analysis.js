const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  user_id: String,
  transcriptId: String,
  timeUsed: Number,
  speed: Number,
  pauses: Number,
  pauseRate: Number,
  pauseTime: Number,
  date: {
    type: Date,
    default: Date.now,
  },
//   words: { repeatedWords: { word: String, synonyms: [String] } },
});

module.exports = mongoose.model("analysis", AnalysisSchema);
