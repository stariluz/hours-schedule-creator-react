import "../../../UI/Colors/Colors.css"
import "./CalendarClassHour.css";
import "../CalendarHourSpace.css";
import { useRef } from "react";
import FlowType from "../../../common/FlowType/FlowType";

const CalendarClassHour = ({ time, content, firstHour }) => {
  const $class = useRef(null);

  return (
    <button className="hour__class class-box custom-color custom-color-text"
      style={{
        "--hour-row-start": `${time.hour - firstHour + 1}`,
        "--hour-row-length": `${time.length}`,
        "--hour-bg-hue": `${content.color.h}`,
        "--hour-bg-saturation": `${content.color.s * 100}%`,
        "--hour-bg-lightness": `${content.color.l * 100}%`,
        "--input-color-text-color": content.text,
      }} ref={$class}
    >
      <FlowType elementRef={$class} options={{
        maxFont: 16, fontRatio: 10
      }}>
        {content.name}
      </FlowType>
    </button>
  );
}


export default CalendarClassHour;