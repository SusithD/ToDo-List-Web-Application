import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/todoApi';

const TodoDashboard = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all'); // Filter: 'all', 'completed', 'in-progress'
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodos = async () => {
            const data = await getTodos();
            setTodos(data);
            setLoading(false);
        };
        fetchTodos();
    }, []);

    const handleAdd = async (todo) => {
        const newTodo = await addTodo(todo);
        setTodos([...todos, newTodo]);
    };

    const handleUpdate = async (id, updatedTodo) => {
        const updated = await updateTodo(id, updatedTodo);
        setTodos(todos.map((todo) => (todo._id === id ? updated : todo)));
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter((todo) => todo._id !== id));
    };

    const filteredTodos = todos.filter((todo) => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'completed' && todo.status === 'completed') ||
            (filter === 'in-progress' && todo.status !== 'completed');
        const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalTasks = todos.length;
    const completedTasks = todos.filter((todo) => todo.status === 'completed').length;
    const inProgressTasks = totalTasks - completedTasks;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar setFilter={setFilter} />
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <Navbar />

                {/* Hero Section */}
                <section className="relative bg-blue-500 text-white py-20">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://unsplash.com/photos/a-laptop-and-a-charger-l7idyRTQePY)' }}></div>
                    <div className="relative z-10 text-center">
                        <h1 className="text-4xl font-bold mb-4">Welcome to Your Todo Dashboard</h1>
                        <p className="text-xl mb-6">Stay organized, track your tasks, and get things done!</p>
                        <a href="#tasks" className="px-6 py-3 bg-blue-700 rounded-lg text-lg hover:bg-blue-800 transition duration-300">Start Managing Tasks</a>
                    </div>
                </section>

                {/* Summary Section */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white shadow-md rounded-lg text-center">
                        <h3 className="text-lg font-semibold">Total Tasks</h3>
                        <p className="text-2xl font-bold">{totalTasks}</p>
                    </div>
                    <div className="p-4 bg-white shadow-md rounded-lg text-center">
                        <h3 className="text-lg font-semibold">Completed Tasks</h3>
                        <p className="text-2xl font-bold">{completedTasks}</p>
                    </div>
                    <div className="p-4 bg-white shadow-md rounded-lg text-center">
                        <h3 className="text-lg font-semibold">In-Progress Tasks</h3>
                        <p className="text-2xl font-bold">{inProgressTasks}</p>
                    </div>
                </div>

                {/* Task Management Section */}
                <div className="p-6">
                    <TodoForm onAdd={handleAdd} />
                    {loading ? (
                        <div className="text-center py-6">
                            <div className="loader border-t-4 border-blue-500"></div>
                            <p>Loading tasks...</p>
                        </div>
                    ) : filteredTodos.length === 0 ? (
                        <div className="text-center py-6">
                            <p className="text-gray-500">No tasks match your criteria.</p>
                        </div>
                    ) : (
                        <TodoList
                            todos={filteredTodos}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoDashboard;
