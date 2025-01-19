export function scheduleRefReducer(scheduleRef, action) {
  switch (action.task) {
    case 'setRef': {
      return handleSetRef(scheduleRef, action.content);
    }
    case 'downloadScheduleAsImage': {
      return handleDownloadScheduleAsImage(scheduleRef);
    }
    default: {
      return state;
    }
  }
}

const handleSetRef = (scheduleRef, ref) => {
  return ref;
}

const handleDownloadScheduleAsImage = (state) => {
  // const { currentTime, history } = copyHistory(state);

  // const stateUpdate = produce(content, (newState) => {
  //   const { hoursMap, hours, courses, coursesSort } = repareScheduleMementoObject(newState);
  //   newState.hoursMap = hoursMap;
  //   newState.hours = hours;
  //   newState.courses = courses;
  //   newState.coursesSort = coursesSort;
  //   newState.change = "Load Schedule Data";
  // });
  // history.push(stateUpdate);

  // return {
  //   ...state,
  //   history: history,
  //   currentTime: currentTime;
  // };
}
