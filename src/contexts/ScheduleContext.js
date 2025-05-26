import { createContext, useContext } from 'react';

const CurrentStateContext = createContext(null);
const ScheduleContext = createContext(null);
const ScheduleDispatchContext = createContext(null);

export const useCurrentState = () => {
  return useContext(CurrentStateContext);
}
export const useScheduleState = () => {
  return useContext(ScheduleContext);
}
export const useScheduleStateDispatch = () => {
  return useContext(ScheduleDispatchContext);
}
export { CurrentStateContext, ScheduleContext, ScheduleDispatchContext };