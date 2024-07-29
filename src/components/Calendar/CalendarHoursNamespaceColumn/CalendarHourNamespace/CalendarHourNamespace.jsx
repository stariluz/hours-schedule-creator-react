import './CalendarHourNamespace.css';

const CalendarHourNamespace = ({ hour }) => {
  let meridiem = 'am';
  if (hour >= 12) {
    meridiem = 'pm';
    hour -= 12;
  }
  if (hour == 0) {
    hour = 12;
  }
  //${(hour < 10 ? '0' : '')}
  const value = `${hour}:00${meridiem}`;
  return (
    <div className="hour__time" key={value}>
      {value}
    </div>
  );
}
export default CalendarHourNamespace;