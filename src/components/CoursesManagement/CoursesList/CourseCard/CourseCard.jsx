import React from "react";
import Button from "../../../UI/Button/Button";
import { IconArrowsMove, IconTrash, IconPlus, IconSelect, IconSelector } from "@tabler/icons-react";
import InputColorBgAndText from "../../../UI/InputColorBgAndText/InputColorBgAndText";
import "./CourseCard.css";

const CourseCard = (props) => {
  const onRemove = () => {
    if (props.onRemove) {
      props.onRemove();
    }
  }
  const onInputChange = (field, value) => {
    if (props.onInputChange) {
      props.onInputChange(field, value);
    }
  }
  const onInputChangeEnds = (field, value) => {
    if (props.onInputChangeEnds) {
      props.onInputChangeEnds(field, value);
    }
  }
  // console.log("COLOR", props.color);
  return (
    <article className="course-card">
      <section className="course-controls">
        <Button>
          <IconArrowsMove></IconArrowsMove>
        </Button>
        <Button
          onClick={() => {
            onRemove()
          }}
          className="remove-btn"
        >
          <IconTrash></IconTrash>
        </Button>
      </section>
      <div className="course-color-input">
        <InputColorBgAndText
          color={props.color}
          text={props.text}
          onChange={(color) => onInputChange("color", color.hsl)}
          onChangeComplete={(color) => onInputChangeEnds("color", color.hsl)}
          onTextChange={(color) => onInputChange("text", color.hex)}
          onTextChangeComplete={(color) => onInputChangeEnds("text", color.hex)}
        />
      </div>
      <div className="course-form">
        <input
          type="text"
          className="form-input"
          placeholder="Name"
          onChange={(event) => { onInputChangeEnds("name", event.target.value) }}
          value={props.name}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Professor"
          onChange={(event) => { onInputChangeEnds("professor", event.target.value) }}
          value={props.professor}
        />
        <div className="form-controls-inline">
          <input
            type="text"
            className="form-input"
            placeholder="Group name"
            onChange={(event) => { onInputChangeEnds("groupName", event.target.value) }}
            value={props.groupName}
          />

          <div className="form-controls-group">
            <input
              type="text"
              className="form-input"
              placeholder="Classroom"
              onChange={(event) => { onInputChangeEnds("classrooms", event.target.value) }}
              value={props.classrooms}
            />
            <Button
              className={"btn-secondary"}
            >
              <IconSelector></IconSelector>
            </Button>
            <Button
              className={"btn-secondary"}
            >
              <IconPlus></IconPlus>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
export default CourseCard;