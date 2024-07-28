import CalendarHourNamespace from "./CalendarHourNamespace/CalendarHourNamespace";
import './CalendarHoursNamespaceColumn.css';
const CalendarHoursNamespaceColumn = ({ firstHour, lastHour, }) => {
  return (
    <div className="hours-namespace__column">
      {
        Array(lastHour - firstHour+1).fill(null).map((value, index) => {
          const hour = index + firstHour;
          return (
            <CalendarHourNamespace
              hour={hour}
              key={`hourNamespace-${hour}`}
            />
          );
        })
      }
    </div>
  );
}
export default CalendarHoursNamespaceColumn;