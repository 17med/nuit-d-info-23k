// models/userResponse.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userResponseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  selectedChoice: {
    type: Schema.Types.ObjectId,
    ref: 'Choice',
  },
});

const UserResponse = mongoose.model('UserResponse', userResponseSchema);

module.exports = UserResponse;