import React, { useEffect, useState } from 'react';
import { ClassHour, HourSpace, HourNamespace } from './Hour/Hour';
import "./Calendar.css";
import { useCurrentState, useScheduleState, useScheduleStateDispatch } from '../ScheduleCreator/ScheduleCreator';
import { IconPlus } from '@tabler/icons-react';
import Button from '../UI/Button/Button';
import { produce } from 'immer';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const daysMap = {
  0: days[0],
  1: days[1],
  2: days[2],
  3: days[3],
  4: days[4],
  5: days[5],
  6: days[6],
}
/**
 * 
 */
const Calendar = () => {
  const { courses, hoursMap } = useCurrentState();
  const [hoursMapLocal, setHoursMapLocal] = useState(Array(7).fill(Array(24).fill(null)));
  const [FIRST_HOUR, setFirstHour] = useState(7);
  const [LAST_HOUR, setLastHour] = useState(20);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currentAction, setCurrentAction] = useState(false);
  const scheduleState = useScheduleState();
  const scheduleDispatch = useScheduleStateDispatch();
  console.log(courses, hoursMap);
  const [onMouseOverEvent, setOnMouseOverEvent] = useState(() => (event) => null);
  useEffect(() => {
    // console.log("SYNC:", hoursMap);
    setHoursMapLocal(hoursMap);
  }, [hoursMap]);
  useEffect(() => {
    // console.log("CHANGED:", JSON.parse(JSON.stringify(hoursMapLocal)));
  }, [hoursMapLocal]);
  useEffect(() => {
    if (isMouseDown) {
      document.addEventListener('mouseup', () => { setIsMouseDown(false) }, { once: true });
    } else {
      setOnMouseOverEvent(() => (event) => null);
      scheduleDispatch({
        task: 'hoursMapChanges',
        action: currentAction,
        hoursMap: hoursMapLocal
      });
    }
  }, [isMouseDown])
  const paintClassHour = (day, hour) => {
    setHoursMapLocal((hoursMapLocal) => {
      const newHoursMap = produce(hoursMapLocal, (hoursMapDraft) => {
        hoursMapDraft[day][hour] = scheduleState.selectedCourse.id;
      });
      return newHoursMap;
    });
  }
  const ereaseClassHour = (day, hour) => {
    setHoursMapLocal((hoursMapLocal) => {
      const newHoursMap = produce(hoursMapLocal, (hoursMapDraft) => {
        hoursMapDraft[day][hour] = null;
      });
      return newHoursMap;
    });
  }
  const onClick = (day, hour) => {
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
  const onMouseDownEvent = (day, hour) => {
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
  const addHourAtBegin = () => {
    if (FIRST_HOUR > 0) {
      setFirstHour(FIRST_HOUR - 1);
    }
  }
  const addHourAtEnd = () => {
    if (LAST_HOUR < 24) {
      setLastHour(LAST_HOUR + 1);
    }
  }
  const renderHourNamespace = (hour) => {
    const hourComponent = <HourNamespace hour={hour} key={`hourNamespace-${hour}`} />;
    return hourComponent;
  }
  const renderHourSpace = (day, hour, thereIsClass) => {
    return (
      <HourSpace
        key={day + "_" + hour}
        onClick={() => onClick(day, hour)}
        onMouseDown={() => onMouseDownEvent(day, hour)}
        onMouseOver={() => onMouseOverEvent(day, hour)}
        thereIsClass={thereIsClass}
      />
    );
  }
  const renderDay = (day) => {
    const numberOfHours = LAST_HOUR - FIRST_HOUR;
    const hours = Array(numberOfHours).fill(null).map((value, index) => {
      const hour = index + FIRST_HOUR;
      const thereIsClass = hoursMapLocal[day][hour] != null;
      return renderHourSpace(day, hour, thereIsClass);
    });
    let length = 0;
    let hour = 0;
    let classHours = [];
    let dayClasses = hoursMapLocal[day];
    for (let i = 0; i < dayClasses.length; i++) {
      // console.log(dayClasses[i]);
      if (dayClasses[i] === null) continue;
      // console.log("WORKS");
      length = 1;
      hour = i;
      while (dayClasses[i] === dayClasses[i + 1]) {
        i++;
      }
      length += i - hour;
      classHours.push({
        "hour": hour,
        "length": length,
      });
    }

    classHours = classHours.map((classHour) => {
      return (
        <ClassHour
          key={day + "_" + classHour.hour + "_" + classHour.length}
          time={classHour}
          content={courses[hoursMapLocal[day][classHour.hour]]}
          FIRST_HOUR={FIRST_HOUR}
        // onClick={()=>onClickOnHour(day,hour)}
        />
      );
    });
    return (
      <div className="day__column" key={`row-${day}`}>
        <div className="day__content">
          <div className="day__classes">
            {classHours}
          </div>
          <div className="day__hours">
            {hours}
          </div>
        </div>
      </div>
    );
  }
  const renderWeek = () => {
    const hoursNamespaces = Array(LAST_HOUR - FIRST_HOUR).fill(null).map((value, index) => {
      return renderHourNamespace(index + FIRST_HOUR);
    });
    let daySpaces = Object.keys(daysMap).map((day) => {
      return renderDay(day);
    });
    // let dayClasses=Object.keys(daysMap).map((day)=>{
    //     return renderDayClasses(day);
    // });


    // console.log("DEV - - - - - - - - - - - -:",);
    return <div className='hours__area'>
      <div className="hours__namespace">
        {hoursNamespaces}
      </div>
      <div className="week__area">
        <div className="week">
          {daySpaces}
        </div>
        <div className="week__controls">
          {
            FIRST_HOUR > 0 ?
              <Button
                className='add-hour add-hour---begin button-rounded button-icon button-small'
                onClick={() => addHourAtBegin()}
              ><IconPlus /></Button>
              : null
          }
          {
            LAST_HOUR < 24 ?
              <Button
                className='add-hour add-hour---end button-rounded button-icon button-small'
                onClick={() => addHourAtEnd()}
              ><IconPlus /></Button>
              : null
          }
        </div>
      </div>
    </div>;
  }
  return (
    <div className="calendar">
      {renderWeekHeader()}
      {renderWeek()}
    </div>
  );
}
export default Calendar;


const renderWeekHeader = () => {
  let daySpaces = Object.keys(daysMap).map((day) => {
    return (
      <div className="day__name" key={day}>
        {days[day]}
      </div>
    )
  });
  return (
    <div className='week__header'>
      <div className="day__name"></div>
      {daySpaces}
    </div>
  )
}