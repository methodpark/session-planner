import React from 'react';

import FavButton from './FavButton';

export default function Session (props) {
  const {title, host, room, id} = props;

  return (
    <li>
      <h4>
        <FavButton id={id} />
        {title}
      </h4>
      <div className="sub-title">
        room: <em>{room.toLowerCase()}</em>,
        host: <em>{host.toLowerCase()}</em>
      </div>
    </li>
  );
}