import "../../../UI/Colors/Colors.css"
import "./CalendarClassHour.css";
import "../CalendarHourSpace.css";
import { useRef } from "react";
import FlowType from "../../../common/FlowType/FlowType";
import CalendarClass from "../../CalendarClass/CalendarClass";

const CalendarClassHour = ({ time, content, firstHour }) => {
  const $class = useRef(null);

  return (
    <CalendarClass
      course={content}
      style={{
        "--hour-row-start": `${time.hour - firstHour + 1}`,
        "--hour-row-length": `${time.length}`,
        "--hour-bg-hue": `${content.color.h}`
      }}
      className="hour__class"
    >
    </CalendarClass>
  );
}


export default CalendarClassHour;