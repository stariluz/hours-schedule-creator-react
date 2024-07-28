import CalendarHourNamespace from "./CalendarHourNamespace/CalendarHourNamespace";

const CalendarHoursNamespaceColumn = ({firstHour, lastHour, }) => {
  <div className="hours-namespace__column">
    {
      Array(lastHour - firstHour).fill(null).map((value, index) => {
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
}
export default CalendarHoursNamespaceColumn;