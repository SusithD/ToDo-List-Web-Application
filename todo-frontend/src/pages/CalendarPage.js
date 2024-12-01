// src/pages/CalendarPage.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import CSS for the calendar styling
import { getTodos } from '../api/todoApi'; // Assuming you have this API function to fetch todos

const CalendarPage = () => {
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState(new Date());

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  // Filter todos based on selected date
  const getTodosForSelectedDate = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    return todos.filter((todo) => todo.dueDate?.split('T')[0] === formattedDate);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const todosForSelectedDate = getTodosForSelectedDate(date);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Calendar View</h2>

        {/* Calendar */}
        <div className="border rounded-lg p-4 mb-6 bg-white shadow-md">
          <Calendar onChange={handleDateChange} value={date} className="rounded-lg" />
        </div>

        {/* Tasks for the selected date */}
        <div className="border rounded-lg p-4 bg-white shadow-md">
          <h3 className="text-xl font-semibold mb-2">Tasks for {date.toLocaleDateString()}</h3>
          <ul>
            {todosForSelectedDate.length === 0 ? (
              <li>No tasks for this date</li>
            ) : (
              todosForSelectedDate.map((todo) => (
                <li key={todo._id} className="mb-2">
                  <p>{todo.title}</p>
                  <p className="text-sm text-gray-500">Priority: {todo.priority}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
