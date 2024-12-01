import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/todoApi';

const TodoDashboard = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all'); // Filter: 'all', 'completed', 'in-progress'

    useEffect(() => {
        const fetchTodos = async () => {
            const data = await getTodos();
            setTodos(data);
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
        if (filter === 'all') return true;
        if (filter === 'completed') return todo.status === 'completed';
        if (filter === 'in-progress') return todo.status !== 'completed';
        return true;
    });

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar setFilter={setFilter} />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-6">
                    <TodoForm onAdd={handleAdd} />
                    <TodoList todos={filteredTodos} onUpdate={handleUpdate} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default TodoDashboard;
