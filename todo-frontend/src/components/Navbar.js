import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState([
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNotificationClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <nav className="bg-gray-800 shadow-md text-white">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                {/* Search Bar */}
                <div className="hidden md:flex flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Profile, Notification, and Menu */}
                <div className="relative flex items-center space-x-4">
                    {/* Notification Icon */}
                    <button
                        onClick={handleNotificationClick}
                        className="relative text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405 1.405a2 2 0 01-2.828 0L15 17zm-6 0H4l1.405 1.405a2 2 0 002.828 0L9 17zm7-5V6a7 7 0 10-14 0v6l-2 2v1h18v-1l-2-2z"
                            />
                        </svg>

                        {/* Notification Badge */}
                        {notifications.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                {notifications.length}
                            </span>
                        )}
                    </button>

                    {/* Profile Icon */}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <img
                            src="https://via.placeholder.com/40"
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
                                onClick={() => alert('Profile clicked')}
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

            {/* Notification Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white text-gray-800 rounded-lg shadow-xl w-80 p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Notifications</h3>
                            <button onClick={handleModalClose} className="text-gray-500">
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Notifications List */}
                        <div className="space-y-2">
                            {notifications.length === 0 ? (
                                <p className="text-gray-500">No notifications yet.</p>
                            ) : (
                                notifications.map((notification) => (
                                    <div key={notification.id} className="p-2 bg-gray-100 rounded-md">
                                        <p className="text-sm">{notification.message}</p>
                                        <span className="text-xs text-gray-500">{notification.time}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
