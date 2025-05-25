import { current, produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

import defaultState from '../models/defaultState';
import defaultCourse from '../models/defaultCourse';

export function stateReducer(state, action) {
  switch (action.task) {
    case 'setTitle': {
      return handleSetTitle(state, action.value);
    }
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
    case 'removeHourAtBegin': {
      return handleRemoveHourAtBegin(state);
    }
    case 'removeHourAtEnd': {
      return handleRemoveHourAtEnd(state);
    }
    default: {
      return state;
    }
  }
}

const handleSetTitle = (state, value) => {
  if (value === null || typeof value != 'string') {
    return state;
  }
  const stateUpdate = produce(state, (_state) => {
    _state.title = value;
  });
  return stateUpdate;
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

  const lastIndex = state.history[currentTime].hours.length - 1;
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


const handleRemoveHourAtBegin = (state) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);

  if (state.history[currentTime].hours[0].begin >= state.history[currentTime].hours[0].end) {
    return;
  }

  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.hours[0].begin++;

    currentState.change = "Remove hour at begin";

  });

  history.push(stateUpdate);
  return {
    ...state,
    history: history,
    currentTime: currentTime + 1,
  };
}

const handleRemoveHourAtEnd = (state) => {
  const currentTime = state.currentTime;
  const history = state.history.slice(0, currentTime + 1);

  const lastIndex = state.history[currentTime].hours.length - 1;
  if (state.history[currentTime].hours[lastIndex].end <= state.history[currentTime].hours[lastIndex].begin) {
    return;
  }

  const stateUpdate = produce(history[currentTime], (currentState) => {
    currentState.hours[lastIndex].end--;

    currentState.change = "Remove hour at end";

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
  const title=content.title;
  const stateUpdate = produce(content, (newState) => {
    const { title, hoursMap, hours, courses, coursesSort } = repareScheduleMementoObject(newState);
    delete newState.title;
    newState.hoursMap = hoursMap;
    newState.hours = hours;
    newState.courses = courses;
    newState.coursesSort = coursesSort;
    newState.change = "Load Schedule Data";
  });
  history.push(stateUpdate);

  console.log(title);
  return {
    ...state,
    title: title,
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

const repareScheduleMementoObject = (memento) => {

  if (!('hoursMap' in memento)) {
    memento['hoursMap'] = defaultState.history[0].hoursMap;
  }
  if (!('coursesSort' in memento)) {
    memento['coursesSort'] = defaultState.history[0].coursesSort;
  }
  if (!('courses' in memento)) {
    memento['courses'] = defaultState.history[0].courses;
  }
  if (!('hours' in memento)) {
    memento = {
      ...memento,
      hours: [
        findMementoHoursLimits(memento)
      ]
    };
  }
  return { ...memento };
}

const findMementoHoursLimits = (memento) => {
  let minHour = 24, maxHour = 0;
  for (let i = 0; i < memento.hoursMap.save.length; i++) {
    for (let j = 0; j < minHour; j++) {
      memento.hoursMap.save[i][j]
      if (memento.hoursMap.save[i][j] != null) {
        if (j < minHour) {
          minHour = j;
        }
        break;
      }
    }
    for (let j = memento.hoursMap.save[i].length - 1; j >= maxHour; j--) {
      if (memento.hoursMap.save[i][j] != null) {
        if (j > maxHour) {
          maxHour = j;
        }
        break;
      }
    }
  }

  return {
    begin: minHour,
    end: maxHour
  };
}

