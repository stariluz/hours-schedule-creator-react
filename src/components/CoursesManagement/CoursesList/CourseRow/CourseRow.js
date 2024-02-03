import React from "react";
import "./CourseRow.css";
import { SketchPicker, PhotoshopPicker } from "react-color";
import InputColorPicker from "../../../FormsComponents/InputColorPicker/InputColorPicker";

const CourseRow = (props) => {
  const onInput = (field, event) => {
    if (props?.onCourseChange) {
      props.onCourseChange(field, event.target.value);
    }
  }
  const onColorChange = (color) => {
    // console.log("FAST:", color.hsl);
    if (props?.onCourseChangeOutHistory) {
      props.onCourseChangeOutHistory("color", color.hsl)
    }
  }
  const onNewColorSelected = (color) => {
    // console.log("COLOR:", color.hsl);
    if (props?.onCourseChange) {
      props.onCourseChange("color", color.hsl)
    }
  }
  return (
    <div className="course-row">
      <div className="course-row__color">
        <InputColorPicker
          color={{
            hsl: props.color
          }}
          onChange={(color) => onColorChange(color)}
          onChangeComplete={(color) => onNewColorSelected(color)}
        />
      </div>
      <div className="course-row__name">
        <input type="text"
          placeholder="Nombre"
          onChange={(event) => { onInput("name", event) }}
          value={props.name}
        />
      </div>
      <div className="course-row__abbreviation">
        <input type="text"
          placeholder="Abrebviación"
          onChange={(event) => { onInput("abbreviation", event) }}
          value={props.abbreviation}
        />
      </div>
      <div className="course-row__professor">
        <input type="text"
          placeholder="Profesor"
          onChange={(event) => { onInput("professor", event) }}
          value={props.professor}
        />
      </div>
      <div className="course-row__hours">
        N.of.H: {props.numberOfHours}
      </div>

      <button
        onClick={() => {
          props.onRemoveCourse()
        }}
      >
        x
      </button>
    </div>
  );
}
export default CourseRow;