import { daysNames, daysNamesMap } from "../../../utils/days";

const CalendarWeekHeader = () => {
  let daySpaces = Object.keys(daysNamesMap).map((day) => {
    return (
      <div className="day__name" key={day}>
        {daysNames[day]}
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
export default CalendarWeekHeader;