import React from 'react';

const TodoList = ({ todos, onUpdate, onDelete }) => (
    <div className="mt-4 space-y-4">
        {todos.length > 0 ? (
            todos.map((todo) => (
                <div
                    key={todo._id}
                    className="p-6 bg-gray-800 text-white shadow-md rounded-lg"
                >
                    {/* Task Header */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{todo.title}</h3>
                        <div className="flex space-x-2">
                            {/* Task Status Badge */}
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    todo.status === 'completed'
                                        ? 'bg-green-600 text-green-100'
                                        : 'bg-yellow-500 text-yellow-100'
                                }`}
                            >
                                {todo.status === 'completed' ? 'Completed' : 'In Progress'}
                            </span>
                            {/* Priority Badge */}
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    todo.priority === 'high'
                                        ? 'bg-red-600 text-red-100'
                                        : todo.priority === 'medium'
                                        ? 'bg-blue-600 text-blue-100'
                                        : 'bg-green-600 text-green-100'
                                }`}
                            >
                                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                            </span>
                        </div>
                    </div>

                    {/* Task Details */}
                    <div className="mt-2 text-sm space-y-2">
                        {todo.description && <p className="text-gray-400">{todo.description}</p>}
                        <p className="text-gray-300">
                            <span className="font-medium">Category:</span>{' '}
                            {todo.category || 'N/A'}
                        </p>
                        <p className="text-gray-300">
                            <span className="font-medium">Due Date:</span>{' '}
                            {todo.dueDate
                                ? new Date(todo.dueDate).toLocaleDateString()
                                : 'Not Set'}
                        </p>
                        <p className="text-gray-300">
                            <span className="font-medium">Estimated Time:</span>{' '}
                            {todo.estimatedTime ? `${todo.estimatedTime} hours` : 'Not Provided'}
                        </p>
                        {todo.attachment && (
                            <p className="text-gray-300">
                                <span className="font-medium">Attachment:</span>{' '}
                                <a
                                    href={todo.attachment} // Ensure correct URL path
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 underline"
                                >
                                    View File
                                </a>
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex space-x-2">
                        {todo.status !== 'completed' && (
                            <button
                                onClick={() =>
                                    onUpdate(todo._id, {
                                        ...todo,
                                        status: 'completed',
                                    })
                                }
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                title="Mark as Completed"
                            >
                                Complete
                            </button>
                        )}
                        <button
                            onClick={() => onDelete(todo._id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            title="Delete Task"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-gray-500 text-center">No tasks available.</p>
        )}
    </div>
);

export default TodoList;
