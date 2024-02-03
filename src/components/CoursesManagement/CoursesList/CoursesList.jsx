import React from "react";
import CoursesListAddCourseButton from "./CourseRow/CoursesListAddCourseButton";

import "./CoursesList.css";
import { useCurrentState, useSchedule, useScheduleDispatch } from "../../ScheduleCreator/ScheduleCreator";
import CourseCard from "./CourseCard/CourseCard";

const CoursesList = () => {
    const scheduleDispatch = useScheduleDispatch();

    const onAddCourse = () => {
        scheduleDispatch({
            task: 'addCourse',
        });
    }

    return (
        <div className="courses-list">
            {RenderRows()}
            <CoursesListAddCourseButton
                onClick={() => onAddCourse()}
            />
        </div>
    );
}
const RenderRows = () => {
    const { courses } = useCurrentState();
    const scheduleDispatch = useScheduleDispatch();
    const onCourseChangeOutHistory = (index, field, value) => {
        scheduleDispatch({
            task: 'courseChangeOutHistory',
            index: index,
            field: field,
            value: value,
        });
    }
    const onCourseChange = (index, field, value) => {
        scheduleDispatch({
            task: 'courseChange',
            index: index,
            field: field,
            value: value,
        });
    }
    const onRemoveCourse = (index) => {
        scheduleDispatch({
            task: 'removeCourse',
            index: index,
        });
    }

    const rows = courses.map((row, index) => {
        return <CourseCard
            {...row}
            key={index}
            onInputChange={(field, value) => onCourseChangeOutHistory(index, field, value)}
            onInputChangeEnds={(field, value) => onCourseChange(index, field, value)}
            onRemove={() => onRemoveCourse(index)}
        />
    })
    return rows;
}
export default CoursesList;