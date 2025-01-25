import { useRef } from "react";
import FlowType from "../../common/FlowType/FlowType";

import "../../UI/Colors/Colors.css"
import "./CalendarClass.css";
const CalendarClass = ({
  children, className = '', style = {},
  onClick = () => { },
  course,
}) => {
  const $class = useRef(null);
  const $classrooms = useRef(null);

  return (
    <button className={`${className} class-box custom-color custom-color-text`}
      style={{
        ...style,
        "--hour-bg-hue": `${course.color.h}`,
        "--hour-bg-saturation": `${course.color.s * 100}%`,
        "--hour-bg-lightness": `${course.color.l * 100}%`,
        "--input-color-text-color": course.text,
      }}

      onClick={() => { onClick() }}
    >
      {children}
      <span className="classroom" ref={$classrooms}>
        <FlowType elementRef={$classrooms} options={{
          maxFont: 24, fontRatio: 8
        }}>
          {course.classrooms}
        </FlowType>
      </span>
      <span className="content" ref={$class}>
        <FlowType elementRef={$class} options={{
          maxFont: 24, fontRatio: 8
        }}>
          {course.name}
        </FlowType>
      </span>
    </button >
  );
}


export default CalendarClass;