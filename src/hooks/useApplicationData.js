import {useEffect, useReducer} from 'react';
import axios from "axios";

export function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

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
        return {
          ...state,
          interview: action.interview,
          appointments,
          days: action.days
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  } 

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

 useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: Object.keys(all[2].data).map(key => {
          return all[2].data[key];
        })
      });
    })
  }, []);
  
  
  const setDay = day => dispatch({ type: SET_DAY, ...state, day });

  const numOfSpots = function(id, mode) {
    const days = [...state.days]
    const [selectedDay] = days.filter((day) => day.appointments.includes(id));
    
    if (mode === 'CREATE') {
      selectedDay.spots--;
    } else if (mode === 'CONFIRM') {
      selectedDay.spots++;
    }
    
    return selectedDay;
  }

  const bookInterview = function(id, interview, mode) {
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      numOfSpots(id, mode);
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview,
        days: state.days
      })
     
    });
  }
  
  const cancelInterview = function(id, mode) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      numOfSpots(id, mode);
      dispatch({
        type: SET_INTERVIEW,
        ...state,
      })
    });

  } 
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}