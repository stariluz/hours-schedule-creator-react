import React from "react";
import "./CoursesList.css";
import { useCurrentState, useSchedule, useScheduleDispatch } from "../../ScheduleCreator/ScheduleCreator";
import CourseCard from "./CourseCard/CourseCard";
import CoursesListControls from "./CoursesListControls/CoursesListControls";

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
    const scheduleDispatch = useScheduleDispatch();
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

    const rows = coursesSort.map((courseId) => {
        return <CourseCard
            {...courses[courseId]}
            key={courseId}
            onInputChange={(field, value) => onCourseChangeOutHistory(courseId, field, value)}
            onInputChangeEnds={(field, value) => onCourseChange(courseId, field, value)}
            onRemove={() => onRemoveCourse(courseId)}
        />
    })
    return rows;
}
export default CoursesList;