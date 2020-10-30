import React, { useEffect } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from  "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDITING = "EDITING";
  const time = props.time;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id ,interview)
    .then(()=> transition(SHOW))
    .catch((err) => console.error(err));
    
  }

  function cancel() {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={() => {transition(CONFIRM)}}
          onEdit={() => {transition(EDITING)}}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }
      {mode === SAVING &&
        <Status 
          message="Saving" 
        />
      }
      {mode === CONFIRM && 
        <Confirm 
          message="Are you sure you want to cancel?" 
          onConfirm={cancel} 
          onCancel={back} 
        />
      }
      {mode === DELETING && 
        <Status 
          message="Deleting"
        />
      }
      {mode === EDITING && 
        <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onCancel={back}
        onSave={save}
        />
      }
    </article>
  )
}