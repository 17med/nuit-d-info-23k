// models/advice.js
const mongoose = require('mongoose');

const adviceSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  }
});

const Advice = mongoose.model('Advice', adviceSchema);

module.exports = Advice;