import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

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
      return selectDefaultCourse(
        handleRemoveCourse(state, action.courseId)
      );
    }
    case 'changeTool': {
      return handleChangeTool(state, action);
    }
    case 'selectCourse': {
      return handleSelectCourse(state, action);
    }
    case 'selectDefaultCourse': {
      return selectDefaultCourse(state);
    }
    case 'loadContent': {
      return selectDefaultCourse(
        loadContent(state, action.content)
      );
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
  return {
    ...state,
    history: history,
    currentTime: currentTime + 1,
  };
}
const handleCourseChange = (state, courseId, field, value) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);

  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.courses[courseId].save[field] = currentState.courses[courseId][field];
    currentState.courses[courseId][field] = value;
    currentState.change = "Edit course";
  });
  history[currentTime] = produce(history[currentTime],
    (currentState) => {
      currentState.courses[courseId][field] = currentState.courses[courseId].save[field];
    }
  );
  history.push(stateUpdate);
  return {
    ...state,
    history: history,
    currentTime: currentTime + 1,
  };
}
const handleCourseChangeOutHistory = (state, courseId, field, value) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);

  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.courses[courseId][field] = value;
  });
  history[currentTime] = stateUpdate;
  return {
    ...state,
    history: history,
    currentTime: currentTime,
  };
}

const handleAddCourse = (state) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);
  let newCourse;
  const stateUpdate = produce(history[currentTime], (currentState) => {
    const courseId = uuidv4();
    currentState.coursesSort.push(courseId);
    newCourse = { ...defaultCourse, id: courseId };
    currentState.courses[courseId] = newCourse;
    currentState.change = "Add course";

  });

  history.push(stateUpdate);
  return {
    ...state,
    history: history,
    currentTime: currentTime + 1,
    selectedCourse: newCourse,
  };
}
const handleRemoveCourse = (state, courseId) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);
  const index = history[currentTime].coursesSort.indexOf(courseId);
  if (index === undefined) {
    return state;
  }
  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.coursesSort.splice(index, 1);
    delete currentState.courses[courseId];
    currentState.change = "Remove course";
  });
  history.push(stateUpdate);
  return {
    ...state,
    history: history,
    currentTime: currentTime + 1,
  };
}
const handleChangeTool = (state, action) => {
  return {
    ...state,
    selectedTool: action.tool,
  };
}

const handleSelectCourse = (state, action) => {
  return {
    ...state,
    selectedCourse: action.course,
  };
}
const selectDefaultCourse = (state) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);
  let selectedCourse = null;
  if (history[currentTime].coursesSort.length > 0) {
    selectedCourse = history[currentTime].courses[history[currentTime].coursesSort[0]];
  }
  
  return {
    ...state,
    selectedCourse: selectedCourse,
  }
}
const loadContent = (state, content) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);
  
  const stateUpdate = produce(content, (newState) => {
    newState.change = "Load Schedule Data";
  });
  history.push(stateUpdate);
  
  return {
    ...state,
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
  selectedTool: 'brush',
  selectedCourse: defaultCourse,
}