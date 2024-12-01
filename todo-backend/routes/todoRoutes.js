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
        const { title, description, status, priority, dueDate, category, estimatedTime, attachment } = req.body;

        // Create a new todo with the new fields
        const newTodo = new Todo({
            title,
            description,
            status,
            priority,
            dueDate,
            category,
            estimatedTime,
            attachment,
        });

        // Save and respond with the created todo
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

// Update an existing todo (example)
router.put('/:id', async (req, res) => {
    try {
        const { title, description, status, priority, dueDate, category, estimatedTime, attachment } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                status,
                priority,
                dueDate,
                category,
                estimatedTime,
                attachment,
            },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

module.exports = router;
