import {useState, useEffect} from 'react';
import axios from "axios";

export function useApplicationData() {

  const [state, setState] = useState({
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
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: Object.keys(all[2].data).map(key => {
          return all[2].data[key];
      })
      }));
    })
  }, [state.days]);
 
  const setDay = day => setState({ ...state, day });

  const numOfSpots = function(id, spotTaken) {
    const days = [...state.days]

    const [selectedDay] = days.filter((day) => day.appointments.includes(id));

    console.log('before', selectedDay);

    if (spotTaken) {
      selectedDay.spots--;
    } else {
      selectedDay.spots++;
    }

    console.log('after', selectedDay);

    return selectedDay;
  }
  
 






  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });
   
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => numOfSpots(id, true));
  }
  
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => numOfSpots(id, false));

  } 
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}