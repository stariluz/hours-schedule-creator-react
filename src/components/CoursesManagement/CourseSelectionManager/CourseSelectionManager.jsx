import React, { useEffect, useState } from "react";
import { useCurrentState } from "../../ScheduleCreator/ScheduleCreator";
import '../../Calendar/Hour/Hour.css';
import './CourseSelectionManager.css';
import { IconBrush, IconEraser, IconPointer, IconPointerFilled } from "@tabler/icons-react";
import Button from "../../UI/Button/Button";

const CourseSelectionManager = () => {
  const [selectedTool, setSelectedTool] = useState('pointer');
  const onSelectPointer = () => {
    setSelectedTool('pointer');
  }
  const onSelectBrush = () => {
    setSelectedTool('brush');
  }
  const onSelectEraser = () => {
    setSelectedTool('eraser');
  }
  return (
    <div className="course-selection-manager">
      <div className="section-controls">
        <Button
          active={selectedTool == 'pointer'}
          className={'btn-secondary'}
          onClick={() => onSelectPointer()}
        >
          <IconPointer></IconPointer>
        </Button>
        <Button
          active={selectedTool == 'brush'}
          className={'btn-secondary'}
          onClick={() => onSelectBrush()}
        >
          <IconBrush></IconBrush>
        </Button>
        <Button
          active={selectedTool == 'eraser'}
          className={'btn-secondary'}
          onClick={() => onSelectEraser()}
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
  const [selectedCourse, setSelectedCourse] = useState(null);
  const onSelectCourse = (course) => {
    setSelectedCourse(course);
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
        {course.id == selectedCourse?.id ? <div className="active-box"></div> : null}
        <span className="course-option-name">
          {course.name}
        </span>
      </button>)
  })
}


export default CourseSelectionManager;