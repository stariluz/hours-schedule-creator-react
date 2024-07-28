
const CalendarHourSpace = ({
  onClick, onMouseDown, onMouseOver,
  thereIsClass,
}) => {
  return (
    <button className={`hour__space ${thereIsClass ? 'hour__space--class' : ''}`}
      onClick={(event) => onClick(event)}
      onMouseDown={(event) => onMouseDown(event)}
      onMouseOver={(event) => onMouseOver(event)}
    >
    </button>
  );
}
export default CalendarHourSpace;