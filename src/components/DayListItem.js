import React from "react";
import className from "classnames";

import "components/DayListItem.scss"

// produces the individual day for the days list
export default function DayListItem(props) {
  const { name, spots } = props;
  const dayClass  = className('day-list__item', {
    'day-list__item--selected': props.selected === true,
    'day-list__item--full': props.spots === 0
 });

  // produces grammer changes according to number of spots of interviews/appointments available for the day
  const spotGrammer = function(spots) {
    if (spots > 1) {
    return `${spots} spots remaining`;
    }
    if (spots === 1) {
      return `${spots} spot remaining`;
    }
    if (spots === 0) {
      return `no spots remaining`;
    }
 }

  return (
    <li onClick={() => props.setDay(name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{spotGrammer(spots)}</h3>
    </li>
  );
}