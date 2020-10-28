import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty"


export default function Appointment(props) {
  const time = props.time;
  const interview = props.interview;
  // const student = props.interview.student;
  // const interviewer = props.interview.interviewer;
  // Above variables throw errors when called in the return opposed to when using dot notation
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? 
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
         /> : 
        <Empty />}
    </article>
  )
}