// routes/userResponse.js
const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Question = require('../models/question');
const UserResponse = require('../models/userResponse');

// routes/userResponse.js
router.post('/submit/:pseudo', async (req, res) => {
  try {
    const { pseudo } = req.params;
    const user = await User.findOne({ pseudo });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userResponses = req.body;

    // Validate the request body structure
    if (!userResponses || typeof userResponses !== 'object') {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const questionIds = Object.keys(userResponses);

    // Delete existing UserResponse entries for the specified questions and user
    await UserResponse.deleteMany({ userId: user._id, questionId: { $in: questionIds } });

    // Find all questions in a single database query
    const questions = await Question.find({ _id: { $in: questionIds } }).populate('choices');

    if (questions.length !== questionIds.length) {
      return res.status(404).json({ message: 'One or more questions not found' });
    }

    let totalScore = 0;

    for (const questionId of questionIds) {
      const selectedChoiceId = userResponses[questionId];
      const question = questions.find(q => q._id.toString() === questionId);

      if (!question) {
        return res.status(404).json({ message: `Question with ID ${questionId} not found` });
      }

      const selectedChoice = question.choices.find(choice => choice._id.toString() === selectedChoiceId);

      if (!selectedChoice) {
        return res.status(404).json({ message: `Choice with ID ${selectedChoiceId} not found for the question` });
      }

      // Save user response
      const userResponse = new UserResponse({
        userId: user._id,
        questionId,
        selectedChoice: selectedChoice._id,
      });

      await userResponse.save();

      // Increment totalScore based on selectedChoice.points
      totalScore += selectedChoice.points;
    }

    // Increment the user's score
    user.score += totalScore;
    await user.save();

    res.status(200).json({ message: 'User responses submitted successfully', totalScore, userScore: user.score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// routes/question.js
router.get('/with-choices', async (req, res) => {
    try {
      const questions = await Question.find().populate('choices', 'text');
  
      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: 'No questions found' });
      }
  
      const questionsWithChoices = questions.map(question => {
        return {
          _id: question._id,
          text: question.text,
          choices: question.choices.map(choice => ({ _id: choice._id, text: choice.text })),
        };
      });
  
      res.status(200).json(questionsWithChoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;