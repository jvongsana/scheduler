import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props){
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const interviewers = props.interviewers;
  const onCancel = props.onCancel;
  const onSave = props.onSave;

  const reset = function() {
    setName("");
    setInterviewer(null);
  }

  const cancel = function() {
    reset();
    onCancel();
  }

  const onSubmit = function(){
    if (!name) {
      setError("Student name cannot be blank");
      return;
    }
    
    onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
          data-testid="student-name-input"
        />
        </form>
        <section className="appointment__validation">
          {error}
        </section>
        <InterviewerList 
          interviewers={interviewers} 
          interviewer={interviewer}
          setInterviewer={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={onSubmit}>Save</Button>
        </section>
      </section>
    </main>
  );
}