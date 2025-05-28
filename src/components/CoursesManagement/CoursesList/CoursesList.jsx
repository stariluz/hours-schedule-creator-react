import React from "react";
import "./CoursesList.css";
import { useCurrentState, useScheduleState, useScheduleStateDispatch } from "../../../contexts/ScheduleContext";
import CourseCard from "./CourseCard/CourseCard";
import CoursesListControls from "./CoursesListControls/CoursesListControls";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { KeyboardSensor } from '@dnd-kit/core';
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
 } from '@dnd-kit/modifiers';

const CoursesList = () => {
  return (
    <div className="courses-list">
      <CoursesListControls />
      <div className="courses-forms-container">
        {RenderRows()}
      </div>
    </div>
  );
}
const RenderRows = () => {
  const { courses, coursesSort } = useCurrentState();
  const scheduleDispatch = useScheduleStateDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onCourseChangeOutHistory = (courseId, field, value) => {
    scheduleDispatch({
      task: 'courseChangeOutHistory',
      courseId: courseId,
      field: field,
      value: value,
    });
  }
  const onCourseChange = (courseId, field, value) => {
    scheduleDispatch({
      task: 'courseChange',
      courseId: courseId,
      field: field,
      value: value,
    });
  }
  const onRemoveCourse = (courseId) => {
    scheduleDispatch({
      task: 'removeCourse',
      courseId: courseId,
    });
  }

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = coursesSort.indexOf(active.id);
      const newIndex = coursesSort.indexOf(over.id);

      const newOrder = arrayMove(coursesSort, oldIndex, newIndex);

      scheduleDispatch({
        task: 'reorderCourses',
        newOrder,
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToFirstScrollableAncestor,restrictToVerticalAxis]}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={coursesSort} strategy={verticalListSortingStrategy}>
        <div className="courses-forms-container">
          {coursesSort.map((courseId) => (
            <CourseCard
              key={courseId} id={courseId}
              {...courses[courseId]}
              onInputChange={(field, value) => onCourseChangeOutHistory(courseId, field, value)}
              onInputChangeEnds={(field, value) => onCourseChange(courseId, field, value)}
              onRemove={() => onRemoveCourse(courseId)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
export default CoursesList;