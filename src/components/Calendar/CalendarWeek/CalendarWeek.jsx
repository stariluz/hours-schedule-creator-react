import { useEffect, useState } from "react";
import { produce } from "immer";
import { useCurrentState, useScheduleState, useScheduleStateDispatch } from "../../ScheduleCreator/ScheduleCreator";
import { daysNamesMap } from "../../../utils/days";
import CalendarDay from "./CalendarDay/CalendarDay";

const CalendarWeek = ({ firstHour, lastHour }) => {
  const scheduleState = useScheduleState();
  const scheduleDispatch = useScheduleStateDispatch();
  const { hoursMap, courses } = useCurrentState();
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
              firstHour={firstHour}
              lastHour={lastHour}
              hoursMap={hoursMap.unsave}
              courses={courses}
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