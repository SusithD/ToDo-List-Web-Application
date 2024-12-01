const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Add a new todo
router.post('/', async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        const newTodo = new Todo({ title, description, status, priority, dueDate });
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

module.exports = router;
