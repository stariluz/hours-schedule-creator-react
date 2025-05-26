import React from "react";
import { useScheduleStateDispatch } from "../../contexts/ScheduleContext";
import { IconArrowBackUp, IconArrowForwardUp, IconHistory } from "@tabler/icons-react";
import Button from "../UI/Button/Button";
import "./HistoryNavigation.css";

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
        <div className="history-menu">
            <Button
                className={'btn-traslucid'}
                onClick={() => onClickOnPreviousStep()}
            >
                <IconArrowBackUp/>
            </Button>
            <Button
                className={'btn-traslucid'}
                onClick={() => onClickOnNextStep()}
            >
                <IconArrowForwardUp/>
            </Button>
            {/* <Button
                className={'btn-traslucid'}
            >
                <IconHistory/>
            </Button> */}
        </div>
    );
}
export default HistoryNavigation;