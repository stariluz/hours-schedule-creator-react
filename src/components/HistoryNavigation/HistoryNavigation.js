import React from "react";
import { useScheduleState, useScheduleStateDispatch } from "../ScheduleCreator/ScheduleCreator";

const HistoryNavigation = () => {
    const scheduleDispatch = useScheduleStateDispatch();
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