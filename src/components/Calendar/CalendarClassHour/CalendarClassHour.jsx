import "../../UI/Colors/Colors.css"
import "./CalendarClassHour.css";

const CalendarClassHour = ({ time, content, firstHour }) => {
  return (
    <button className="hour__space hour__class class-box custom-color custom-color-text"
      style={{
        "--hour-row-start": `${time.hour - firstHour + 1}`,
        "--hour-row-length": `${time.length}`,
        "--hour-bg-hue": `${content.color.h}`,
        "--hour-bg-saturation": `${content.color.s * 100}%`,
        "--hour-bg-lightness": `${content.color.l * 100}%`,
        "--input-color-text-color": content.text,
      }}
    >
      {content.name}
    </button>
  );
}


export default CalendarClassHour;