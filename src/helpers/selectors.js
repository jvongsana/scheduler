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


function getInterviewersForDay(state, day) {
  if (!state || !day) {
    return null;
  }
  
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
  // console.log(interviewersFound);
  return interviewersFound;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay }