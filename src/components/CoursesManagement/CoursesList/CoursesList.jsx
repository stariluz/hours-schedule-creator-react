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