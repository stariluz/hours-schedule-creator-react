import React, { useContext, useReducer } from "react";
import Calendar from "../Calendar/Calendar";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation";
import CoursesManagement from "../CoursesManagement/CoursesManagement";
import { CurrentStateContext, ScheduleContext, ScheduleDispatchContext, SelectorContext, SelectorDispatchContext } from "../../contexts/Schedule.context";
import { stateReducer, defaultState } from './StateReducer';
let amountOfClasses = 5;
import './ScheduleCreator.css';
import CourseSelectionManager from "../CoursesManagement/CourseSelectionManager/CourseSelectionManager";
import { defaultSelector, selectorReducer } from "./SelectorReducer";

const ScheduleCreator = () => {
    // const state = useContext(ScheduleContext);
    const [state, dispatchState] = useReducer(
        stateReducer,
        defaultState
    );
    const [selector, dispatchSelector] = useReducer(
        selectorReducer,
        defaultSelector
    );

    const currentTime = state.currentTime;
    const current = state.history[currentTime];
    const currentMap = state.historyMap;

    const currentIndexCourses = current.currentIndexCourses;
    const currentCourses = currentMap.courses[currentIndexCourses];

    const currentIndexHoursMap = current.currentIndexHoursMap;
    const currentHoursMap = currentMap.hoursMap[currentIndexHoursMap];
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
                        <CurrentStateContext.Provider value={{ courses: currentCourses, hoursMap: currentHoursMap }}>
                            <SelectorContext.Provider value={selector}>
                                <SelectorDispatchContext.Provider value={dispatchSelector}>
                                    <CoursesManagement />
                                    <CourseSelectionManager/>
                                    <Calendar />
                                </SelectorDispatchContext.Provider>
                            </SelectorContext.Provider>
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
export const useSchedule = () => {
    return useContext(ScheduleContext);
}
export const useScheduleDispatch = () => {
    return useContext(ScheduleDispatchContext);
}
export const useSelector = () => {
    return useContext(SelectorContext);
}
export const useSelectorDispatch = () => {
    return useContext(SelectorDispatchContext);
}