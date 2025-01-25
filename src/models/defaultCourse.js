import { v4 as uuidv4 } from 'uuid';

const defaultCourse = {
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
  classrooms: [""],
  groupName: "",
  id: uuidv4(),
}
export default defaultCourse;