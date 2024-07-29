import { IconPlus } from "@tabler/icons-react";
import Button from "../../../UI/Button/Button";
import './CalendarWeekControls.css';

const CalendarWeekControls = ({
  firstHour, setFirstHour, lastHour, setLastHour
}) => {
  const addHourAtBegin = () => {
    if (firstHour > 0) {
      setFirstHour(firstHour - 1);
    }
  }
  const addHourAtEnd = () => {
    if (lastHour < 24) {
      setLastHour(lastHour + 1);
    }
  }
  return (
    <div className="week__controls">
      {
        firstHour > 0 ?
          <Button
            className='add-hour add-hour---begin button-rounded button-icon button-small'
            onClick={() => addHourAtBegin()}
          >
            <IconPlus />
          </Button>
          : null
      }
      {
        lastHour < 24 ?
          <Button
            className='add-hour add-hour---end button-rounded button-icon button-small'
            onClick={() => addHourAtEnd()}
          >
            <IconPlus />
          </Button>
          : null
      }
    </div>
  );
}
export default CalendarWeekControls;