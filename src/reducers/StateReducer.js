import { current, produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

export function stateReducer(state, action) {
  switch (action.task) {
    case 'previousStep': {
      return handlePreviousStep(state);
    }
    case 'nextStep': {
      return handleNextStep(state);
    }
    case 'changeHourUnsave': {
      return handleChangeHourUnsave(state, action.day, action.hour);
    }
    case 'saveHoursChanges': {
      return handleSaveHoursChanges(state);
    }
    case 'changeHour': {
      return handleChangeHour(state, action.day, action.hour);
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
    case 'addHourAtBegin': {
      return handleAddHourAtBegin(state);
    }
    case 'addHourAtEnd': {
      return handleAddHourAtEnd(state);
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

const handleChangeHourUnsave = (state, day, hour) => {
  if (
    state.selectedTool == 'brush' &&
    state.selectedCourse == null
  ) {
    return state
  }

  const { currentTime, history } = copyHistory(state);
  const stateUpdate = produce(history[currentTime], (currentState) => {
    if (state.selectedTool == 'brush') {
      currentState.hoursMap.unsave[day][hour] = state.selectedCourse.id;
    } else if (state.selectedTool == "eraser") {
      currentState.hoursMap.unsave[day][hour] = null;
    }
  });
  history[currentTime] = stateUpdate;
  return {
    ...state,
    history: history,
    currentTime: currentTime,
  };
}

const handleSaveHoursChanges = (state) => {
  const { currentTime, history } = copyHistory(state);
  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.hoursMap.unsave = currentState.hoursMap.save;
  });
  const newState = produce(history[currentTime], (currentState) => {
    if (state.selectedTool == "brush") {
      currentState.change = "Paint hours";
    } else if (state.selectedTool == "eraser") {
      currentState.change = "Erease hours";
    }
    currentState.hoursMap.save = currentState.hoursMap.unsave;
  });

  history[currentTime] = stateUpdate;
  history.push(newState);

  return {
    ...state,
    history: history,
    currentTime: currentTime + 1,
  };
}

const handleChangeHour = (state, day, hour) => {
  if (
    state.selectedTool == 'brush' &&
    state.selectedCourse == null
  ) {
    return state
  }

  const { currentTime, history } = copyHistory(state);
  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.hoursMap.unsave = currentState.hoursMap.save;
  });
  const newState = produce(history[currentTime], (currentState) => {
    if (state.selectedTool == "brush") {
      currentState.hoursMap.unsave[day][hour] = state.selectedCourse.id;
      currentState.hoursMap.save[day][hour] = state.selectedCourse.id;
      currentState.change = "Paint hour";
    } else if (state.selectedTool == "eraser") {
      currentState.hoursMap.unsave[day][hour] = null;
      currentState.hoursMap.save[day][hour] = null;
      currentState.change = "Erease hour";
    }
  });

  history[currentTime] = stateUpdate;
  history.push(newState);

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

const handleAddHourAtBegin = (state) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);

  if (state.history[currentTime].hours[0].begin <= 0) {
    return;
  }

  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.hours[0].begin--;

    currentState.change = "Add hour at begin";

  });

  history.push(stateUpdate);
  return {
    ...state,
    history: history,
    currentTime: currentTime + 1,
  };
}

const handleAddHourAtEnd = (state) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);

  const lastIndex = state.history[currentTime].hours.length-1;
  if (state.history[currentTime].hours[lastIndex].end >= 24) {
    return;
  }

  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.hours[lastIndex].end++;

    currentState.change = "Add hour at end";

  });

  history.push(stateUpdate);
  return {
    ...state,
    history: history,
    currentTime: currentTime + 1,
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
    currentState.hoursMap.save = currentState.hoursMap.save.map((day) => {
      return day.map((hour) => {
        return hour != courseId ? hour : null;
      });
    });
    currentState.hoursMap.unsave = currentState.hoursMap.save;
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
const copyHistory = (state) => {
  return {
    currentTime: state.currentTime,
    history: state.history.slice(0, state.currentTime + 1)
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
      hoursMap: {
        save: Array(7).fill(Array(24).fill(null)),
        unsave: Array(7).fill(Array(24).fill(null)),
      },
      courses: {
        [defaultCourse.id]: defaultCourse,
      },
      coursesSort: [
        defaultCourse.id,
      ],
      hours: Array(1).fill({ begin: 7, end: 20 }),
    }
  ],
  selectedTool: 'brush',
  selectedCourse: defaultCourse,
}