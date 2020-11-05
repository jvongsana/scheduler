import React from "react";

import DayListItem from "components/DayListItem"

// produces day list for the left-hand nav
export default function DayList(props) {
  
  const dayItem = props.days.map(day => {
    return (
      <DayListItem 
          key={day.id}
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay}  
      />
    );
  });

  return (
    <ul>
      {dayItem}
    </ul>
  );
}