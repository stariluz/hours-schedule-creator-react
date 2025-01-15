import defaultCourse from './defaultCourse';

const  defaultState = {
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
      hours: Array(1).fill({ begin: 7, end: 19 }),
    }
  ],
  selectedTool: 'brush',
  selectedCourse: defaultCourse,
}

export default defaultState;