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

  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.courses[courseId].save[field] = currentState.courses[courseId][field];
    currentState.courses[courseId][field] = value;
    currentState.change="Edit course";
  });
  history[currentTime] = produce(history[currentTime],
    (currentState) => {
      currentState.courses[courseId][field] = currentState.courses[courseId].save[field];
    }
  );
  history.push(stateUpdate);
  return {
    history: history,
    currentTime: currentTime+1,
  };
}
const handleCourseChangeOutHistory = (state, courseId, field, value) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);

  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.courses[courseId][field] = value;
  });
  history[currentTime]=stateUpdate;
  return {
    history: history,
    currentTime: currentTime,
  };
}

const handleAddCourse = (state) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);
  const stateUpdate = produce(history[currentTime], (currentState) => {
    const courseId=uuidv4();
    currentState.coursesSort.push(courseId);
    currentState.courses[courseId]={ ...defaultCourse, id:courseId};
    currentState.change="Add course";
  });
  
  history.push(stateUpdate);
  return {
    history: history,
    currentTime: currentTime + 1,
  };
}
const handleRemoveCourse = (state, courseId) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);
  const index=history[currentTime].coursesSort.getIndexOf(courseId);
  if(!index){
    return state;
  }
  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.coursesSort.splice(index,1);
    delete currentState.courses[courseId];
    currentState.change="Remove course";
  });
  history.push(stateUpdate);
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