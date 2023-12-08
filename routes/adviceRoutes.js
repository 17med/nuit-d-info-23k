// routes/advice.js
const express = require('express');
const router = express.Router();
const adviceController = require('../controllers/adviceController');

// Create advice
router.post('/', adviceController.createAdvice)

// Get all advice
router.get('/', adviceController.getAllAdvice)

// Get advice by ID
router.get('/:id', adviceController.getAdviceById)

// Update advice by ID
router.put('/:id', adviceController.updateAdviceById)

// Delete advice by ID
router.delete('/:id', adviceController.deleteAdviceById)

// Endpoint to get advice based on initializationDate
router.get('/getData/:pseudo',adviceController.getData)

module.exports = router