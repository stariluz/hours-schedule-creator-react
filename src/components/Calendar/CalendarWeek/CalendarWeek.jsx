import { useEffect, useState } from "react";
import { produce } from "immer";
import { useCurrentState, useScheduleState, useScheduleStateDispatch } from "../../../contexts/ScheduleContext";
import { daysNamesMap } from "../../../utils/days";
import CalendarDay from "./CalendarDay/CalendarDay";
import "./CalendarWeek.css";
const CalendarWeek = ({}) => {
  const scheduleState = useScheduleState();
  const scheduleDispatch = useScheduleStateDispatch();
  const [onMouseOverEvent, setOnMouseOverEvent] = useState(() => (event) => null);
  
  const handleMouseDownEvent = (day, hour) => {
    if (
      scheduleState.selectedTool == 'brush' &&
      scheduleState.selectedCourse == null
    ) return;

    setOnMouseOverEvent(() => (day, hour) => {
      scheduleDispatch({
        task: 'changeHourUnsave',
        day: day,
        hour: hour,
      });
    });
    scheduleDispatch({
      task: 'changeHourUnsave',
      day: day,
      hour: hour,
    });

    document.addEventListener('mouseup', () => {
      setOnMouseOverEvent(() => (event) => null);
      scheduleDispatch({
        task: 'saveHoursChanges',
      });
    }, { once: true });
  }

  return (
    <div className="week">
      {
        Object.keys(daysNamesMap).map((day) => {
          return (
            <CalendarDay
              day={day}
              onClickEvent={()=>{}}
              onMouseDownEvent={handleMouseDownEvent}
              onMouseOverEvent={onMouseOverEvent}
              key={`daySpace-${day}`}
            />
          );
        })
      }
    </div>
  );
}
export default CalendarWeek;