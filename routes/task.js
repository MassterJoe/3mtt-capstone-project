const express = require('express');

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/task');
const { authenticate } = require('../middlewares/jwt');

const router = express.Router();

// Create a task (protected route)
router.post('/', createTask);

// Get all tasks for a user (protected route)
router.get('/', getTasks);

// Update a task (protected route)
router.put('/:taskId', updateTask);

// Delete a task (protected route)
router.delete('/:taskId', deleteTask);

module.exports = router;
