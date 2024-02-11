
export function selectorReducer(selector, action) {
  switch (action.task) {
    case 'changeTool': {
      return handleChangeTool(selector, action);
    }
    case 'selectCourse': {
      return handleSelectCourse(selector, action);
    }
    default: {
      return selector;
    }
  }
}
export const defaultSelector={
  selectedTool:'select',
  selectedCourse: null,
}

const handleChangeTool=(selector, action)=>{
  return {
    ... selector,
    selectedTool: action.tool,
  };
}

const handleSelectCourse=(selector, action)=>{
  return {
    ... selector,
    selectedCourse: action.course,
  };
}