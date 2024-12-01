import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api/todoApi';

const App = () => {
    const [todos, setTodos] = useState([]);

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

    return (
        <div>
            <Header />
            <TodoForm onAdd={handleAdd} />
            <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>
    );
};

export default App;
