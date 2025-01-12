import { IconMinus, IconPlus } from "@tabler/icons-react";
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

  const removeHourAtBegin = () => {
    scheduleDispatch({ task: 'removeHourAtBegin' });
  }
  const removeHourAtEnd = () => {
    scheduleDispatch({ task: 'removeHourAtEnd' });
  }
  return (
    <div className="week__controls">
      <div className="hour-control---begin">
        {
          hours[0].begin > 0 ?
            <Button
              className='hour-control-btn add-btn button btn-primary button-rounded button-icon button-small'
              onClick={() => addHourAtBegin()}
            >
              <IconPlus />
            </Button>
            : null
        }
        {
          hours[0].begin > 0 ?
            <Button
              className='hour-control-btn remove-btn button btn-primary button-rounded button-icon button-small'
              onClick={() => removeHourAtBegin()}
            >
              <IconMinus />
            </Button>
            : null
        }
      </div>
      <div className="hour-control--end">
        {
          hours[0].end < 24 ?
            <Button
              className='hour-control-btn add-btn button btn-primary button-rounded button-icon button-small'
              onClick={() => removeHourAtEnd()}
            >
              <IconMinus />
            </Button>
            : null
        }
        {
          hours[0].end < 24 ?
            <Button
              className='hour-control remove-btn button btn-primary button-rounded button-icon button-small'
              onClick={() => addHourAtEnd()}
            >
              <IconPlus />
            </Button>
            : null
        }
      </div>
    </div>
  );
}
export default CalendarWeekControls;