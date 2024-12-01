import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import CalendarView from '../components/CalendarView';
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
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <Sidebar setFilter={setFilter} />
            
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <Navbar />

                {/* Hero Section */}
                <section className="relative bg-blue-700 text-white py-32 px-6 lg:px-24">
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <div
                        className="absolute inset-0 bg-cover bg-center z-0"
                        style={{
                            backgroundImage: 'url(todo-frontend/src/assests/dlxmedia-hu-l7idyRTQePY-unsplash.jpg)',
                        }}
                    ></div>
                    <div className="relative z-10 text-center text-white">
                        <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight tracking-wide">
                            Welcome to Your Todo Dashboard
                        </h1>
                        <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
                            Stay organized, track your tasks, and get things done—Effortlessly manage your work and life.
                        </p>
                        <a
                            href="#tasks"
                            className="inline-block px-8 py-4 bg-blue-800 text-lg font-semibold text-white rounded-lg shadow-xl hover:bg-blue-900 hover:scale-105 transform transition duration-300 ease-in-out"
                        >
                            Start Managing Tasks
                        </a>
                    </div>
                </section>

                {/* Summary Section */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-800 shadow-md rounded-lg text-center">
                        <h3 className="text-lg font-semibold">Total Tasks</h3>
                        <p className="text-2xl font-bold">{totalTasks}</p>
                    </div>
                    <div className="p-4 bg-gray-800 shadow-md rounded-lg text-center">
                        <h3 className="text-lg font-semibold">Completed Tasks</h3>
                        <p className="text-2xl font-bold">{completedTasks}</p>
                    </div>
                    <div className="p-4 bg-gray-800 shadow-md rounded-lg text-center">
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

                {/* Calendar Section */}
                <CalendarView todos={todos} />
            </div>
        </div>
    );
};

export default TodoDashboard;
