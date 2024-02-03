import React, { useContext, useReducer } from "react";
import Calendar from "../Calendar/Calendar";
import HistoryNavigation from "../HistoryNavigation/HistoryNavigation";
import { produce } from 'immer';
import CoursesManagement from "../CoursesManagement/CoursesManagement";
import { CurrentStateContext, ScheduleContext, ScheduleDispatchContext } from "../../contexts/Schedule.context";

let amountOfClasses = 5;

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
                    <HistoryNavigation
                        onClickOnPreviousStep={() => handlePreviousStep()}
                        onClickOnNextStep={() => handleNextStep()}
                    />
                    <CurrentStateContext.Provider value={{ courses: currentCourses, hoursMap: currentHoursMap }}>
                        <CoursesManagement/>
                        <Calendar/>
                    </CurrentStateContext.Provider>
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
function stateReducer(state, action) {
    console.log(state,action);
    switch (action.task) {
        case 'previousStep': {
            return handlePreviousStep(state);
        }
        case 'nextStep': {
            return handleNextStep(state);
        }
        case 'clickOnHour': {
            return handleClickOnHour(state, action.day, action.hour);
        }
        case 'courseChange': {
            return handleCourseChange(state, action.index, action.field, action.value);
        }
        case 'courseChangeOutHistory': {
            return handleCourseChangeOutHistory(state, action.index, action.field, action.value);
        }
        case 'addCourse': {
            console.log("LLEGA");
            return handleAddCourse(state);
        }
        case 'removeCourse': {
            return handleRemoveCourse(state, action.index);
        }
        default: {
            return state;
        }
    }
}

const handlePreviousStep = (state) => {
    let newTime = state.currentTime - 1;
    if (newTime < 0) {
        // newTime=0;
        return state;
    }
    return {
        ...state,
        currentTime: newTime,
    };
}
const handleNextStep = (state) => {
    let newTime = state.currentTime + 1;
    if (newTime >= state.history.length) {
        // newTime=state.history.length-1;
        return state;
    }
    return {
        ...state,
        currentTime: newTime,
    };
}
const handleClickOnHour = (state, day, hour) => {
    const nextState = produce(state, (stateDraft) => {
        const currentTime = stateDraft.currentTime;
        const history = stateDraft.history.slice(0, currentTime + 1);
        const currentIndexCourses = history[currentTime].currentIndexCourses;
        const coursesHistoryMap = stateDraft.historyMap.courses.slice(0, currentIndexCourses + 1);
        const currentIndexHoursMap = history[currentTime].currentIndexHoursMap;
        const hoursMapHistoryMap = stateDraft.historyMap.hoursMap.slice(0, currentIndexHoursMap + 1);

        const newHoursMap = produce(hoursMapHistoryMap[currentIndexHoursMap], (hoursMapDraft) => {
            // console.log(coursesHistoryMap[currentIndexCourses].length);
            hoursMapDraft[day][hour]++;
            hoursMapDraft[day][hour] %= coursesHistoryMap[currentIndexCourses].length + 1;
        });

        history.push({
            change: "Updated hours",
            currentIndexHoursMap: currentIndexHoursMap + 1,
            currentIndexCourses: history[currentTime].currentIndexCourses,
        });
        stateDraft.history = history;

        hoursMapHistoryMap.push(newHoursMap);
        stateDraft.historyMap = {
            courses: coursesHistoryMap,
            hoursMap: hoursMapHistoryMap,
        }

        stateDraft.currentTime++;
    });
    return nextState;
}

