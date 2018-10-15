import React from 'react';

export default function Session (props) {
  const {id, title, room, start, end} = props;

  return (
    <li>
      <h4>{title}</h4>
      <span className="room">{room}</span>
    </li>
  );
}