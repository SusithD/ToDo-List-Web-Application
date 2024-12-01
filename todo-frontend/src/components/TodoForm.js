import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [attachment, setAttachment] = useState(null);

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            title,
            description,
            priority,
            dueDate,
            category,
            estimatedTime,
            attachment, // Include attachment if required in the backend
            status: 'pending',
        };
        onAdd(newTask);
        // Reset form fields
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        setCategory('');
        setEstimatedTime('');
        setAttachment(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow-md rounded-lg space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
            
            {/* Title Field */}
            <div>
                <label className="block font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter task title"
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
            </div>
            
            {/* Description Field */}
            <div>
                <label className="block font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the task"
                    rows={4}
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
            </div>
            
            {/* Priority Dropdown */}
            <div>
                <label className="block font-medium text-gray-700 mb-1">Priority</label>
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
            
            {/* Category Field */}
            <div>
                <label className="block font-medium text-gray-700 mb-1">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                >
                    <option value="" disabled>Select a category</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>
            
            {/* Due Date Field */}
            <div>
                <label className="block font-medium text-gray-700 mb-1">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
            </div>
            
            {/* Estimated Time Field */}
            <div>
                <label className="block font-medium text-gray-700 mb-1">Estimated Time (hours)</label>
                <input
                    type="number"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="e.g., 2"
                    className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                />
            </div>
            
            {/* Submit Button */}
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Add Task
            </button>
        </form>
    );
};

export default TodoForm;
