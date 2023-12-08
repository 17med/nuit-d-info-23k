// models/question.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const choiceSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  choices: [choiceSchema],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;