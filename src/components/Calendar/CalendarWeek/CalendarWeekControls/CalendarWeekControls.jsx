import { IconPlus } from "@tabler/icons-react";
import Button from "../../../UI/Button/Button";
import './CalendarWeekControls.css';
import { useCurrentState, useScheduleStateDispatch } from "../../../ScheduleCreator/ScheduleCreator";

const CalendarWeekControls = () => {
  const scheduleDispatch = useScheduleStateDispatch();
  const { hours } = useCurrentState();

  const addHourAtBegin = () => {
    scheduleDispatch({ task: 'addHourAtBegin' });
  }
  const addHourAtEnd = () => {
    scheduleDispatch({ task: 'addHourAtEnd' });
  }
  return (
    <div className="week__controls">
      {
        hours[0].begin > 0 ?
          <Button
            className='add-hour add-hour---begin button btn-primary button-rounded button-icon button-small'
            onClick={() => addHourAtBegin()}
          >
            <IconPlus />
          </Button>
          : null
      }
      {
        hours[0].end < 24 ?
          <Button
            className='add-hour add-hour---end button btn-primary button-rounded button-icon button-small'
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