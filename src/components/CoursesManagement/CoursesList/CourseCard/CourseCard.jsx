import React, { useMemo } from "react";
import Button from "../../../UI/Button/Button";
import InputColorBgAndText from "../../../UI/InputColorBgAndText/InputColorBgAndText";
import { IconArrowsMove, IconTrash } from "@tabler/icons-react";
import "./CourseCard.css";
import {
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useLang } from "../../../../contexts/LangContext";

const CourseCard = (props) => {
  const { currentTranslation } = useLang();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  return (
    <article className="course-card" ref={setNodeRef} style={style}>
      <section className="course-controls">
        <div {...attributes} {...listeners} className='button button-drag'>
          <IconArrowsMove></IconArrowsMove>
        </div>
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
          id="name"
          placeholder={currentTranslation.placeholders.name}
          onChange={(event) => { onInputChangeEnds("name", event.target.value) }}
          value={props.name}
        />
        <input
          type="text"
          className="form-input"
          id="professor"
          placeholder={currentTranslation.placeholders.professor}
          onChange={(event) => { onInputChangeEnds("professor", event.target.value) }}
          value={props.professor}
        />
        <div className="form-controls-inline">
          <input
            type="text"
            className="form-input"
            id="groupName"
            placeholder={currentTranslation.placeholders.groupName}
            onChange={(event) => { onInputChangeEnds("groupName", event.target.value) }}
            value={props.groupName}
          />

          <input
            type="text"
            className="form-input"
            id="classroom"
            placeholder={currentTranslation.placeholders.classroom}
            onChange={(event) => { onInputChangeEnds("classroom", event.target.value) }}
            value={props.classroom}
          />
        </div>
      </div>
    </article>
  );
}
export default CourseCard;