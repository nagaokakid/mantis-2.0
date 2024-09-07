import { useState, useEffect } from 'react';

const Calendar = () => {
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const today = new Date();
  const currentDay = today.getDate(); // Current day of the month
  const currentMonth = today.toLocaleString('default', { month: 'long' }); // Current month name
  const currentYear = today.getFullYear(); // Current year

  // Function to calculate all days in the current month
  const calculateDaysInMonth = (month: number, year: number) => {
    const days = new Date(year, month + 1, 0).getDate(); // Get number of days in the month
    return Array.from({ length: days }, (_, i) => i + 1); // Return array of days
  };

  // On component mount, calculate days in the current month
  useEffect(() => {
    const days = calculateDaysInMonth(today.getMonth(), currentYear);
    setDaysInMonth(days);
  }, [currentYear, today]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg">
      {/* Display the month and year */}
      <div className="text-2xl font-bold mb-4">
        {currentMonth} {currentYear}
      </div>

      {/* Days of the week header */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-center font-medium">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`p-2 w-10 h-10 flex items-center justify-center rounded-full ${
              day === currentDay ? 'bg-blue-500 text-white font-bold' : 'bg-gray-200'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
