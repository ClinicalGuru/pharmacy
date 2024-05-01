import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CalendarPopup() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleOpenCalendar = () => {
      setIsOpen(true);
    };
  
    const handleCloseCalendar = () => {
      setIsOpen(false);
    };
  
    return (
      <div>
        <button onClick={handleOpenCalendar}>Open Calendar</button>
        {isOpen && (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              handleCloseCalendar();
            }}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            inline
          />
        )}
      </div>
    );
  }
export default CalendarPopup;
