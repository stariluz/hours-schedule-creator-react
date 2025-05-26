import { createContext, useContext } from 'react';

const ScheduleRefContext = createContext(null);
const ScheduleRefDispatchContext = createContext(null);

export const useScheduleRef = () => {
  return useContext(ScheduleRefContext);
}
export const useScheduleRefDispatch = () => {
  return useContext(ScheduleRefDispatchContext);
}
export {
  ScheduleRefContext,
  ScheduleRefDispatchContext
}