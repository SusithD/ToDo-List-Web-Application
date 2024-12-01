import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/todos'; // Adjust for deployment

// Get all todos
export const getTodos = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

// Add a new todo
export const addTodo = async (todo) => {
    const response = await axios.post(API_BASE_URL, todo);
    return response.data;
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTodo);
    return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};