const handleCourseChange = (state, index, field, value) => {
    const currentTime = state.currentTime;
    const history = state.history.slice(0, currentTime + 1);

    const currentIndexCourses = history[currentTime].currentIndexCourses;
    const coursesHistoryMap = state.historyMap.courses.slice(0, currentIndexCourses + 1);

    const currentIndexHoursMap = history[currentTime].currentIndexHoursMap;
    const hoursMapHistoryMap = state.historyMap.hoursMap.slice(0, currentIndexHoursMap + 1);

    // console.log(currentTime, currentIndexCourses, coursesHistoryMap, index);
    coursesHistoryMap.push(
        produce(coursesHistoryMap[currentIndexCourses], (coursesDraft) => {
            // console.log();
            // coursesDraft[index].save[field] = 1;
            coursesDraft[index].save[field] = coursesDraft[index][field];
            coursesDraft[index][field] = value;
        })
    );
    coursesHistoryMap[currentIndexCourses] = produce(coursesHistoryMap[currentIndexCourses],
        (coursesDraft) => {
            coursesDraft[index][field] = coursesDraft[index].save[field];
        }
    );
    history.push({
        change: "Edit course",
        currentIndexHoursMap: currentIndexHoursMap,
        currentIndexCourses: currentIndexCourses + 1,
    });
    return {
        history: history,
        historyMap: {
            hoursMap: hoursMapHistoryMap,
            courses: coursesHistoryMap,
        },
        currentTime: currentTime + 1,
    }
}
const handleCourseChangeOutHistory = (state, index, field, value) => {
    const currentIndexCourses = state.history[state.currentTime].currentIndexCourses;
    const coursesHistoryMap = state.historyMap.courses.slice();

    coursesHistoryMap[currentIndexCourses] = produce(coursesHistoryMap[currentIndexCourses],
        (coursesDraft) => {
            coursesDraft[index][field] = value;
        }
    );

    return {
        ...state,
        historyMap: {
            ...state.historyMap,
            courses: coursesHistoryMap,
        },
    };
}

const handleAddCourse = (state) => {
    console.log("A");
    const currentTime = state.currentTime;
    const history = state.history.slice(0, currentTime + 1);

    const currentIndexCourses = history[currentTime].currentIndexCourses;
    const coursesHistoryMap = state.historyMap.courses.slice(0, currentIndexCourses + 1);

    const currentIndexHoursMap = history[currentTime].currentIndexHoursMap;
    const hoursMapHistoryMap = state.historyMap.hoursMap.slice(0, currentIndexHoursMap + 1);

    const updatedCourses = produce(coursesHistoryMap[currentIndexCourses], (coursesDraft) => {
        coursesDraft.push(
            {
                save: {
                    color: {
                        h: 0,
                        s: .50,
                        l: 1,
                    },
                },
                color: {
                    h: 0,
                    s: .50,
                    l: 1,
                },
                name: "",
                abbreviation: "",
                professor: "",
                numberOfHours: 0,
                hasProfessor: false,
            }
        );
    });
    coursesHistoryMap.push(updatedCourses);

    history.push({
        change: "Add course",
        currentIndexHoursMap: currentIndexHoursMap,
        currentIndexCourses: currentIndexCourses + 1,
    });
    console.log("DEV - ScheduleCreator - handleAddCourse() - Previous State", state);
    return {
        history: history,
        historyMap: {
            hoursMap: hoursMapHistoryMap,
            courses: coursesHistoryMap,
        },
        currentTime: currentTime + 1,
    }
}
const handleRemoveCourse = (state, index) => {
    const currentTime = state.currentTime;
    const history = state.history.slice(0, currentTime + 1);

    const currentIndexCourses = history[currentTime].currentIndexCourses;
    const coursesHistoryMap = state.historyMap.courses.slice(0, currentIndexCourses + 1);

    const currentIndexHoursMap = history[currentTime].currentIndexHoursMap;
    const hoursMapHistoryMap = state.historyMap.hoursMap.slice(0, currentIndexHoursMap + 1);

    const updatedCourses = produce(coursesHistoryMap[currentIndexCourses], (coursesDraft) => {
        coursesDraft.splice(index, 1);
    });
    coursesHistoryMap.push(updatedCourses);

    history.push({
        change: "Remove course",
        currentIndexHoursMap: currentIndexHoursMap,
        currentIndexCourses: currentIndexCourses + 1,
    });
    return {
        history: history,
        historyMap: {
            hoursMap: hoursMapHistoryMap,
            courses: coursesHistoryMap,
        },
        currentTime: currentTime + 1,
    };
}


const defaultState = {
    save: {
        color: {
            h: 44,
            s: .91,
            l: .56
        },
        text: {
            h: 55,
            s: 0,
            l: 1
        },
    },
    color: {
        h: 44,
        s: .91,
        l: .56
    },
    text: {
        h: 55,
        s: 0,
        l: 1
    },
    name: "Sin nombre",
    professor: "",
    classroom: "",
    groupName: "",
}