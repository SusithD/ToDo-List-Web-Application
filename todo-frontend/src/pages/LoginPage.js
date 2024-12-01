import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 flex items-center justify-center">
            <div className="w-full max-w-lg p-8 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-xl rounded-lg">
                <h1 className="text-4xl font-bold text-center text-white mb-8">Welcome Back!</h1>
                <LoginForm />
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-blue-400 hover:text-blue-600 font-semibold transition-all duration-200">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
