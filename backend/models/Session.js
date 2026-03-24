const mongoose = require('mongoose');

const KeystrokeSchema = new mongoose.Schema({
  down: Number,
  up: Number
});

const PasteSchema = new mongoose.Schema({
  timestamp: Number,
  textLength: Number
});

const SessionSchema = new mongoose.Schema({
  userId: String,
  content: String,
  keystrokes: [KeystrokeSchema],
  pastes: [PasteSchema],
  analysis: {
    score: Number,
    averageDwellTime: String,
    consistencyMetric: String,
    flags: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);
