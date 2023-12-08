// routes/choice.js
const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Create a choice for a question
router.post('/:questionId/choice', async (req, res) => {
  try {
    const { text, points } = req.body;
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const choice = { text, points };
    question.choices.push(choice);

    await question.save();
    res.status(201).json(choice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all choices for a question
router.get('/:questionId/choice', async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question.choices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a choice by ID for a question
router.get('/:questionId/choice/:choiceId', async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const choice = question.choices.id(req.params.choiceId);

    if (!choice) {
      return res.status(404).json({ message: 'Choice not found' });
    }

    res.status(200).json(choice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a choice by ID for a question
router.put('/:questionId/choice/:choiceId', async (req, res) => {
  try {
    const { text, points } = req.body;
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const choice = question.choices.id(req.params.choiceId);

    if (!choice) {
      return res.status(404).json({ message: 'Choice not found' });
    }

    choice.text = text;
    choice.points = points;

    await question.save();
    res.status(200).json(choice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a choice by ID for a question
router.delete('/:questionId/choice/:choiceId', async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const choice = question.choices.id(req.params.choiceId);

    if (!choice) {
      return res.status(404).json({ message: 'Choice not found' });
    }

    choice.remove();

    await question.save();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;