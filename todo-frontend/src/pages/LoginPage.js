import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex items-center justify-center">
            <div className="w-full max-w-lg p-8 bg-gray-800 text-white shadow-2xl rounded-lg">
                <h1 className="text-4xl font-bold text-center mb-8">Welcome Back!</h1>
                <LoginForm />
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Don't have an account? 
                        <a href="/signup" className="text-blue-500 hover:text-blue-700 font-semibold"> Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
