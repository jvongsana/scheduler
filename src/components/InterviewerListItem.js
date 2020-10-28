import React from "react";
import className from "classnames";

import "components/InterviewerListItem.scss";



export default function InterviewListItem(props) {
  const name = props.name;
  const avatar = props.avatar;
  const setInterviewer = props.setInterviewer;
  const selected = props.selected;
  const itemClass = className('interviewers__item', {
    'interviewers__item--selected': props.selected
 });
  
  return (
  <li className={itemClass} onClick={setInterviewer}>
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {selected && name}
</li>
  );
}