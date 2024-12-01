import React from 'react';

const TodoList = ({ todos, onUpdate, onDelete }) => (
    <div className="mt-4 space-y-4">
        {todos.length > 0 ? (
            todos.map((todo) => (
                <div
                    key={todo._id}
                    className="p-4 bg-white shadow-md rounded-lg"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold">{todo.title}</h3>
                            <p className="text-gray-600">{todo.description}</p>
                            <p className="text-sm text-gray-500">
                                Priority: <span className="font-medium">{todo.priority}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Due Date: <span className="font-medium">{new Date(todo.dueDate).toLocaleDateString()}</span>
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            {todo.status === 'pending' && (
                                <button
                                    onClick={() =>
                                        onUpdate(todo._id, {
                                            ...todo,
                                            status: 'completed',
                                        })
                                    }
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Complete
                                </button>
                            )}
                            <button
                                onClick={() => onDelete(todo._id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-gray-500">No tasks available.</p>
        )}
    </div>
);

export default TodoList;
