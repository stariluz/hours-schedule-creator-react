import { useEffect, useRef, useState } from "react";
import CalendarWeek from "./CalendarWeek/CalendarWeek";
import CalendarWeekHeader from "./CalendarWeekHeader/CalendarWeekHeader";
import CalendarWeekControls from "./CalendarWeek/CalendarWeekControls/CalendarWeekControls";
import CalendarHoursNamespaceColumn from "./CalendarHoursNamespaceColumn/CalendarHoursNamespaceColumn";
import "./Calendar.css";
import CalendarHoursNamespaceColumnPlaceholder from "./CalendarHoursNamespaceColumn/CalendarHoursNamespaceColumnPlaceholder";
import { useScheduleRefDispatch } from "../ScheduleCreator/ScheduleCreator";

const Calendar = () => {
  const calendarRef = useRef(null);
  const scheduleRefDispatch = useScheduleRefDispatch();

  useEffect(()=>{
    scheduleRefDispatch({
      task: 'setRef',
      content: calendarRef,
    })
  },[calendarRef])

  return (
    <div className="calendar" ref={calendarRef}>
      <div className='calendar__grid calendar__grid--fixed'>
        <CalendarWeekControls />
        <CalendarHoursNamespaceColumn/>
      </div>
      <div className='calendar__grid'>
        <CalendarHoursNamespaceColumnPlaceholder/>
        <div className="week__area">
          <CalendarWeekHeader />
          <CalendarWeek />
        </div>
      </div>
    </div>
  );
}
export default Calendar;
