import {useEffect, useReducer} from 'react';
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export function useApplicationData() {
  
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

  const bookInterview = function(id, interview, mode) {
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
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
      dispatch({
        type: SET_INTERVIEW,
        ...state,
        id
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