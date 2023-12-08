// controllers/adviceController.js
const Advice = require('../models/advice');
const User = require('../models/userSchema');
const { Types } = require('mongoose');

// Create advice
exports.createAdvice = async (req, res) => {
  try {
    const { content, id } = req.body;
    const advice = new Advice({ content, id });
    await advice.save();
    res.status(201).json(advice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all advice
exports.getAllAdvice = async (req, res) => {
  try {
    const adviceList = await Advice.find();
    res.status(200).json(adviceList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get advice by ID
exports.getAdviceById = async (req, res) => {
    try {
      const advice = await Advice.findById(Types.ObjectId(req.params.id));
      if (!advice) {
        return res.status(404).json({ message: 'Advice not found' });
      }
      res.status(200).json(advice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
// Update advice by ID
exports.updateAdviceById = async (req, res) => {
    try {
      const { content, id } = req.body;
      const advice = await Advice.findByIdAndUpdate(
        Types.ObjectId(req.params.id),
        { content, id },
        { new: true }
      );
      if (!advice) {
        return res.status(404).json({ message: 'Advice not found' });
      }
      res.status(200).json(advice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Delete advice by ID
exports.deleteAdviceById = async (req, res) => {
  try {
    const advice = await Advice.findByIdAndDelete(req.params.id);
    if (!advice) {
      return res.status(404).json({ message: 'Advice not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getData = async (req, res) => {
    try {
      const { pseudo } = req.params;
  
      // Find the user by pseudo
      const user = await User.findOne({ pseudo }).populate('advice');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check initializationDate
      const currentDate = new Date();
      const twentyFourHoursAgo = new Date(currentDate - 24 * 60 * 60 * 1000);
  
      if (!user.initializationDate || user.initializationDate < twentyFourHoursAgo) {
        // If it has been more than 24 hours, get a new advice
        const newAdvice = await Advice.findOne().skip(Math.floor(Math.random() * await Advice.countDocuments()));
        user.advice = newAdvice._id;
        user.initializationDate = currentDate;
        await user.save();
  
        res.status(200).json(newAdvice);
      } else {
        // If it's within 24 hours, return the current advice
        res.status(200).json(user.advice);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }}