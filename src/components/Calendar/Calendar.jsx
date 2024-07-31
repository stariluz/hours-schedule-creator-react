import { useRef, useState } from "react";
import CalendarWeek from "./CalendarWeek/CalendarWeek";
import CalendarWeekHeader from "./CalendarWeekHeader/CalendarWeekHeader";
import CalendarWeekControls from "./CalendarWeek/CalendarWeekControls/CalendarWeekControls";
import CalendarHoursNamespaceColumn from "./CalendarHoursNamespaceColumn/CalendarHoursNamespaceColumn";
import "./Calendar.css";

const Calendar = () => {
  const calendarRef = useRef(null);

  return (
    <div className="calendar" ref={calendarRef}>
      <div className='hours__area'>
        <CalendarHoursNamespaceColumn
          calendarRef={calendarRef}
        />
        <div className="week__area">
          <CalendarWeekHeader />
          <CalendarWeek/>
        </div>
        <CalendarWeekControls/>
      </div>
    </div>
  );
}
export default Calendar;