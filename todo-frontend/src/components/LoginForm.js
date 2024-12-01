import React, { useState, useContext } from 'react';
import { loginUser } from '../api/authAPI';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ email, password });
            console.log("Response data:", data);  // Log the returned data
    
            // Check if user and token are present in the response
            if (data && data.user && data.token) {
                login(data.user, data.token);
                navigate('/todos');
            } else {
                setError('Login failed: User data not returned.');
            }
        } catch (err) {
            setError(err?.response?.data?.msg || err?.message || 'Something went wrong');
        }
    };
       

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
