const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    dueDate: {
        type: Date,
    },
    category: {
        type: String, // e.g., 'work', 'personal', etc.
    },
    estimatedTime: {
        type: Number, // in hours (decimal if necessary)
    },
    attachment: {
        type: String, // URL to the attachment if any
    },
});

module.exports = mongoose.model('Todo', todoSchema);
