import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api/todoApi';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { AuthContext, AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/todos" element={<ProtectedTodoApp />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

// Protected Todo App
const ProtectedTodoApp = () => {
    const { token } = useContext(AuthContext);

    return token ? <TodoApp /> : <Navigate to="/signup" replace />;
};

// Todo Application Component
const TodoApp = () => {
    const [todos, setTodos] = React.useState([]);

    React.useEffect(() => {
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
