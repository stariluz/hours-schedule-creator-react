import React, { useContext, useReducer } from "react";
import CoursesManagement from "../CoursesManagement/CoursesManagement";
import { CurrentStateContext, ScheduleContext, ScheduleDispatchContext, } from "../../contexts/Schedule.context";
import { stateReducer } from '../../reducers/StateReducer';
import defaultState from '../../models/defaultState';
let amountOfClasses = 5;
import './ScheduleCreator.css';
import CourseSelectionManager from "../CoursesManagement/CourseSelectionManager/CourseSelectionManager";
import Calendar from "../Calendar/Calendar";
import Header from "../Header/Header";
import { ScheduleRefContext, ScheduleRefDispatchContext } from "../../contexts/scheduleRefContext";
import { scheduleRefReducer } from "../../reducers/ScheduleRefReducer";
import defaultScheduleRef from "../../models/defaultScheduleRef";

const ScheduleCreator = () => {
    // const state = useContext(ScheduleContext);
    const [state, dispatchState] = useReducer(
        stateReducer,
        defaultState
    );
    
    const [scheduleRef, dispatchScheduleRef] = useReducer(
        scheduleRefReducer,
        defaultScheduleRef
    );

    const currentTime = state.currentTime;
    const currentState = state.history[currentTime];

    return (
        <div className="app__container">
            <ScheduleContext.Provider value={state}>
                <ScheduleDispatchContext.Provider value={dispatchState}>

                    <ScheduleRefContext.Provider value={scheduleRef}>
                        <ScheduleRefDispatchContext.Provider value={dispatchScheduleRef}>
                            <header className="history">
                                <Header />
                            </header>
                            <main className="playground">
                                <CurrentStateContext.Provider value={currentState}>
                                    <CoursesManagement />
                                    <CourseSelectionManager />
                                    <Calendar />
                                </CurrentStateContext.Provider>
                            </main>

                        </ScheduleRefDispatchContext.Provider>
                    </ScheduleRefContext.Provider>
                </ScheduleDispatchContext.Provider>
            </ScheduleContext.Provider>
        </div>
    );
}

export const useCurrentState = () => {
    return useContext(CurrentStateContext);
}
export const useScheduleState = () => {
    return useContext(ScheduleContext);
}
export const useScheduleStateDispatch = () => {
    return useContext(ScheduleDispatchContext);
}
export const useScheduleRef = () => {
    return useContext(ScheduleRefContext);
}
export const useScheduleRefDispatch = () => {
    return useContext(ScheduleRefDispatchContext);
}

export default ScheduleCreator;
