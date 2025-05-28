import { useLang } from "../../../contexts/LangContext";
import { daysNames, daysNamesMap } from "../../../utils/days";
import './CalendarWeekHeader.css';

const CalendarWeekHeader = () => {
  const { currentTranslation } = useLang();

  let daySpaces = currentTranslation.days.map((day,i) => {
    return (
      <div className="day__name" key={i}>
        {day}
      </div>
    )
  });
  return (
    <div className='week__header'>
      {daySpaces}
    </div>
  )
}
export default CalendarWeekHeader;