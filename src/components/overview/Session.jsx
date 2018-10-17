import React from 'react';

export default function Session (props) {
  const {title, host, room} = props;

  return (
    <li>
      <h4>{title}</h4>
      <div className="sub-title">
        room: <em>{room.toLowerCase()}</em><br />
        host: <em>{host.toLowerCase()}</em>
      </div>
    </li>
  );
}