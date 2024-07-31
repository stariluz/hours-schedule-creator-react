import { useCurrentState } from "../../../ScheduleCreator/ScheduleCreator";
import CalendarClassHour from "../../CalendarHourSpace/CalendarClassHour/CalendarClassHour";
import CalendarHourSpace from "../../CalendarHourSpace/CalendarHourSpace";
import './CalendarDay.css';

const CalendarDay = ({
  onClickEvent, onMouseDownEvent, onMouseOverEvent,
  day,
}) => {
  const { hoursMap: { unsave: hoursMap }, courses, hours } = useCurrentState();
  const numberOfHours = hours[0].end + 1 - hours[0].begin;
  
  const $hours = Array(numberOfHours).fill(null).map((value, index) => {
    const hour = index + hours[0].begin;
    const thereIsClass = hoursMap[day][hour] != null;
    return (
      <CalendarHourSpace
        key={day + "_" + hour}
        onClick={() => onClickEvent(day, hour)}
        onMouseDown={() => onMouseDownEvent(day, hour)}
        onMouseOver={() => onMouseOverEvent(day, hour)}
        thereIsClass={thereIsClass}
      />
    );
  });

  const dayClasses = hoursMap[day];

  const dataClasses = dayClasses.reduce(
    ({ result, previous, i }, current) => {
      if (current == null) {
        return {
          result,
          previous: null,
          i: i + 1,
        };
      } else if (current == previous) {
        result[result.length - 1].length++;
        return {
          result,
          previous: current,
          i: i + 1,
        }
      } else {
        result.push({
          hour: i,
          length: 1,
        });
        return {
          result,
          previous: current,
          i: i + 1,
        }
      }
    }, { result: [], previous: null, i: 0 }
  ).result;

  const classHours = dataClasses.map((classHour) => {
    return (
      <CalendarClassHour
        key={day + "_" + classHour.hour + "_" + classHour.length}
        time={classHour}
        content={courses[dayClasses[classHour.hour]]}
        firstHour={hours[0].begin}
      />
    );
  });

  return (
    <div className="day__column" key={`row-${day}`}>
      <div className="day__classes" style={{ '--hours-amount': numberOfHours }}>
        {classHours}
      </div>
      <div className="day__hours">
        {$hours}
      </div>
    </div>
  );
}
export default CalendarDay;