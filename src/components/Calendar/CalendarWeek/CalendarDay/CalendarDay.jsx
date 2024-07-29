import CalendarClassHour from "../../CalendarClassHour/CalendarClassHour";
import CalendarHourSpace from "../../CalendarHourSpace/CalendarHourSpace";
import './CalendarDay.css';

const CalendarDay = ({
  onClickEvent, onMouseDownEvent, onMouseOverEvent,
  day, firstHour, lastHour, hoursMap, courses
}) => {
  const numberOfHours = lastHour - firstHour;
  const $hours = Array(numberOfHours).fill(null).map((value, index) => {
    const hour = index + firstHour;
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
          i: i+1,
        };
      } else if (current == previous) {
        result[result.length - 1].length++;
        return {
          result,
          previous: current,
          i: i+1,
        }
      } else {
        console.log(i);
        result.push({
          hour: i,
          length: 1,
        });
        return {
          result,
          previous: current,
          i: i+1,
        }
      }
    }, { result: [], previous: null, i: 0 }
  ).result;
  console.log(dataClasses)
  const classHours = dataClasses.map((classHour) => {
    return (
      <CalendarClassHour
        key={day + "_" + classHour.hour + "_" + classHour.length}
        time={classHour}
        content={courses[dayClasses[classHour.hour]]}
        firstHour={firstHour}
      />
    );
  });

  return (
    <div className="day__column" key={`row-${day}`}>
      <div className="day__classes" style={{'--hours-amount':lastHour-firstHour}}>
        {classHours}
      </div>
      <div className="day__hours">
        {$hours}
      </div>
    </div>
  );
}
export default CalendarDay;