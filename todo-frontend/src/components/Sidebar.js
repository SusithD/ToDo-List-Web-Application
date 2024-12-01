import React, { useState } from 'react';
import { AiOutlineDashboard, AiOutlineCheckCircle, AiOutlineHourglass } from 'react-icons/ai';

const Sidebar = ({ setFilter }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setFilter(filter);
    };

    return (
        <div className="h-full w-64 bg-gray-950 text-white flex flex-col shadow-lg">
            {/* Sidebar Header */}
            <div className="p-6 text-2xl font-bold flex items-center space-x-3 border-b border-gray-700">
                <AiOutlineDashboard className="text-blue-500 text-3xl" />
                <span>Todo Dashboard</span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 mt-4">
                <ul className="space-y-2">
                    {/* All Tasks */}
                    <li>
                        <button
                            onClick={() => handleFilterChange('all')}
                            className={`flex items-center w-full text-left px-4 py-3 space-x-3 rounded-md hover:bg-gray-800 ${
                                activeFilter === 'all' ? 'bg-gray-800' : ''
                            }`}
                        >
                            <AiOutlineDashboard className="text-xl" />
                            <span className="text-sm font-medium">All Tasks</span>
                        </button>
                    </li>

                    {/* Completed Tasks */}
                    <li>
                        <button
                            onClick={() => handleFilterChange('completed')}
                            className={`flex items-center w-full text-left px-4 py-3 space-x-3 rounded-md hover:bg-gray-800 ${
                                activeFilter === 'completed' ? 'bg-gray-800' : ''
                            }`}
                        >
                            <AiOutlineCheckCircle className="text-xl text-green-500" />
                            <span className="text-sm font-medium">Completed Tasks</span>
                        </button>
                    </li>

                    {/* In-Progress Tasks */}
                    <li>
                        <button
                            onClick={() => handleFilterChange('in-progress')}
                            className={`flex items-center w-full text-left px-4 py-3 space-x-3 rounded-md hover:bg-gray-800 ${
                                activeFilter === 'in-progress' ? 'bg-gray-800' : ''
                            }`}
                        >
                            <AiOutlineHourglass className="text-xl text-yellow-500" />
                            <span className="text-sm font-medium">In-Progress Tasks</span>
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} My Todo App
            </div>
        </div>
    );
};

export default Sidebar;
