import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 flex items-center justify-center">
            <div className="w-full max-w-lg p-8 bg-gray-900 text-white shadow-xl rounded-lg">
                <h1 className="text-3xl font-bold text-center text-white mb-8">Create a New Account</h1>
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;
