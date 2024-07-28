import { useEffect, useState } from "react";
import { produce } from "immer";
import { useCurrentState, useScheduleState, useScheduleStateDispatch } from "../../ScheduleCreator/ScheduleCreator";
import { daysNamesMap } from "../../../utils/days";
import CalendarDay from "./CalendarDay/CalendarDay";

const CalendarWeek = ({firstHour, lastHour}) => {
  const { hoursMap: hoursMapGlobal, courses } = useCurrentState();
  const [hoursMap, setHoursMap] = useState(Array(7).fill(Array(24).fill(null)));
  const [currentAction, setCurrentAction] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const scheduleState = useScheduleState();
  const scheduleDispatch = useScheduleStateDispatch();
  const [onMouseOverEvent, setOnMouseOverEvent] = useState(() => (event) => null);

  useEffect(() => {
    // console.log("SYNC:", hoursMap);
    setHoursMap(() => {
      const newHoursMap = produce(hoursMapGlobal, hoursMapDraft => hoursMapDraft);
      return newHoursMap;
    });
  }, [hoursMapGlobal]);
  useEffect(() => {
    if (isMouseDown) {
      document.addEventListener('mouseup', () => { setIsMouseDown(false) }, { once: true });
    } else {
      setOnMouseOverEvent(() => (event) => null);
      scheduleDispatch({
        task: 'hoursMapChanges',
        action: currentAction,
        hoursMap: hoursMap
      });
    }
  }, [isMouseDown]);

  const handleMouseDownEvent = (day, hour) => {
    if (scheduleState.selectedTool == 'brush') {
      if (scheduleState.selectedCourse == null) {
        return;
      }
      setOnMouseOverEvent(() => (day, hour) => {
        paintClassHour(day, hour);
      });
      setCurrentAction('Paint hours');
      setIsMouseDown(true);
      paintClassHour(day, hour);
    } else if (scheduleState.selectedTool == 'eraser') {
      setOnMouseOverEvent(() => (day, hour) => {
        ereaseClassHour(day, hour);
      });
      setCurrentAction('Erase hours');
      setIsMouseDown(true);
      ereaseClassHour(day, hour);
    }
  }
  const handleClickEvent = (day, hour) => {
    if (scheduleState.selectedTool == 'brush') {
      paintClassHour(day, hour);
      scheduleDispatch({
        task: 'hoursMapChanges',
        action: 'Paint hour',
        hoursMap: hoursMap
      });
    } else if (scheduleState.selectedTool == 'eraser') {
      ereaseClassHour(day, hour);
      scheduleDispatch({
        task: 'hoursMapChanges',
        action: 'Paint hour',
        hoursMap: hoursMap
      });
    }
  }

  const ereaseClassHour = (day, hour) => {
    setHoursMap((hoursMap) => {
      const newHoursMap = produce(hoursMap, (hoursMapDraft) => {
        hoursMapDraft[day][hour] = null;
      });
      return newHoursMap;
    });
  }
  const paintClassHour = (day, hour) => {
    setHoursMap((hoursMap) => {
      const newHoursMap = produce(hoursMap, (hoursMapDraft) => {
        hoursMapDraft[day][hour] = scheduleState.selectedCourse.id;
      });
      return newHoursMap;
    });
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
              hoursMap={hoursMap}
              courses={courses}
              onClickEvent={handleClickEvent}
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