import React, { useContext, useReducer } from "react";
import Calendar from "../Calendar/Calendar";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation";
import CoursesManagement from "../CoursesManagement/CoursesManagement";
import { CurrentStateContext, ScheduleContext, ScheduleDispatchContext } from "../../contexts/Schedule.context";
import { stateReducer, defaultState } from './StateReducer';
let amountOfClasses = 5;
import './ScheduleCreator.css';

const ScheduleCreator = () => {
    // const state = useContext(ScheduleContext);
    const [state, dispatchState] = useReducer(
        stateReducer,
        defaultState
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
                            <section className="courses-management">
                                <CoursesManagement />
                            </section>
                            <section className="calendar">
                                <Calendar />
                            </section>
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