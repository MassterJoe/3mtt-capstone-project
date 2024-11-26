const Task = require('../models/Task');

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;

    const task = new Task({
      user: req.userId,
      title,
      description,
      deadline,
      priority,
    });

    await task.save();

    res.status(201).json({ message: 'Task created successfully!', task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, deadline, priority, status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: req.userId },
      { title, description, deadline, priority, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully!', updatedTask });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      user: req.userId,
    });

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
