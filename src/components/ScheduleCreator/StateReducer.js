import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from './ScheduleCreator';

export function stateReducer(state, action) {
  switch (action.task) {
    case 'previousStep': {
      return handlePreviousStep(state);
    }
    case 'nextStep': {
      return handleNextStep(state);
    }
    case 'hoursMapChanges': {
      return handleHoursMapChanges(state, action.action, action.hoursMap);
    }
    case 'courseChange': {
      return handleCourseChange(state, action.courseId, action.field, action.value);
    }
    case 'courseChangeOutHistory': {
      return handleCourseChangeOutHistory(state, action.courseId, action.field, action.value);
    }
    case 'addCourse': {
      return handleAddCourse(state);
    }
    case 'removeCourse': {
      return handleRemoveCourse(state, action.courseId);
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
const handleHoursMapChanges = (state, action, hoursMap) => {
  console.log(action);
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);
  const updatedHoursMap = hoursMap;
  history.push({
    ...history[currentTime],
    change: action,
    hoursMap: updatedHoursMap,
  });
  return  {
    history: history,
    currentTime: currentTime+1,
  };
}
const handleCourseChange = (state, courseId, field, value) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);
  history[currentTime].courses=[]
  const index=history[currentTime].courses.findIndex((course)=>courseId==course.id);
  if(!index){
    return state;
  }

  const updatedCourses = produce(history[currentTime].courses,
    (coursesDraft) => {
      coursesDraft[index].save[field] = coursesDraft[index][field];
      coursesDraft[index][field] = value;
    }
  );
  history[currentTime].courses = produce(history[currentTime].courses,
    (coursesDraft) => {
      coursesDraft[index][field] = coursesDraft[index].save[field];
    }
  );
  history.push({
    ...history[currentTime],
    change: "Edit course",
    courses: updatedCourses,
  });
  return {
    history: history,
    currentTime: currentTime+1,
  };
}
const handleCourseChangeOutHistory = (state, courseId, field, value) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);
  const index=history[currentTime].courses.findIndex((course)=>courseId==course.id);
  if(!index){
    return state;
  }

  const updatedCourses = produce(history[currentTime].courses,
    (coursesDraft) => {
      coursesDraft[index][field] = value;
    }
  );
  history[currentTime]={
    ...history[currentTime],
    courses: updatedCourses,
  };
  return {
    history: history,
    currentTime: currentTime,
  };
}
const handleAddCourse = (state) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);

  const updatedCourses = produce(history[currentTime].courses, (coursesDraft) => {
    coursesDraft.push({ ...defaultCourse, id: uuidv4() });
  });
  history.push({
    ...history[currentTime],
    change: "Add course",
    courses: updatedCourses,
  });
  return {
    history: history,
    currentTime: currentTime + 1,
  };
}
const handleRemoveCourse = (state, courseId) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);
  const index=history[currentTime].courses.findIndex((course)=>courseId==course.id);
  if(!index){
    return state;
  }

  const updatedCourses = produce(history[currentTime].courses, (coursesDraft) => {
    coursesDraft.splice(index, 1);
  });
  history.push({
    ...history[currentTime],
    change: "Remove course",
    courses: updatedCourses,
  });
  return {
    history: history,
    currentTime: currentTime + 1,
  };
}
export const defaultCourse = {
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
  id: uuidv4(),
}
export const defaultState = {
  currentTime: 0,
  history: [
    {
      change: "Start of the file",
      hoursMap: Array(7).fill(Array(24).fill(null)),
      courses: {
        [defaultCourse.id]: defaultCourse,
      },
      coursesSort: [
        defaultCourse.id,
      ],
    }
  ],
}