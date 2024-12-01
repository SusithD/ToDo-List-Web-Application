import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // You may need to import the CSS for styling

const CalendarView = ({ todos }) => {
  const [date, setDate] = useState(new Date());

  // Filter todos based on the selected date
  const getTodosForSelectedDate = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    return todos.filter((todo) => {
      return todo.dueDate?.split('T')[0] === formattedDate; // Compare dates
    });
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const todosForSelectedDate = getTodosForSelectedDate(date);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 bg-gray-900 text-white">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">Task Calendar</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div className="flex justify-center bg-gray-800 p-4 rounded-lg shadow-lg">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="rounded-lg shadow-md"
            tileClassName="bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white transition duration-200"
            prevLabel={<span className="text-white">←</span>}
            nextLabel={<span className="text-white">→</span>}
          />
        </div>

        {/* Tasks for the selected date */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h3 className="text-2xl font-semibold text-gray-100 mb-4">
            Tasks for {date.toLocaleDateString()}
          </h3>
          <div className="space-y-4">
            {todosForSelectedDate.length === 0 ? (
              <p className="text-lg text-gray-400">No tasks for this date</p>
            ) : (
              todosForSelectedDate.map((todo) => (
                <div
                  key={todo._id}
                  className="p-4 border border-gray-700 rounded-lg shadow-sm hover:shadow-xl transition duration-300"
                >
                  <p className="text-xl font-medium text-gray-100">{todo.title}</p>
                  <p className="text-sm text-gray-400">{todo.description}</p>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <p>
                      Priority:{" "}
                      <span
                        className={`font-semibold ${
                          todo.priority === 'high'
                            ? 'text-red-500'
                            : todo.priority === 'medium'
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}
                      >
                        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                      </span>
                    </p>
                    <p className="italic text-gray-300">
                      {new Date(todo.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
