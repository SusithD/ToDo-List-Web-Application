import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black flex items-center justify-center">
            <div className="w-full max-w-lg p-8 bg-gray-900 text-white shadow-xl rounded-lg">
                <h1 className="text-3xl font-bold text-center text-white mb-8">Create a New Account</h1>
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;
