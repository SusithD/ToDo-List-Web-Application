import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext); // Assuming `user` is available in the context
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-800 shadow-md text-white">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                {/* Branding */}
                <div className="flex items-center space-x-4">
                    <div className="text-xl font-bold">My Todo App</div>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Profile and Menu */}
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <img
                            src="https://via.placeholder.com/40" // Replace with user's profile picture URL
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <span className="hidden md:block font-medium">
                            {user?.name || 'Guest'} {/* Dynamically display user's name */}
                        </span>
                        <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                onClick={() => alert('Profile clicked')} // Replace with actual profile navigation
                            >
                                Profile
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="block md:hidden px-4 py-2 bg-gray-700">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </nav>
    );
};

export default Navbar;
