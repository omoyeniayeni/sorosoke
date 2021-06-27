const mongoose = require("mongoose");

const SavedTranscriptSchema = new mongoose.Schema({
  user_id: String,
  topic: String,
  transcript: String,
  timeUsed: {
    type: Number,
    default: 0,
  },
  speed: {
    type: Number,
    default: 0,
  },
  pauses: {
    type: Number,
    default: 0,
  },
  pauseRate: {
    type: Number,
    default: 0,
  },
  pauseTime: {
    type: Number,
    default: 0,
  },
  speechDelay: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("savedTranscript", SavedTranscriptSchema);
