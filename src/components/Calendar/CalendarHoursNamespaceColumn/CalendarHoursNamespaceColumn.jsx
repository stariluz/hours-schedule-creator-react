import { useEffect, useRef } from "react";
import CalendarHourNamespace from "./CalendarHourNamespace/CalendarHourNamespace";
import './CalendarHoursNamespaceColumn.css';
import { useCurrentState } from "../../../contexts/ScheduleContext";
import { useScheduleRef } from "../../../contexts/scheduleRefContext";

const CalendarHoursNamespaceColumn = () => {
  const scheduleRef = useScheduleRef();
  const parentRef = useRef(null);
  const floatingRef = useRef(null);
  const { hours } = useCurrentState();

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
    
    if(scheduleRef){
      // Adjust on window resize
      calendarResizeObserver.observe(scheduleRef.current);
    }

    // Initial adjustment
    adjustFixedElementHeight();

    // Cleanup on component unmount
    return () => {
      calendarResizeObserver.disconnect();
    };
  }, []);

  const $hoursNamespaces = Array(hours[0].end + 1 - hours[0].begin).fill(null).map((value, index) => {
    const hour = index + hours[0].begin;
    return (
      <CalendarHourNamespace
        hour={hour}
        key={`hourNamespace-${hour}`}
      />
    );
  });
  return (
    <>
      <div className="hours-namespace__column hours-namespace__column--floating" ref={floatingRef}>
        <div className='day__name'></div>
        {$hoursNamespaces}
      </div>
    </>
  );
}
export default CalendarHoursNamespaceColumn;