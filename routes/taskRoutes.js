// routes/task.js
const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Task = require('../models/task');

// Create a task
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const task = new Task({ title, content });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/user/:pseudo', async (req, res) => {
    try {
        const user = await User.findOne({ pseudo: req.params.pseudo });

        if (!user || !user.tasks || user.tasks.length === 0) {
          return res.status(404).json({ error: "User doesn't have a task" });
        }
        const taskId = user.tasks[user.tasks.length - 1];
        const tasks = await Task.find({ _id: taskId });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Assign a task to a user
router.post('/assign/:pseudo', async (req, res) => {
    try {
      const { pseudo } = req.params;
  
      // Find the user by pseudo
      const user = await User.findOne({ pseudo });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.tasks.length>0) {
        return res.status(404).json({ message: 'User has already a task' });
      }
      // Get a random task not assigned to the user
      const task = await Task.findOne({ _id: { $nin: user.tasks } });
  
      if (!task) {
        return res.status(404).json({ message: 'No available tasks' });
      }
  
      // Assign the task to the user
      user.tasks.push(task._id);
      await user.save();
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Complete a task and increment the user's score
router.put('/complete/:pseudo/:taskId', async (req, res) => {
    try {
      const { pseudo, taskId } = req.params;
  
      // Find the user by pseudo
      const user = await User.findOne({ pseudo });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the task in the user's tasks
      const userTask = user.tasks.find(task => task._id.equals(taskId));
  
      if (!userTask) {
        return res.status(404).json({ message: 'Task not found for the user' });
      }
  
      // Check if the task is already completed
      if (userTask.completed) {
        return res.status(400).json({ message: 'Task already completed' });
      }
  
      // Check if enough time has passed since the last task completion
      const currentDate = new Date();
      const oneWeekAgo = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);
  
      if (user.lastTaskCompletionDate && user.lastTaskCompletionDate > oneWeekAgo) {
        return res.status(400).json({ message: 'Not enough time has passed since the last task completion' });
      }
  
      // Update the task status and increment the user's score
      userTask.completed = true;
      user.score += 1;
      user.lastTaskCompletionDate = currentDate;
    const task = await Task.findOne({ _id: { $nin: user.tasks } });
    if (!task) {
        return res.status(404).json({ message: 'No available tasks' });
      }
  
      // Assign the task to the user
      user.tasks.push(task._id);
    await user.save();

    res.status(200).json({ message: 'Task completed successfully', score: user.score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;