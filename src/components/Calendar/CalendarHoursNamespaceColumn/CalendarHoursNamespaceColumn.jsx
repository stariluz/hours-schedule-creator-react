import { useEffect, useRef } from "react";
import CalendarHourNamespace from "./CalendarHourNamespace/CalendarHourNamespace";
import './CalendarHoursNamespaceColumn.css';

const CalendarHoursNamespaceColumn = ({ firstHour, lastHour, calendarRef }) => {
  const parentRef = useRef(null);
  const floatingRef = useRef(null);

  useEffect(() => {
    const adjustFixedElementHeight = () => {
      if (parentRef.current && floatingRef.current) {
        const parentHeight = parentRef.current.offsetHeight;
        floatingRef.current.style.height = `${parentHeight}px`;
      }
    };
    const calendarResizeObserver = new ResizeObserver((calendar) => {
      adjustFixedElementHeight();
    });
    // Adjust on window resize
    calendarResizeObserver.observe(calendarRef.current);

    // Initial adjustment
    adjustFixedElementHeight();

    // Cleanup on component unmount
    return () => {
      calendarResizeObserver.disconnect();
    };
  }, []);

  const $hoursNamespaces = Array(lastHour - firstHour).fill(null).map((value, index) => {
    const hour = index + firstHour;
    return (
      <CalendarHourNamespace
        hour={hour}
        key={`hourNamespace-${hour}`}
      />
    );
  });
  return (
    <div className="hours-namespace__column" ref={parentRef}>
      <div className='day__name'></div>
      {$hoursNamespaces}
      <div className="hours-namespace__column hours-namespace__column--floating" ref={floatingRef}>
        <div className='day__name'></div>
        {$hoursNamespaces}
      </div>
    </div>
  );
}
export default CalendarHoursNamespaceColumn;