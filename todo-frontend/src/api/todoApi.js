import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/todos'; // Adjust for deployment

// Create an Axios instance
const API = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Get all todos
export const getTodos = async () => {
    const response = await API.get('/');
    return response.data;
};

// Add a new todo
export const addTodo = async (todo) => {
    const response = await API.post('/', todo);
    return response.data;
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
    const response = await API.put(`/${id}`, updatedTodo);
    return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
    const response = await API.delete(`/${id}`);
    return response.data;
};
