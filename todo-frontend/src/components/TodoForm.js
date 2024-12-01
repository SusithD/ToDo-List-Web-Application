import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ title, description, priority, dueDate, status: 'pending' });
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow-md rounded-lg space-y-4"
        >
            <div>
                <label className="block font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
            </div>
            <div>
                <label className="block font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
            </div>
            <div>
                <label className="block font-medium text-gray-700">Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <label className="block font-medium text-gray-700">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Add Task
            </button>
        </form>
    );
};

export default TodoForm;
