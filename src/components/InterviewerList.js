import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";


export default function(props) {
  const interviewerSelected = props.interviewer;
  const interviewers = props.interviewers;
  
  console.log(props);

  const allInterviewers = interviewers.map((interviewer) => {
    return (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === interviewerSelected}
      setInterviewers={(event) => props.onChange(interviewer.id)}
    />)
  });
  
   return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {allInterviewers}
      </ul>
    </section>
   );
}
