import React from "react";
import "./CoursesListControls.css";
import Button from "../../../UI/Button/Button";
import { IconCopyPlus, IconNewSection, IconPlus } from "@tabler/icons-react";
import { useScheduleDispatch } from "../../../ScheduleCreator/ScheduleCreator";

const CoursesListControls = () => {

    const scheduleDispatch = useScheduleDispatch();

    const onAddCourse = () => {
        scheduleDispatch({
            task: 'addCourse',
        });
    }
    return (
        <div className="section-controls">
            <Button
                className='btn-secondary'
                onClick={() => onAddCourse()}
            >
                <IconCopyPlus></IconCopyPlus>
            </Button>
        </div>
    );
}
export default CoursesListControls;