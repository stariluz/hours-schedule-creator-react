import React, { useEffect, useState } from "react";
import { useCurrentState, useSelector, useSelectorDispatch } from "../../ScheduleCreator/ScheduleCreator";
import '../../Calendar/Hour/Hour.css';
import './CourseSelectionManager.css';
import { IconBrush, IconEraser, IconPointer, IconPointerFilled } from "@tabler/icons-react";
import Button from "../../UI/Button/Button";

const CourseSelectionManager = () => {
  const selector = useSelector();
  const selectorDispatchContext = useSelectorDispatch();
  const onSelectTool = (tool) => {
    selectorDispatchContext({
      task: "changeTool",
      tool: tool
    });
  }
  return (
    <div className="course-selection-manager">
      <div className="section-controls">
        <Button
          active={selector.selectedTool == 'select'}
          className={'btn-secondary'}
          onClick={() => onSelectTool('select')}
        >
          <IconPointer></IconPointer>
        </Button>
        <Button
          active={selector.selectedTool == 'brush'}
          className={'btn-secondary'}
          onClick={() => onSelectTool('brush')}
        >
          <IconBrush></IconBrush>
        </Button>
        <Button
          active={selector.selectedTool == 'eraser'}
          className={'btn-secondary'}
          onClick={() => onSelectTool('eraser')}
        >
          <IconEraser></IconEraser>
        </Button>
      </div>
      <div className="course-options">
        <CourseSelectionOptions></CourseSelectionOptions>
      </div>
    </div>
  );
}

const CourseSelectionOptions = () => {
  const { courses } = useCurrentState();
  const selector = useSelector();
  const selectorDispatchContext = useSelectorDispatch();

  const onSelectCourse = (course) => {
    selectorDispatchContext({
      task: "selectCourse",
      course: course
    });
  }
  return courses?.map((course, index) => {
    return (

      <button className={`course-option class-box custom-color custom-color-text`}
        style={{
          "--hour-bg-hue": `${course.color.h}`,
          "--hour-bg-saturation": `${course.color.s * 100}%`,
          "--hour-bg-lightness": `${course.color.l * 100}%`,
          "--input-color-text-color": course.text,
        }}
        key={course.id}
        onClick={() => { onSelectCourse(course) }}
      >
        {course.id == selector.selectedCourse?.id ? <div className="active-box"></div> : null}
        <span className="course-option-name">
          {course.name}
        </span>
      </button>)
  })
}


export default CourseSelectionManager;