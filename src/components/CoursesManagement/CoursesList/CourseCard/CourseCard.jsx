import React from "react";
import Button from "../../../UI/Button/Button";
import { IconArrowsMove, IconTrash } from "@tabler/icons-react";
import InputColorBgAndText from "../../../FormsComponents/InputColorBgAndText/InputColorBgAndText";
import "./CourseCard.css";

const CourseCard = (props) => {
  const onRemove = () => {
    if (props.onRemove) {
      props.onRemove();
    }
  }
  const onInput = (type, event) => {
    if (props.onInputChange) {
      props.onInputChange(type, event.target.value);
    }
  }
  const onInputChangeEnds = (type, event) => {
    if (props.onInputChangeEnds) {
      props.onInputChangeEnds(type, event.target.value);
    }
  }
  const onColorChange = (color) => {
    // console.log("FAST:", color.hsl);
    if (props.onInputChange) {
      props.onInputChange("color", color.hsl)
    }
  }
  const onColorChangeEnds = (color) => {
    // console.log("COLOR:", color.hsl);
    if (props.onInputChangeEnds) {
      props.onInputChangeEnds("color", color.hsl)
    }
  }
  return (
    <article className="course-card">
      <section className="course-controls">
        <Button verticalButton={true}>
          <IconArrowsMove></IconArrowsMove>
        </Button>
        <Button verticalButton={true}
          onClick={() => {
            onRemove()
          }}
        >
          <IconTrash></IconTrash>
        </Button>
      </section>
      <div className="course-color-input">
        <InputColorBgAndText
          color={{
            hsl: props.color
          }}
          onChange={(color) => onColorChange(color)}
          onChangeComplete={(color) => onColorChangeEnds(color)}
        />
      </div>
      <div className="course-form">
        <input
          type="text"
          className="form-input"
          placeholder="Nombre"
          onChange={(event) => { onInputChangeEnds("name", event) }}
          value={props.name}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Professor"
          onChange={(event) => { onInputChangeEnds("professor", event) }}
          value={props.professor}
        />
        <div className="form-controls-inline">
          <input
            type="text"
            className="form-input"
            placeholder="Group name"
            onChange={(event) => { onInputChangeEnds("groupName", event) }}
            value={props.professor}
          />

          <input
            type="text"
            className="form-input"
            placeholder="Classroom"
            onChange={(event) => { onInputChangeEnds("classroom", event) }}
            value={props.professor}
          />
        </div>
      </div>
    </article>
  );
}
export default CourseCard;