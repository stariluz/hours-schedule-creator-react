import { produce } from 'immer';

export function stateReducer(state, action) {
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
  console.log(state, {
      history: history,
      historyMap: {
          hoursMap: hoursMapHistoryMap,
          courses: coursesHistoryMap,
      },
      currentTime: currentTime + 1,
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
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);

  const currentIndexCourses = history[currentTime].currentIndexCourses;
  const coursesHistoryMap = state.historyMap.courses.slice(0, currentIndexCourses + 1);

  const currentIndexHoursMap = history[currentTime].currentIndexHoursMap;
  const hoursMapHistoryMap = state.historyMap.hoursMap.slice(0, currentIndexHoursMap + 1);

  const updatedCourses = produce(coursesHistoryMap[currentIndexCourses], (coursesDraft) => {
      coursesDraft.push(defaultCourse);
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
export const defaultCourse={
  save: {
      color: {
          h: 341,
          s: 1,
          l: 0.67
      },
      text: "#fff",
  },
  color: {
      h: 341,
      s: 1,
      l: 0.67
  },
  text: "#fff",
  name: "",
  professor: "",
  classroom: "",
  groupName: "",
}
export const defaultState = {
  currentTime: 0,
  history: [
      {
          change: "Start of the file",
          currentIndexHoursMap: 0,
          currentIndexCourses: 0,
      }
  ],
  historyMap: {
      hoursMap: [
          Array(7).fill(Array(24).fill(0))
      ],
      courses: [
          [defaultCourse]
      ],
  },
}