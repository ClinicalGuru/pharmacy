import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function MonthYearCalendarPopup({ onSelect }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
  }));

  const currentYear = new Date().getFullYear();
  const [displayedYear, setDisplayedYear] = useState(currentYear);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    let m = month>9?month:"0"+month
    onSelect(m, displayedYear);
      console.log("selectedMonth, selectedYear => ",m, displayedYear)
  };

  const handleYearNavigation = (increment) => {
    setDisplayedYear((prevYear) => prevYear + increment);
  };

  const handleSubmit = () => {
    if (selectedMonth !== null && selectedYear !== null) {
      onSelect(selectedMonth, selectedYear);
      console.log("selectedMonth, selectedYear => ",selectedMonth, selectedYear)
    }
  };

  return (
    <div style={{ textAlign: 'center',  marginTop: '10px' }}>
      <strong>
        <FaChevronLeft style={{float:'left',marginTop:'2px',marginLeft:'5px'}} onClick={() => handleYearNavigation(-1)} />
        {displayedYear}
        <FaChevronRight style={{float:'right',marginTop:'2px',marginRight:'5px'}} onClick={() => handleYearNavigation(1)} />
      </strong>
      <br />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          paddingLeft:'10px'
        }}
      >
        {months.map((month) => (
          <div
            key={month.value}
            style={{
              padding: '5px',
              cursor: 'pointer',
              backgroundColor: selectedMonth === month.value ? '#ccc' : 'transparent',
              width:'50px'
            }}
            onClick={() => handleMonthClick(month.value)}
          >
            {month.label.slice(0,3)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthYearCalendarPopup;
