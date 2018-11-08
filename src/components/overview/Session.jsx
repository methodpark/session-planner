import React from 'react';
import classnames from 'classnames';

import FavButton from './FavButton';

import './Session.less'

export default function Session (props) {
  const { title, host, room, id, filtered} = props;

  return (
    <li className={classnames({filtered: filtered})}>
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