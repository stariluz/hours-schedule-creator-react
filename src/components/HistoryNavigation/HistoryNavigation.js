import React from "react";
import { useSchedule, useScheduleDispatch } from "../ScheduleCreator/ScheduleCreator";

const HistoryNavigation = () => {
    const scheduleDispatch = useScheduleDispatch();
    const onClickOnPreviousStep = () => {
        scheduleDispatch({
            task: 'previousStep',
        });
    }
    const onClickOnNextStep = () => {
        scheduleDispatch({
            task: 'nextStep',
        });
    }
    return (
        <div className="">
            <button
                onClick={() => onClickOnPreviousStep()}
            >Previous</button>
            <button
                onClick={() => onClickOnNextStep()}
            >Next</button>
            <button>See last changes</button>
        </div>
    );
}
export default HistoryNavigation;