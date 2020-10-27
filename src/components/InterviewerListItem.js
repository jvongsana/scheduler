import React from "react";
import className from "classnames";

import "components/InterviewerListItem.scss";



export default function InterviewListItem(props) {
  const itemClass = className('interviewers__item', {
    'interviewers__item--selected': props.selected
 });
  
  return (
  <li className={itemClass}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  );
}