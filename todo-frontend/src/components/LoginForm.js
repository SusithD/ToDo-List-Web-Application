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
                navigate('/dashboard');
            } else {
                setError('Login failed: User data not returned.');
            }
        } catch (err) {
            setError(err?.response?.data?.msg || err?.message || 'Something went wrong');
        }
    };

    return (
        <div>
            <div className="w-full max-w-lg p-8 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-2xl rounded-lg">
                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4 animate-pulse">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500"
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
                            className="w-full p-4 bg-gray-800 text-white border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-400"
                    >
                        Login
                    </button>
                </form>

                {/* Forgot Password Link */}
                <div className="mt-4 text-center">
                    <a
                        href="/forgot-password"
                        className="text-sm text-purple-400 hover:text-purple-600 transition-all duration-200"
                    >
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
