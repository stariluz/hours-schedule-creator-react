import React from 'react'; // DEV

import "../../UI/Colors/Colors.css"
import "./Hour.css";
const HourNamespace = (props) => {
  let meridiem = 'am';
  let hour = props.hour;
  if (hour >= 12) {
    meridiem = 'pm';
    hour -= 12;
  }
  if (hour == 0) {
    hour = 12;
  }
  //${(hour < 10 ? '0' : '')}
  const value = `${hour}:00${meridiem}`;
  return (
    <div className="hour__time" key={value}>
      {value}
    </div>
  );
}
const HourSpace = (props) => {
  return (
    <button className={`hour__space ${props.thereIsClass ? 'hour__space--class' : ''}`}
      onClick={(event) => props.onClick(event)}
      onMouseDown={(event) => props.onMouseDown(event)}
      onMouseOver={(event) => props.onMouseOver(event)}
    >
    </button>
  );
}
const ClassHour = (props) => {
  return (
    // <div className="hour__space hour__space--fill"
    //     onClick={
    //         ()=>props.onClick()
    //     }
    // >
    <button className="hour__space hour__class class-box custom-color custom-color-text"
      style={{
        "--hour-row-start": `${props.time.hour - props.FIRST_HOUR + 1}`,
        "--hour-row-length": `${props.time.length}`,
        "--hour-bg-hue": `${props.content.color.h}`,
        "--hour-bg-saturation": `${props.content.color.s * 100}%`,
        "--hour-bg-lightness": `${props.content.color.l * 100}%`,
        "--input-color-text-color": props.content.text,
      }}
    >
      {props.content.name}
    </button>
    // </div>
  );
}


export { HourNamespace, HourSpace, ClassHour };