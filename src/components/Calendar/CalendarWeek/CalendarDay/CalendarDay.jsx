import CalendarClassHour from "../../CalendarClassHour/CalendarClassHour";
import CalendarHourSpace from "../../CalendarHourSpace/CalendarHourSpace";
const CalendarDay = ({
  onClickEvent,onMouseDownEvent, onMouseOverEvent,
  day, firstHour, lastHour, hoursMap, courses
}) => {
  const numberOfHours = lastHour - firstHour;
  const hours = Array(numberOfHours).fill(null).map((value, index) => {
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
  let length = 0;
  let hour = 0;
  let classHours = [];
  let dayClasses = hoursMap[day];
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
      <CalendarClassHour
        key={day + "_" + classHour.hour + "_" + classHour.length}
        time={classHour}
        content={courses[hoursMap[day][classHour.hour]]}
        firstHour={firstHour}
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
export default CalendarDay;