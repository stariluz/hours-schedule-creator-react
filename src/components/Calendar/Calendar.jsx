import React, { useState } from 'react';
import { Hour, ClassHour, HourSpace } from './Hour/Hour';
import "./Calendar.css";
import { useCurrentState, useScheduleDispatch } from '../ScheduleCreator/ScheduleCreator';
import { IconPlus } from '@tabler/icons-react';
import Button from '../UI/Button/Button';

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
    const [FIRST_HOUR, setFirstHour] = useState(7);
    const [LAST_HOUR, setLastHour] = useState(20);
    const { courses, hoursMap } = useCurrentState();
    const scheduleDispatch = useScheduleDispatch();
    const onClickOnHour = (day, hour) => {
        scheduleDispatch({
            task: 'clickOnHour',
            day: day,
            hour: hour
        })
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
    const renderHourSpace = (day, hour, thereIsClass) => {
        return (
            <HourSpace
                key={day + "_" + hour}
                onClick={() => onClickOnHour(day, hour)}
                thereIsClass={thereIsClass}
            />
        );
    }
    const renderHourNamespace = (hour) => {
        const hourComponent = <Hour hour={hour} key={'hour-' + hour} />;
        return hourComponent;
    }
    const renderDay = (day) => {
        const numberOfHours = LAST_HOUR - FIRST_HOUR;
        const hours = Array(numberOfHours).fill(null).map((value, index) => {
            const hour = index + FIRST_HOUR;
            const thereIsClass = hoursMap[day][hour] > 0 ? true : false;
            return renderHourSpace(day, hour, thereIsClass);
        });
        let length = 0;
        let hour = 0;
        let classHours = [];
        let dayClasses = hoursMap[day];
        for (let i = 0; i < dayClasses.length; i++) {
            // console.log(dayClasses[i]);
            if (dayClasses[i] === 0) continue;
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
                    content={courses[hoursMap[day][classHour.hour] - 1]}
                    FIRST_HOUR={FIRST_HOUR}
                // onClick={()=>onClickOnHour(day,hour)}
                />
            );
        });
        let dayComponent =
            <div className="day__column" key={"row_" + day}>
                <div className="day__content">
                    <div className="day__classes">
                        {classHours}
                    </div>
                    <div className="day__hours">
                        {hours}
                    </div>
                </div>
            </div>
        return dayComponent;
    }
    const renderWeekHeader = () => {
        let daySpaces = Object.keys(daysMap).map((day) => {
            return (
                <div className="day__name">
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