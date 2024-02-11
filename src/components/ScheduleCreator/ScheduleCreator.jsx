import React, { useContext, useReducer } from "react";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation";
import CoursesManagement from "../CoursesManagement/CoursesManagement";
import { CurrentStateContext, ScheduleContext, ScheduleDispatchContext, } from "../../contexts/Schedule.context";
import { stateReducer, defaultState } from './StateReducer';
let amountOfClasses = 5;
import './ScheduleCreator.css';
import CourseSelectionManager from "../CoursesManagement/CourseSelectionManager/CourseSelectionManager";
import Calendar from "../Calendar/Calendar";

const ScheduleCreator = () => {
    // const state = useContext(ScheduleContext);
    const [state, dispatchState] = useReducer(
        stateReducer,
        defaultState
    );

    const currentTime = state.currentTime;
    const currentState = state.history[currentTime];

    return (
        <div>
            <ScheduleContext.Provider value={state}>
                <ScheduleDispatchContext.Provider value={dispatchState}>
                    <header className="history">
                        <HistoryNavigation
                            onClickOnPreviousStep={() => handlePreviousStep()}
                            onClickOnNextStep={() => handleNextStep()}
                        />
                    </header>
                    <main className="playground">
                        <CurrentStateContext.Provider value={currentState}>
                            <CoursesManagement />
                            <CourseSelectionManager />
                            <Calendar />
                        </CurrentStateContext.Provider>
                    </main>
                </ScheduleDispatchContext.Provider>
            </ScheduleContext.Provider>
        </div>
    );
}

export default ScheduleCreator;

export const useCurrentState = () => {
    return useContext(CurrentStateContext);
}
export const useScheduleState = () => {
    return useContext(ScheduleContext);
}
export const useScheduleStateDispatch = () => {
    return useContext(ScheduleDispatchContext);
}