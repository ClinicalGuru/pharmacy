import React,{Component} from 'react';

class MonthCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: this.props.month,
      year: this.props.year,
    };
  }

  // Function to get the number of days in a month
  getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Function to get the first day of the month
  getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay();
  }

  // Function to generate the calendar grid
  generateCalendarGrid(month, year) {
    const firstDay = this.getFirstDayOfMonth(month, year);
    const daysInMonth = this.getDaysInMonth(month, year);
    const blanks = [];
    for (let i = 0; i < firstDay; i++) {
      blanks.push(<td key={`blank-${i}`}></td>);
    }

    const days = [];
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(<td key={`day-${d}`}>{d}</td>);
    }

    const totalSlots = [...blanks, ...days];
    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((row, i) => <tr key={`row-${i}`}>{row}</tr>);
  }

  render() {
    const { month, year } = this.state;
    const monthName = new Date(year, month).toLocaleString('default', {
      month: 'long',
    });

    return (
      <div>
        <h2>{monthName} {year}</h2>
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>{this.generateCalendarGrid(month, year)}</tbody>
        </table>
      </div>
    );
  }
}

export default MonthCalendar;
