import React from 'react';

export default function Session (props) {
  const {title, speaker, room} = props;

  return (
    <li>
      <h4>{title}</h4>
      <div className="sub-title">
        room: <em>{room.toLowerCase()}</em><br />
        speaker: <em>{speaker.toLowerCase()}</em>
      </div>
    </li>
  );
}