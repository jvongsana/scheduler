// returns array of all the appointments for the day
function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];

  for (const availDay of state.days) {
    if (availDay.name === day) {
      for (const appointment of availDay.appointments) {
        if (state.appointments[appointment]) {
          if (state.appointments[appointment].id === appointment) {
            filteredAppointments.push(state.appointments[appointment]);
          }
        }
      }
    }
  }

  return filteredAppointments;
}

//returns object of particular interview
function getInterview(state, interview) {
  if (!state || !interview) {
    return null;
  }

  const interviewFound = {};
  for (const interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interview.interviewer) {
      interviewFound.student = interview.student;
      interviewFound.interviewer = {...state.interviewers[interviewer]}
    }
  }

  return interviewFound;
}

//returns array of the interviewers for a particular day
function getInterviewersForDay(state, day) {

  const interviewersFound = [];
  for (const availDay of state.days) {  
    if (availDay.name === day) {
      for (const interviewer of availDay.interviewers) {
        if (state.interviewers[interviewer-1]) {
          if (interviewer === state.interviewers[interviewer-1].id) {
            interviewersFound.push(state.interviewers[interviewer-1])
          }
        }
      }
    }
  }

  return interviewersFound;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay }