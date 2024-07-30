import { useRef, useState } from "react";
import CalendarWeek from "./CalendarWeek/CalendarWeek";
import CalendarWeekHeader from "./CalendarWeekHeader/CalendarWeekHeader";
import CalendarWeekControls from "./CalendarWeek/CalendarWeekControls/CalendarWeekControls";
import CalendarHoursNamespaceColumn from "./CalendarHoursNamespaceColumn/CalendarHoursNamespaceColumn";
import "./Calendar.css";

const Calendar = () => {
  const [firstHour, setFirstHour] = useState(7);
  const [lastHour, setLastHour] = useState(20);
  const calendarRef = useRef(null);

  return (
    <div className="calendar" ref={calendarRef}>
      <div className='hours__area'>
        <CalendarHoursNamespaceColumn
          firstHour={firstHour}
          lastHour={lastHour}
          calendarRef={calendarRef}
        />
        <div className="week__area">
          <CalendarWeekHeader />
          <CalendarWeek
            firstHour={firstHour}
            lastHour={lastHour}
          />
        </div>
        <CalendarWeekControls
          firstHour={firstHour}
          setFirstHour={setFirstHour}
          lastHour={lastHour}
          setLastHour={setLastHour}
        />
      </div>
    </div>
  );
}
export default Calendar;