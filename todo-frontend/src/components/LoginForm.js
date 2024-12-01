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
        <div >
            <div className="w-full max-w-lg p-8 bg-gray-800 text-white shadow-xl rounded-lg">
                {/* Error Message */}
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>

                {/* Forgot Password Link */}
                <div className="mt-4 text-center">
                    <a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
