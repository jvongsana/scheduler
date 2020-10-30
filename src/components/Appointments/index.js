import React, { useEffect } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from  "./Form";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const time = props.time;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id ,interview)
    .then(()=> transition(SHOW))
    .catch((err) => console.error(err));
    
  }

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(CREATE);
     }
  })

  console.log(props.interview);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}/>
      )}
    </article>
  )
}