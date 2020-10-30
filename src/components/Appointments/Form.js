import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props){
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const interviewers = props.interviewers;
  const onCancel = props.onCancel;
  const onSave = props.onSave;
  const forEdit = props.forEdit;

  const reset = function() {
    setName("");
    setInterviewer(null);
  }

  const cancel = function() {
    reset();
    onCancel();
  }

  const onSubmit = function(){
    onSave(name, interviewer);
  }
  console.log(props);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            onSubmit={event => event.preventDefault()}
          />
        </form>
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