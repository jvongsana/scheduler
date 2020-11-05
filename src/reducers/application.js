const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

// reducer of actions
const reducer = function(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      }; 
      const day = state.day;
      const days = [...state.days];

      if (!Object.keys(appointment.interview).length) {
        for (const selectedDay of days) {
          if (selectedDay.name === day) {
            selectedDay.spots++;
          }
        }
      } else if (!(state.appointments[action.id].interview)) {
        for (const selectedDay of days) {
          if (selectedDay.name === day){
            selectedDay.spots--;
          }
        }
      }

      return {
        ...state, 
        appointments,
        days
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
} 

export default reducer;
export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };
